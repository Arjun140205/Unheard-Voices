import express from 'express';
import Blog from '../models/Blog.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const BAD_WORDS = ['badword1', 'badword2', 'abuse'];

const containsBadWords = (text) => {
  const lowered = text.toLowerCase();
  return BAD_WORDS.some((word) => lowered.includes(word));
};

// Get all non-flagged blogs
router.get('/', async (req, res) => {
  try {
    console.log('Fetching blogs...');
    
    // First, let's get ALL blogs to see what's in the database
    const allBlogs = await Blog.find().lean();
    console.log('All blogs in database:', JSON.stringify(allBlogs, null, 2));

    // Now get blogs that should be visible
    const visibleBlogs = await Blog.find({
      $or: [
        // Either approved and not flagged
        {
          $and: [
            { status: 'approved' },
            { $or: [{ flagged: false }, { flagged: { $exists: false } }] }
          ]
        },
        // Or just created (no status check)
        {
          createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) } // Last 24 hours
        }
      ]
    })
    .sort({ createdAt: -1 })
    .select('-__v')
    .lean();
    
    console.log('Visible blogs:', JSON.stringify(visibleBlogs, null, 2));
    
    if (visibleBlogs.length === 0 && allBlogs.length > 0) {
      console.log('Warning: Found blogs in database but none are visible.');
      console.log('Blog status counts:', await Blog.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]));
    }
    
    res.json(visibleBlogs || []);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Error fetching blogs', error: error.message });
  }
});

// Create a blog post
router.post('/', async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required.' });
    }

    if (containsBadWords(title) || containsBadWords(content)) {
      return res.status(403).json({ message: 'Inappropriate content detected. Please edit and try again.' });
    }

    const uniqueId = uuidv4().slice(0, 6);
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + '-' + uniqueId;

    const newBlog = new Blog({
      title,
      content,
      tags: tags || [],
      status: 'approved',
      flagged: false,
      authorId: uuidv4(),
      slug,
      createdAt: new Date(),
      poll: { yes: 0, no: 0 },
      reactions: {
        related: 0,
        thoughtful: 0,
        touched: 0,
        inspired: 0
      }
    });

    const savedBlog = await newBlog.save();
    console.log('New blog saved:', savedBlog);
    res.status(201).json({ message: 'Blog posted anonymously', blog: savedBlog });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// React to a blog post
router.post('/:id/react', async (req, res) => {
  try {
    const { reaction } = req.body;
    const validReactions = ['related', 'thoughtful', 'touched', 'inspired'];

    if (!validReactions.includes(reaction)) {
      return res.status(400).json({ message: 'Invalid reaction type' });
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    blog.reactions[reaction] = (blog.reactions[reaction] || 0) + 1;

    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    console.error('Reaction error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
})

// Get blog by slug
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
})

// POST /api/blogs/:id/vote
router.post('/:id/vote', async (req, res) => {
  const { vote } = req.body;
  const { id } = req.params;

  if (!['yes', 'no'].includes(vote)) {
    return res.status(400).json({ error: 'Invalid vote option' });
  }

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    blog.poll[vote] += 1;
    await blog.save();

    res.status(200).json({
      message: 'Vote recorded',
      poll: blog.poll
    });
  } catch (err) {
    console.error('Voting error:', err);
    res.status(500).json({ error: 'Server error while recording vote' });
  }
});
// Get blog recommendations based on slug
router.get('/recommend/:slug', async (req, res) => {
  try {
    // Find the current blog
    const currentBlog = await Blog.findOne({ 
      slug: req.params.slug, 
      status: 'approved' 
    }).select('tags');

    if (!currentBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Find similar blogs based on tags
    const recommendations = await Blog.find({
      status: 'approved',
      slug: { $ne: req.params.slug }, // Exclude current blog
      tags: { $in: currentBlog.tags } // Find blogs with matching tags
    })
    .select('title content slug createdAt') // Select only needed fields
    .sort({ createdAt: -1 }) // Sort by newest first
    .limit(4) // Limit to 4 recommendations
    .lean();

    res.json(recommendations);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({ message: 'Error fetching recommendations', error: error.message });
  }
});




export default router;
