import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.post('/login', async (req, res, next) => {
  try {
    const { password } = req.body;
    
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ token: process.env.ADMIN_TOKEN });
  } catch (error) {
    next(error);
  }
});

export default router;