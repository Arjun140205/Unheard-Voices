import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import React, { useCallback } from 'react';

const MenuBar = ({ editor }) => {
  const addImage = useCallback(() => {
    if (!editor) {
      return;
    }
    const url = window.prompt('Enter the URL of your image:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const handleFileUpload = useCallback((event) => {
    if (!editor) {
      return;
    }
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        editor.chain().focus().setImage({ src: e.target.result }).run();
      };
      reader.readAsDataURL(file);
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border-b border-gray-200 p-4 sticky top-16 bg-white z-10">
      <div className="flex flex-wrap gap-2">
        {/* Text Formatting */}
        <div className="flex items-center space-x-1 border-r pr-2">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
            title="Bold"
          >
            <i className="fas fa-bold"></i>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
            title="Italic"
          >
            <i className="fas fa-italic"></i>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}
            title="Underline"
          >
            <i className="fas fa-underline"></i>
          </button>
        </div>

        {/* Alignment */}
        <div className="flex items-center space-x-1 border-r pr-2">
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''}`}
            title="Align Left"
          >
            <i className="fas fa-align-left"></i>
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''}`}
            title="Align Center"
          >
            <i className="fas fa-align-center"></i>
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''}`}
            title="Align Right"
          >
            <i className="fas fa-align-right"></i>
          </button>
        </div>

        {/* Headings */}
        <div className="flex items-center space-x-1 border-r pr-2">
          <select
            onChange={(e) => {
              const level = parseInt(e.target.value);
              level ? editor.chain().focus().toggleHeading({ level }).run() : editor.chain().focus().setParagraph().run();
            }}
            className="p-2 rounded border hover:bg-gray-100"
          >
            <option value="">Normal</option>
            <option value="1">Heading 1</option>
            <option value="2">Heading 2</option>
            <option value="3">Heading 3</option>
          </select>
        </div>

        {/* Lists */}
        <div className="flex items-center space-x-1 border-r pr-2">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
            title="Bullet List"
          >
            <i className="fas fa-list-ul"></i>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
            title="Numbered List"
          >
            <i className="fas fa-list-ol"></i>
          </button>
        </div>

        {/* Image Upload */}
        <div className="flex items-center space-x-1">
          <button
            onClick={addImage}
            className="p-2 rounded hover:bg-gray-100"
            title="Insert Image from URL"
          >
            <i className="fas fa-link"></i>
          </button>
          <label className="p-2 rounded hover:bg-gray-100 cursor-pointer" title="Upload Image">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileUpload}
            />
            <i className="fas fa-image"></i>
          </label>
        </div>
      </div>
    </div>
  );
};

const RichTextEditor = ({ content, onUpdate }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      TextStyle,
      Color,
    ],
    content,
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML());
    },
  });

  return (
    <div className="prose prose-lg max-w-none">
      <MenuBar editor={editor} />
      <div className="p-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor;
