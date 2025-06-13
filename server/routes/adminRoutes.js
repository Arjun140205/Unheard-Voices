import express from 'express';
import dotenv from 'dotenv';
import Blog from '../models/Blog.js';

dotenv.config();
const router = express.Router();

// Middleware to check admin authentication
const checkAdminAuth = (req, res, next) => {
  const { adminToken } = req.headers;
  if (adminToken !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// Admin login
router.post('/login', (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_SECRET) {
    res.json({ success: true, token: process.env.ADMIN_SECRET });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Get all blogs (including pending ones)
router.get('/blogs', checkAdminAuth, async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update blog status (approve/reject)
router.patch('/blogs/:id/status', checkAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const blog = await Blog.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete blog
router.delete('/blogs/:id', checkAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
