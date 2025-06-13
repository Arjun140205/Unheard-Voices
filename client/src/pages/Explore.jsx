import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import exploreBg from '../assets/bg.jpg'; // Using existing bg.jpg as it fits the theme

const BackgroundContainer = ({ children }) => (
  <div className="relative min-h-screen">
    <div 
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `url(${exploreBg})`,
        opacity: 0.15 // Reduced opacity for better readability
      }}
    />
    <div className="relative z-10">
      {children}
    </div>
  </div>
);

export default function Explore() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:4000/api/blogs");
        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch blogs');
        }
        
        const sorted = [...data].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setBlogs(sorted);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
        setError("No approved stories available yet. Check back soon!");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleCopy = (html) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    const plainText = tempElement.textContent || tempElement.innerText;

    navigator.clipboard.writeText(plainText).then(() => {
      alert("Content copied to clipboard!");
    });
  };

  if (loading) {
    return (
      <BackgroundContainer>
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <div className="animate-pulse space-y-4 text-center">
                <div className="h-8 w-48 bg-gray-200 rounded mx-auto"></div>
                <div className="h-4 w-32 bg-gray-200 rounded mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </BackgroundContainer>
    );
  }

  if (error) {
    return (
      <BackgroundContainer>
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <p className="text-xl text-gray-600 italic">{error}</p>
              <Link to="/write" className="mt-4 text-blue-600 hover:text-blue-800 font-medium">
                Share your story →
              </Link>
            </div>
          </div>
        </div>
      </BackgroundContainer>
    );
  }

  return (
    <BackgroundContainer>
      <Helmet>
        <title>Explore Stories - Unheard Voices</title>
        <meta
          name="description"
          content="Explore stories from voices that deserve to be heard"
        />
      </Helmet>

      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-serif font-bold text-gray-900 mb-4">
              Explore Stories
            </h1>
            <p className="text-xl text-gray-600 italic font-serif">
              Every voice deserves to be heard, every story matters
            </p>
          </div>

          {blogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 italic">No stories published yet.</p>
              <Link to="/write" className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium">
                Be the first to share your story →
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500 font-serif italic">
                        {new Date(blog.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>

                    <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-3 line-clamp-2">
                      {blog.title}
                    </h2>

                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-full font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="prose prose-sm text-gray-600 mb-4 line-clamp-3">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: blog.content.substring(0, 150) + "..."
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                      <Link
                        to={`/blog/${blog.slug}`}
                        className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                      >
                        Read full story →
                      </Link>
                      <button
                        onClick={() => handleCopy(blog.content)}
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        title="Copy content"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </BackgroundContainer>
  );
}
