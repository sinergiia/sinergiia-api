import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/error.js';
import { db } from './config/database.js';
import indexRouter from './routes/index.js';
import blogRouter from './routes/blog.js';
import leadsRouter from './routes/leads.js';
import adminRouter from './routes/admin.js';
import chatRouter from './routes/chat.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// CORS configuration
app.use(cors({
  origin: [
    'https://www.sinergiia.pro',
    'https://sinergiia.pro',
    ...(process.env.NODE_ENV === 'development' ? ['http://localhost:5173'] : [])
  ],
  methods: ['GET', 'POST', 'PUT', DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Routes
app.use('/api', indexRouter);
app.use('/api/blog', blogRouter);
app.use('/api/leads', leadsRouter);
app.use('/api/admin', adminRouter);
app.use('/api/chat', chatRouter);

// Error handling
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});