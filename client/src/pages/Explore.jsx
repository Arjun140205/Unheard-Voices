import { useEffect, useState } from "react";

export default function Explore() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("http://localhost:6000/api/blogs"); // Ensure correct port
        const data = await res.json();
        const sorted = [...data].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setBlogs(sorted);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      }
    };
    fetchBlogs();
  }, []);

  const handleCopy = (html) => {
    // Copy plain text fallback from HTML
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    const plainText = tempElement.textContent || tempElement.innerText;

    navigator.clipboard.writeText(plainText).then(() => {
      alert("Copied to clipboard!");
    });
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      <h1 className="text-4xl font-bold text-white mb-10 text-center">
        Unheard Voices
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.length === 0 ? (
          <p className="text-white text-center col-span-full">
            No blogs posted yet.
          </p>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white/10 backdrop-blur-md rounded-xl p-5 shadow-lg border border-white/10 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold text-pink-400">
                  {blog.title}
                </h2>
                <div
                  className="text-white mt-2 prose prose-invert max-w-none line-clamp-6 overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </div>

              <div className="mt-4 flex justify-between items-center">
                <p className="text-xs text-white/50">
                  Posted on{" "}
                  {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleCopy(blog.content)}
                    className="text-xs px-3 py-1 bg-white/20 text-white rounded hover:bg-white/30"
                  >
                    📋 Copy
                  </button>
                  <button
                    className="text-xs px-3 py-1 bg-white/20 text-white rounded hover:bg-white/30"
                    title="React (placeholder)"
                  >
                    ❤️
                  </button>
                  <button
                    className="text-xs px-3 py-1 bg-white/20 text-white rounded hover:bg-white/30"
                    title="Comment (placeholder)"
                  >
                    💬
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
