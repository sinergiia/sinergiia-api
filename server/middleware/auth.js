export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  if (token !== process.env.ADMIN_TOKEN) {
    return res.status(403).json({ error: 'Invalid token' });
  }

  next();
};