import express from 'express';
import dotenv from 'dotenv';
import Blog from '../models/Blog.js';

dotenv.config();
const router = express.Router();

// Simple admin auth check
router.post('/login', (req, res) => {
  const { password } = req.body;

  if (password === process.env.ADMIN_SECRET) {
    return res.status(200).json({ message: 'Authenticated' });
  }

  return res.status(401).json({ message: 'Unauthorized' });
});

// Get all blogs for admin
router.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
