import express from 'express';
import Blog from '../models/Blog.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const BAD_WORDS = ['badword1', 'badword2', 'abuse'];

const containsBadWords = (text) => {
  const lowered = text.toLowerCase();
  return BAD_WORDS.some((word) => lowered.includes(word));
};

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

    const newBlog = new Blog({
      title,
      content,
      tags,
      authorId: uuidv4(),
    });

    const savedBlog = await newBlog.save();
    res.status(201).json({ message: 'Blog posted anonymously', blog: savedBlog });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
  rrouter.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


});

export default router;
