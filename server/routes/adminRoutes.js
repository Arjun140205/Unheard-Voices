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

// Admin token verification
router.post('/verify', (req, res) => {
  const { accessToken } = req.body;
  if (accessToken === process.env.ADMIN_SECRET) {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Invalid access token' });
  }
});

// Get all blogs for admin view
router.get('/blogs', checkAdminAuth, async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .select('-__v')
      .lean();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Flag or unflag a blog
router.patch('/blogs/:id/flag', checkAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { flagged } = req.body;
    
    const blog = await Blog.findByIdAndUpdate(
      id,
      { 
        flagged,
        // When flagging a blog, also set its status to rejected
        ...(flagged ? { status: 'rejected' } : {})
      },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a blog
router.delete('/blogs/:id', checkAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update blog status (only used for special cases now)
router.patch('/blogs/:id/status', checkAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const blog = await Blog.findByIdAndUpdate(
      id,
      { 
        status,
        // If rejecting, also flag the blog
        ...(status === 'rejected' ? { flagged: true } : {})
      },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
