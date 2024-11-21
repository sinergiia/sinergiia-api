import { Router } from 'express';
import { db } from '../config/database.js';

const router = Router();

router.post('/', async (req, res, next) => {
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
    next(error);
  }
});

export default router;