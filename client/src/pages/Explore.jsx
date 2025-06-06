import { useEffect, useState } from "react";

export default function Explore() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("http://localhost:6000/api/blogs");
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-12 px-4">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Unheard Voices</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.length === 0 ? (
          <p className="text-white text-center col-span-full">No blogs posted yet.</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog._id} className="bg-white/10 backdrop-blur-md rounded-xl p-5 shadow-md border border-white/10 transition hover:scale-[1.02]">
              <h2 className="text-xl font-semibold text-pink-400">{blog.title}</h2>
              <p className="text-white mt-2 line-clamp-5">{blog.content}</p>
              <p className="text-sm text-white/60 mt-4 text-right">
                Posted on {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
