import express from 'express';
import Blog from '../models/Blog.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// List of inappropriate words (you can expand it)
const BAD_WORDS = ['badword1', 'badword2', 'abuse'];

const containsBadWords = (text) => {
  const lowered = text.toLowerCase();
  return BAD_WORDS.some((word) => lowered.includes(word));
};

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
      authorId: uuidv4(), // assign unique random ID
    });

    const savedBlog = await newBlog.save();
    res.status(201).json({ message: 'Blog posted anonymously', blog: savedBlog });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
