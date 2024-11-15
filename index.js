import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@libsql/client';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Update CORS configuration for production
app.use(cors({
  origin: ['https://sinergiia.netlify.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Configure database client based on environment
const db = createClient({
  url: process.env.NODE_ENV === 'production' 
    ? 'libsql://sinergiia-leads-bolt.turso.io'
    : 'file:local.db',
  authToken: process.env.DB_TOKEN
});

// Initialize OpenAI only if API key is available
const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

// Add basic health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Initialize database
async function initDB() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      image_url TEXT,
      seo_title TEXT NOT NULL,
      seo_description TEXT NOT NULL,
      published_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

initDB().catch(console.error);

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  if (token !== process.env.ADMIN_TOKEN) {
    return res.status(403).json({ error: 'Invalid token' });
  }

  next();
};

// Handle lead submission
app.post('/api/leads', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    await db.execute({
      sql: 'INSERT INTO leads (name, email, phone, message) VALUES (?, ?, ?, ?)',
      args: [name, email, phone, message]
    });

    res.status(201).json({ message: 'Lead captured successfully' });
  } catch (error) {
    console.error('Error capturing lead:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Blog posts endpoints
app.get('/api/blog', async (req, res) => {
  try {
    const result = await db.execute('SELECT * FROM blog_posts ORDER BY published_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/blog/:slug', async (req, res) => {
  try {
    const result = await db.execute({
      sql: 'SELECT * FROM blog_posts WHERE id = ?',
      args: [req.params.slug]
    });
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/blog', authenticateToken, async (req, res) => {
  try {
    const { title, content, imageUrl, seoTitle, seoDescription } = req.body;
    
    if (!title || !content || !seoTitle || !seoDescription) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    await db.execute({
      sql: 'INSERT INTO blog_posts (title, content, image_url, seo_title, seo_description) VALUES (?, ?, ?, ?, ?)',
      args: [title, content, imageUrl, seoTitle, seoDescription]
    });

    res.status(201).json({ message: 'Blog post created successfully' });
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/blog/:id', authenticateToken, async (req, res) => {
  try {
    const { title, content, imageUrl, seoTitle, seoDescription } = req.body;
    
    if (!title || !content || !seoTitle || !seoDescription) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    await db.execute({
      sql: 'UPDATE blog_posts SET title = ?, content = ?, image_url = ?, seo_title = ?, seo_description = ? WHERE id = ?',
      args: [title, content, imageUrl, seoTitle, seoDescription, req.params.id]
    });

    res.json({ message: 'Blog post updated successfully' });
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/blog/:id', authenticateToken, async (req, res) => {
  try {
    await db.execute({
      sql: 'DELETE FROM blog_posts WHERE id = ?',
      args: [req.params.id]
    });

    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin login endpoint
app.post('/api/admin/login', async (req, res) => {
  try {
    const { password } = req.body;
    
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ token: process.env.ADMIN_TOKEN });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  if (!openai) {
    return res.status(503).json({ 
      error: 'Chat service unavailable',
      message: 'OpenAI API key not configured'
    });
  }

  try {
    const { message } = req.body;
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Eres un asistente virtual de SinergiIA, una empresa española de automatización con IA para PYMEs. Responde de manera amable y profesional, en español, y guía a los usuarios hacia el formulario de contacto cuando detectes interés en los servicios."
        },
        {
          role: "user",
          content: message
        }
      ],
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error in chat:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  if (!openai) {
    console.warn('Warning: OpenAI API key not configured. Chat functionality will be disabled.');
  }
});
