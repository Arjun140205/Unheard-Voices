// src/components/BlogForm.jsx
import React, { useState, useEffect } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { draftCache } from "../utils/cache";

const mdParser = new MarkdownIt();

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [content, setContent] = useState("");
  const [draftSaved, setDraftSaved] = useState(false);
  const [showDraftPrompt, setShowDraftPrompt] = useState(false);

  // Check for existing draft on component mount
  useEffect(() => {
    const savedDraft = draftCache.get();
    if (savedDraft) {
      setShowDraftPrompt(true);
    }
  }, []);

  // Load draft content
  const loadDraft = () => {
    const savedDraft = draftCache.get();
    if (savedDraft) {
      setTitle(savedDraft.title || "");
      setTag(savedDraft.tag || "");
      setContent(savedDraft.content || "");
      setShowDraftPrompt(false);
    }
  };

  // Clear draft
  const clearDraft = () => {
    draftCache.clear();
    setShowDraftPrompt(false);
  };

  // Auto-save draft every 30 seconds if there's content
  useEffect(() => {
    let saveInterval;

    if (title || content || tag) {
      saveInterval = setInterval(() => {
        if (title || content || tag) {
          draftCache.save({ title, tag, content });
          setDraftSaved(true);
          setTimeout(() => setDraftSaved(false), 2000); // Hide "Draft saved" message after 2 seconds
        }
      }, 30000); // Save every 30 seconds
    }

    return () => {
      if (saveInterval) clearInterval(saveInterval);
    };
  }, [title, content, tag]);

  const handleEditorChange = ({ text }) => {
    setContent(text);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blogData = { title, tag, content };

    try {
      const res = await fetch("https://unheard-voices.onrender.com/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });

      const result = await res.json();

      if (res.ok) {
        // Clear draft after successful submission
        draftCache.clear();
        alert(result.message || "Blog submitted!");
        setTitle("");
        setTag("");
        setContent("");
      } else {
        alert(result.error || "Failed to submit blog");
      }
    } catch (error) {
      alert("Failed to submit blog. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Draft Recovery Prompt */}
      {showDraftPrompt && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-blue-800 mb-3">
            You have an unsaved draft. Would you like to recover it?
          </p>
          <div className="flex space-x-4">
            <button
              onClick={loadDraft}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Load Draft
            </button>
            <button
              onClick={clearDraft}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Discard
            </button>
          </div>
        </div>
      )}

      {/* Draft Saved Indicator */}
      {draftSaved && (
        <div className="mb-4 text-sm text-gray-600">✓ Draft saved</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">Share Your Story</h2>

        <div>
          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Tags (comma-separated)"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <MdEditor
            value={content}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
            className="h-96"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Are you sure you want to clear all content?")) {
                setTitle("");
                setTag("");
                setContent("");
                draftCache.clear();
              }
            }}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Clear All
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
