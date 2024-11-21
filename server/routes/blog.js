import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { db } from '../config/database.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await db.execute('SELECT * FROM blog_posts ORDER BY published_at DESC');
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

router.get('/:slug', async (req, res, next) => {
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
    next(error);
  }
});

router.post('/', authenticateToken, async (req, res, next) => {
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
    next(error);
  }
});

router.put('/:id', authenticateToken, async (req, res, next) => {
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
    next(error);
  }
});

router.delete('/:id', authenticateToken, async (req, res, next) => {
  try {
    await db.execute({
      sql: 'DELETE FROM blog_posts WHERE id = ?',
      args: [req.params.id]
    });

    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;