// server/models/Blog.js
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  tag: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
