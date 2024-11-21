import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: "Welcome",
    status: "API is running",
    version: "1.0.0"
  });
});

export default router;