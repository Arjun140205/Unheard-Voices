import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import axios from "axios";
import writingBg from "../assets/writing.jpg";
import ConfirmationModal from "../components/ConfirmationModal";

const Write = () => {
  const [title, setTitle] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Show confirmation modal when user clicks "Share Your Story"
  const handleShareClick = (e) => {
    e.preventDefault();
    if (!title.trim() || !editor) return; // prevent if no content or title
    setIsModalOpen(true);
  };

  // Confirm publishing after modal confirmation
  const handleConfirm = async () => {
    setIsModalOpen(false);
    if (!editor || !title.trim()) return;

    const content = editor.getHTML();

    try {
      setIsSubmitting(true);
      setMessage("");

      const res = await axios.post("http://localhost:6000/api/blogs", {
        title,
        content,
      });

      if (res.status === 201) {
        setMessage("✅ Your anonymous story was shared successfully!");
        setTitle("");
        editor.commands.clearContent();
      } else {
        setMessage("❌ Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setMessage("❌ Server error. Try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cancel publishing in modal
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
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
              {/* MacOS style window controls */}
              <div className="absolute top-3 left-3 flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E]"></div>
                <div className="w-3 h-3 rounded-full bg-[#28C840]"></div>
              </div>

              {/* Theme Toggle */}
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

              {/* Writing Area */}
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
              </div>
            </div>
          </div>

          {/* Share Button with gradient */}
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
        </form>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        message="Are you sure you want to publish this anonymous story?"
      />
    </div>
  );
};

export default Write;