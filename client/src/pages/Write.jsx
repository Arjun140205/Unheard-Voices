import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import axios from "axios";
import writingBg from "../assets/writing.jpg";
import ConfirmationModal from "../components/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ErrorMessage from "../components/Error";

const Write = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState(""); // NEW: for tag input
  const [isDark, setIsDark] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    autofocus: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-lg focus:outline-none mx-auto min-h-[300px] prose-headings:text-inherit prose-p:text-inherit",
      },
    },
  });

  const handleShareClick = (e) => {
    e.preventDefault();
    if (!title.trim() || !editor) return;
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    setIsModalOpen(false);
    if (!editor || !title.trim()) return;

    const content = editor.getHTML();
    const parsedTags = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    try {
      setIsSubmitting(true);
      setMessage("");
      setError(null);

      const response = await fetch("https://unheard-voices.onrender.com/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          tags: parsedTags,
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Too many submissions. Please try again later.");
        }
        throw new Error("Failed to submit blog post. Please try again.");
      }

      const data = await response.json();
      navigate(`/explore/${data.blog.slug}`);
    } catch (err) {
      console.error("Error submitting blog:", err);
      setError(err.message || "Failed to submit blog post");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Write a Story | Unheard Voices</title>
      </Helmet>

      <div
        className="min-h-screen py-16 px-6"
        style={{
          backgroundImage: `url(${writingBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-xl mx-auto">
          <form onSubmit={handleShareClick} className="space-y-4">
            <div className="notepad-container backdrop-blur-md ">
              <div
                className={`secret-note mac-note p-6 relative transition-all duration-300 ${
                  isDark
                    ? "dark-mode text-gray-100 bg-gray-900/90"
                    : "light-mode text-gray-900 bg-white/90"
                }`}
              >
                <div className="absolute top-3 left-3 flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FEBC2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#28C840]"></div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsDark(!isDark);
                  }}
                  className="absolute top-2 right-3 p-2 rounded-full transition-all duration-300 hover:scale-110"
                  title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                  {isDark ? (
                    <i className="fas fa-sun text-yellow-400 text-xl"></i>
                  ) : (
                    <i className="fas fa-moon text-gray-600 text-xl"></i>
                  )}
                </button>

                <div className="relative z-10 mt-6">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title your story..."
                    className={`w-full text-2xl font-serif font-bold mb-6 bg-transparent border-b pb-2 focus:outline-none transition-colors duration-200 placeholder-gray-400 ${
                      isDark
                        ? "border-gray-700 focus:border-gray-500"
                        : "border-gray-200 focus:border-gray-400"
                    }`}
                  />

                  <div
                    className={`relative cursor-text ${
                      isDark ? "dark-notepad-lines" : "notepad-lines"
                    }`}
                  >
                    <EditorContent
                      editor={editor}
                      className="min-h-[300px] font-serif text-lg leading-[30px] focus:outline-none pt-[2px]"
                    />
                  </div>

                  {/* NEW: Tag Input Field */}
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Tags (comma separated)"
                    className={`w-full text-sm mt-6 bg-transparent border-b pb-1 focus:outline-none placeholder-gray-400 ${
                      isDark
                        ? "border-gray-700 focus:border-gray-500 text-white"
                        : "border-gray-200 focus:border-gray-400 text-black"
                    }`}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`story-btn group relative px-8 py-3 rounded-2xl transform transition-all duration-300 ease-in-out font-medium text-base hover:-translate-y-0.5 overflow-hidden backdrop-blur-md ${
                  isDark
                    ? "bg-white/90 text-gray-900"
                    : "bg-gray-900/90 text-white"
                }`}
              >
                <span className="relative z-10">
                  {isSubmitting ? "Sharing..." : "Share Your Story"}
                </span>
              </button>
            </div>

            {message && (
              <p
                className={`text-center font-medium ${
                  message.includes("✅") ? "text-green-500" : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}

            {error && (
              <div className="mb-6">
                <ErrorMessage
                  message={error}
                  subMessage="Please try again"
                  retry={() => setError(null)}
                />
              </div>
            )}
          </form>
        </div>

        <ConfirmationModal
          isOpen={isModalOpen}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          message="Are you sure you want to publish this anonymous story?"
        />
      </div>
    </>
  );
};

export default Write;
