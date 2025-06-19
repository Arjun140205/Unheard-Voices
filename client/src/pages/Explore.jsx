import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useInView } from 'react-intersection-observer';
import exploreBg from '../assets/bg.jpg'; // Using existing bg.jpg as it fits the theme
import LazyImage from "../components/LazyImage";

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
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const { ref: loadMoreRef, inView: loadMoreInView } = useInView({
    threshold: 0.5,
    delay: 100
  });

  const fetchBlogs = async (pageNum) => {
    try {
      const res = await fetch(`http://localhost:4000/api/blogs?page=${pageNum}&limit=10`);
      const data = await res.json();
      
      if (pageNum === 1) {
        setBlogs(data);
      } else {
        setBlogs(prev => [...prev, ...data]);
      }
      
      setHasMore(data.length === 10);
      setLoading(false);
    } catch (err) {
      console.error("Failed to load blogs", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(1);
  }, []);

  useEffect(() => {
    if (loadMoreInView && hasMore && !loading) {
      setPage(prev => {
        const nextPage = prev + 1;
        fetchBlogs(nextPage);
        return nextPage;
      });
    }
  }, [loadMoreInView, hasMore, loading]);

  const handleCopy = (html) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    const plainText = tempElement.textContent || tempElement.innerText;

    navigator.clipboard.writeText(plainText).then(() => {
      alert("Content copied to clipboard!");
    });
  };

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

          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-t-lg"></div>
                  <div className="p-6 bg-white rounded-b-lg">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {hasMore && (
            <div
              ref={loadMoreRef}
              className="mt-8 text-center"
            >
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            </div>
          )}
        </div>
      </div>
    </BackgroundContainer>
  );
}
