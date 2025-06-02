// server/routes/blogRoutes.js
const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");

router.post("/", async (req, res) => {
  const { tag, content } = req.body;

  if (!tag || !content) {
    return res.status(400).json({ message: "Tag and content are required" });
  }

  try {
    const newBlog = new Blog({ tag, content });
    await newBlog.save();
    res.status(201).json({ message: "Blog saved successfully!" });
  } catch (err) {
    console.error("Error saving blog:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
