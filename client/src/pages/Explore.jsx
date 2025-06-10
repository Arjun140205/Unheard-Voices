import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function Explore() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("http://localhost:6000/api/blogs");
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
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    const plainText = tempElement.textContent || tempElement.innerText;

    navigator.clipboard.writeText(plainText).then(() => {
      alert("Copied to clipboard!");
    });
  };

  const handleReaction = async (blogId, reactionType) => {
    const reactedKey = `reacted_${blogId}`;
    if (localStorage.getItem(reactedKey)) {
      alert("You've already reacted to this post!");
      return;
    }

    try {
      const res = await fetch(`http://localhost:6000/api/blogs/${blogId}/react`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reaction: reactionType }),
      });

      if (res.ok) {
        localStorage.setItem(reactedKey, reactionType);
        const updatedBlog = await res.json();
        setBlogs((prev) =>
          prev.map((b) => (b._id === updatedBlog._id ? updatedBlog : b))
        );
      } else {
        console.error("Failed to submit reaction");
      }
    } catch (err) {
      console.error("Error submitting reaction", err);
    }
  };

  const reactionTypes = [
    { type: "related", emoji: "🤍" },
    { type: "thoughtful", emoji: "💭" },
    { type: "touched", emoji: "😢" },
    { type: "inspired", emoji: "✍️" },
  ];

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      <Helmet>
        <title>Explore Blogs | Unheard Voices</title>
        <meta
          name="description"
          content="Browse anonymous stories and heartfelt thoughts from across the world on Unheard Voices."
        />
        <meta property="og:title" content="Explore Blogs | Unheard Voices" />
        <meta
          property="og:description"
          content="A platform to read, react, and connect with anonymous stories that move you."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/explore" />
      </Helmet>

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
                <Link to={`/explore/${blog.slug}`}>
                  <h2 className="text-xl font-semibold text-pink-400 hover:underline">
                    {blog.title}
                  </h2>
                </Link>
                <div
                  className="text-white mt-2 prose prose-invert max-w-none line-clamp-6 overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </div>

              <div className="mt-4 flex flex-col gap-3">
                <p className="text-xs text-white/50 text-right">
                  Posted on{" "}
                  {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>

                <div className="flex flex-wrap justify-between items-center gap-2">
                  <button
                    onClick={() => handleCopy(blog.content)}
                    className="text-xs px-3 py-1 bg-white/20 text-white rounded hover:bg-white/30"
                  >
                    📋 Copy
                  </button>

                  {reactionTypes.map(({ type, emoji }) => (
                    <button
                      key={type}
                      onClick={() => handleReaction(blog._id, type)}
                      className="text-xs px-3 py-1 bg-white/20 text-white rounded hover:bg-white/30"
                      title={type}
                    >
                      {emoji} {blog.reactions?.[type] || 0}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
