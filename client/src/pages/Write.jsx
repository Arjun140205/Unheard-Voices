import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import bgImage from "../assets/bg.jpg";

const Write = () => {
  const [title, setTitle] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [background, setBackground] = useState(bgImage);

  // Update background when theme changes
  useEffect(() => {
    setBackground(bgImage);
  }, [isDark]);
  
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    autofocus: false,
    editorProps: {
      attributes: {
        class: "prose prose-lg focus:outline-none mx-auto min-h-[300px] prose-headings:text-inherit prose-p:text-inherit",
      },
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editor) return;
    
    console.log({
      title,
      content: editor.getHTML(),
    });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6">
      {/* Background with gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />

      {/* Gradient Overlay */}
      <div 
        className={`absolute inset-0 -z-10 transition-opacity duration-500 ${
          isDark 
            ? 'bg-gradient-to-b from-gray-900/90 to-black/90' 
            : 'bg-gradient-to-b from-white/10 via-white/30 to-white/50'
        }`}
      />

      <div className="w-full max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="notepad-container">
            {/* MacOS style note with canvas texture */}
            <div className={`secret-note mac-note p-6 relative transition-all duration-300 ${
              isDark 
                ? 'dark-mode text-gray-100 bg-gray-900/90' 
                : 'light-mode text-gray-900 bg-white/90'
            }`}>
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
                      ? 'border-gray-700 focus:border-gray-500' 
                      : 'border-gray-200 focus:border-gray-400'
                  }`}
                />
                
                <div className={`relative cursor-text ${isDark ? 'dark-notepad-lines' : 'notepad-lines'}`}>
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
              className={`story-btn group relative px-8 py-3 rounded-2xl transform transition-all duration-300 ease-in-out font-medium text-base hover:-translate-y-0.5 overflow-hidden ${
                isDark 
                  ? 'bg-gradient-to-r from-gray-100 to-white text-gray-900' 
                  : 'bg-gradient-to-r from-gray-900 to-gray-800 text-white'
              }`}
            >
              <span className="relative z-10">Share Your Story</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Write;
