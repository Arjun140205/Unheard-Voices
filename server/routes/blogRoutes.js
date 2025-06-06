import express from 'express';
import Blog from '../models/Blog.js';

const router = express.Router();

const bannedWords = ['badword1', 'badword2', 'offensive']; // Add real banned words here

// Helper function to check banned words
function containsBannedWords(text) {
  const lowerText = text.toLowerCase();
  return bannedWords.some(word => lowerText.includes(word));
}

router.post('/', async (req, res) => {
  try {
    console.log("POST /api/blogs called");
    console.log("Request body:", req.body);

    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required.' });
    }

    if (containsBannedWords(title) || containsBannedWords(content)) {
      return res.status(400).json({ message: 'Your story contains inappropriate content and cannot be published.' });
    }

    const newBlog = new Blog({
      title,
      content,
      isAnonymous: true,
    });

    const savedBlog = await newBlog.save();
    res.status(201).json({ message: 'Blog created anonymously', blog: savedBlog });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
