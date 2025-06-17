import express from 'express';
import dotenv from 'dotenv';
import Blog from '../models/Blog.js';
import { startOfMonth, subDays } from 'date-fns';

dotenv.config();
const router = express.Router();

// Log middleware to debug route access
router.use((req, res, next) => {
  console.log('Admin route accessed:', req.method, req.path);
  console.log('Headers:', req.headers);
  next();
});

// Middleware to check admin authentication
const checkAdminAuth = (req, res, next) => {
  console.log('Checking admin auth, headers:', req.headers);
  const adminToken = req.headers.admintoken || req.headers.adminToken;
  console.log('Admin token from headers:', adminToken);
  console.log('Expected token:', process.env.ADMIN_SECRET);
  
  if (adminToken !== process.env.ADMIN_SECRET) {
    console.log('Authorization failed');
    return res.status(401).json({ error: 'Unauthorized' });
  }
  console.log('Authorization successful');
  next();
};

// Admin token verification
router.post('/verify', async (req, res) => {
  console.log('Verify endpoint hit with body:', req.body);
  try {
    const { accessToken } = req.body;
    console.log('Access token received:', accessToken);
    console.log('Expected token:', process.env.ADMIN_SECRET);
    
    if (accessToken === process.env.ADMIN_SECRET) {
      console.log('Token verified successfully');
      return res.json({ success: true });
    } else {
      console.log('Token verification failed');
      return res.status(401).json({ error: 'Invalid access token' });
    }
  } catch (error) {
    console.error('Verification error:', error);
    return res.status(500).json({ error: 'Server error during verification' });
  }
});

// Get analytics data
router.get('/analytics', checkAdminAuth, async (req, res) => {
  try {
    const [
      totalBlogs,
      flaggedBlogs,
      blogsThisMonth,
      allTags,
      recentBlogs
    ] = await Promise.all([
      // Total blogs count
      Blog.countDocuments(),
      
      // Flagged blogs count
      Blog.countDocuments({ flagged: true }),
      
      // Blogs this month
      Blog.countDocuments({
        createdAt: { $gte: startOfMonth(new Date()) }
      }),
      
      // Get all tags for analysis
      Blog.find().select('tags -_id'),
      
      // Get recent blogs for daily posts analysis
      Blog.find({
        createdAt: { $gte: subDays(new Date(), 30) }
      }).select('createdAt -_id')
    ]);

    // Process tags
    const tagCounts = {};
    allTags.forEach(blog => {
      blog.tags?.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    const topTags = Object.entries(tagCounts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Process daily posts
    const dailyPosts = {};
    recentBlogs.forEach(blog => {
      const date = blog.createdAt.toISOString().split('T')[0];
      dailyPosts[date] = (dailyPosts[date] || 0) + 1;
    });

    const dailyPostsArray = Object.entries(dailyPosts)
      .map(([date, posts]) => ({ date, posts }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    res.json({
      totalBlogs,
      flaggedBlogs,
      blogsThisMonth,
      topTags,
      dailyPosts: dailyPostsArray
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
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

// Delete a blog
router.delete('/blogs/:id', checkAdminAuth, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
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
      { flagged },
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
