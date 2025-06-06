// src/components/BlogForm.jsx
import React, { useState } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt();

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [content, setContent] = useState("");

  const handleEditorChange = ({ text }) => {
    setContent(text);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blogData = { title, tag, content };

    const res = await fetch("http://localhost:6000/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogData),
    });

    const result = await res.json();
    alert(result.message || "Blog submitted!");
    setTitle("");
    setTag("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Share Your Story</h2>

      <input
        type="text"
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />

      <select
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      >
        <option value="">Select Emotion</option>
        <option value="loneliness">Loneliness</option>
        <option value="hope">Hope</option>
        <option value="gratitude">Gratitude</option>
        <option value="confession">Confession</option>
      </select>

      <MdEditor
        value={content}
        style={{ height: "300px" }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
      />

      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit Anonymously
      </button>
    </form>
  );
};

export default BlogForm;
