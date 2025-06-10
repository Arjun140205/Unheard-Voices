import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function BlogDetails() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/blogs/${slug}`);
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        console.error("Failed to load blog", err);
      }
    };
    fetchBlog();
  }, [slug]);

  if (!blog) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      <Helmet>
        <title>{blog.title} | Unheard Voices</title>
        <meta name="description" content={blog.content.slice(0, 120)} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.content.slice(0, 120)} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://yourdomain.com/explore/${blog.slug}`} />
      </Helmet>

      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md p-6 rounded-xl text-white shadow-lg">
        <h1 className="text-3xl font-bold text-pink-400">{blog.title}</h1>
        <p className="text-sm text-white/50 mb-4">
          Posted on{" "}
          {new Date(blog.createdAt).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
        <div
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </div>
  );
}
