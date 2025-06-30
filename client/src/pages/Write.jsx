import React, { useState, useEffect, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import writingBg from "../assets/writing.jpg";
import ConfirmationModal from "../components/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ErrorMessage from "../components/Error";

const DRAFT_KEY = 'unheardvoices_write_draft';

const Write = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Store draft in a ref to avoid using editor before it's ready
  const draftRef = useRef(null);

  // Load draft on mount (just store in ref/state)
  useEffect(() => {
    const draft = localStorage.getItem(DRAFT_KEY);
    if (draft) {
      try {
        const { title, tags, content } = JSON.parse(draft);
        setTitle(title || "");
        setTags(tags || "");
        draftRef.current = content || "";
      } catch {}
    }
  }, []);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    autofocus: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-lg focus:outline-none mx-auto min-h-[300px] prose-headings:text-inherit prose-p:text-inherit",
        spellCheck: 'true',
      },
    },
  });

  // Set editor content from draft only after editor is ready
  useEffect(() => {
    if (editor && draftRef.current) {
      editor.commands.setContent(draftRef.current);
      draftRef.current = null; // Only set once
    }
  }, [editor]);

  // Save draft on change (fix dependencies)
  useEffect(() => {
    if (!editor) return;
    const saveDraft = () => {
      const content = editor.getHTML();
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ title, tags, content }));
    };
    saveDraft(); // Save immediately on mount or title/tags change
    editor.on('update', saveDraft);
    return () => editor.off('update', saveDraft);
  }, [title, tags, editor]);

  const handleShareClick = (e) => {
    e.preventDefault();
    if (!title.trim() || !editor) return;
    setIsModalOpen(true);
    localStorage.removeItem(DRAFT_KEY);
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
        className="min-h-screen py-16 px-6 relative"
        style={{
          backgroundImage: `url(${writingBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Subtle frosted overlay for the entire background */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm pointer-events-none z-0" />
        <div className="max-w-xl mx-auto px-4 sm:px-8 md:px-0 mt-16 sm:mt-20 md:mt-2 mb-8 relative z-10">
          <form onSubmit={handleShareClick} className="space-y-4">
            <div className="notepad-container backdrop-blur-md ">
              <div
                className={`secret-note mac-note p-6 relative transition-all duration-300 shadow-2xl ${
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
                      spellCheck={true}
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
                className="mt-4 rounded-full px-8 py-2 font-medium bg-white/30 backdrop-blur-sm border-2 border-[#e3d6c6] shadow-2xl glass-inner-shadow transition-all duration-200 text-[#7c6f5a] hover:bg-[#f7e6ee]/80 hover:text-[#5c5343] focus:outline-none"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sharing..." : "Share your story"}
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
