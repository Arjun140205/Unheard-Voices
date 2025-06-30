import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useInView } from 'react-intersection-observer';
import exploreBg from '../assets/bg.jpg'; // Using existing bg.jpg as it fits the theme
import exploreHero from '../assets/explorebg.jpg';
import ErrorMessage from "../components/Error";
import Loader from "../components/Loader";

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
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [highlightedBlog, setHighlightedBlog] = useState(null);
  
  const { ref: loadMoreRef, inView: loadMoreInView } = useInView({
    threshold: 0.5,
    delay: 100
  });

  // Check for highlighted blog from admin panel
  useEffect(() => {
    const highlightSlug = localStorage.getItem('highlightBlog');
    if (highlightSlug) {
      setHighlightedBlog(highlightSlug);
      // Remove the highlight after 3 seconds
      setTimeout(() => {
        setHighlightedBlog(null);
        localStorage.removeItem('highlightBlog');
      }, 3000);
    }
  }, []);

  const fetchBlogs = async (pageNum) => {
    try {
      setError(null);
      if (pageNum === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const res = await fetch(`https://unheard-voices.onrender.com/api/blogs?page=${pageNum}&limit=10`);
      
      if (!res.ok) {
        throw new Error(
          res.status === 404 
            ? "No blogs found" 
            : "Failed to load blogs"
        );
      }
      
      const data = await res.json();
      
      if (pageNum === 1) {
        setBlogs(data);
      } else {
        setBlogs(prev => [...prev, ...data]);
      }
      
      setHasMore(data.length === 10);
    } catch (err) {
      console.error("Failed to load blogs", err);
      setError(err.message || "Failed to load blogs");
      setHasMore(false);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchBlogs(1);
  }, []);

  useEffect(() => {
    if (loadMoreInView && hasMore && !loading && !loadingMore && !error) {
      setPage(prev => {
        const nextPage = prev + 1;
        fetchBlogs(nextPage);
        return nextPage;
      });
    }
  }, [loadMoreInView, hasMore, loading, loadingMore, error]);

  if (error && blogs.length === 0) {
    return (
      <ErrorMessage 
        message={error}
        subMessage="We couldn't load the blogs. Please try again later."
        retry={() => fetchBlogs(1)}
      />
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

      {/* Hero Section */}
      <section className="relative h-[260px] sm:h-[340px] flex items-center justify-center overflow-hidden">
        <img
          src={exploreHero}
          alt="Explore background"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
          style={{ filter: 'brightness(0.7) blur(0px)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center w-full px-4">
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white text-center drop-shadow-lg mb-3">
            Discover Stories, Find Yourself
          </h1>
          <p className="text-lg sm:text-xl text-white text-center max-w-2xl drop-shadow-md">
            Step into a world of anonymous voices and heartfelt confessions. Every story is a window into another soul.
          </p>
        </div>
      </section>

      <div className="min-h-screen py-0 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto pt-8 pb-16">
          {blogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 italic">No stories published yet.</p>
              <Link to="/write" className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium">
                Be the first to share your story →
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className={`group relative bg-[#FAF6F2] border border-rose-100 rounded-xl shadow transition-all duration-200 hover:shadow-xl hover:border-rose-200 hover:scale-[1.03] overflow-hidden ${
                    highlightedBlog === blog.slug ? 'ring-2 ring-rose-200 scale-105' : ''
                  }`}
                >
                  {/* Vertical accent */}
                  <div className="absolute left-0 top-0 h-full w-1 bg-rose-100 rounded-tr-xl rounded-br-xl" />
                  {/* Feather watermark */}
                  <svg className="absolute bottom-3 right-3 w-8 h-8 text-rose-50 opacity-60 pointer-events-none" fill="none" viewBox="0 0 32 32"><path d="M6 28 L10 24 L14 20 L18 16 L22 12 L26 10 L28 12 L26 16 L22 20 L18 24 L14 28 L10 30 L6 28" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  <div className="p-7 pl-6 flex flex-col min-h-[220px]">
                    <span className="text-xs text-gray-400 italic mb-2">{new Date(blog.createdAt).toLocaleDateString()}</span>
                    <Link to={`/explore/${blog.slug}`}
                      className="text-2xl font-serif font-bold text-gray-900 mb-1 group-hover:underline transition-all duration-200 line-clamp-2"
                    >
                      {blog.title}
                    </Link>
                    {/* Divider */}
                    <div className="w-8 border-t border-rose-100 my-2" />
                    <div className="text-gray-600 text-base italic mb-3 line-clamp-2 relative">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: blog.content.substring(0, 120) + "..."
                        }}
                      />
                      {/* Fade-out effect */}
                      <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-rose-50/80 to-transparent pointer-events-none" />
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {blog.tags && blog.tags.length > 0 && blog.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-xs bg-rose-50 text-rose-400 rounded-full font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={`/explore/${blog.slug}`}
                      className="absolute right-7 bottom-7 opacity-0 group-hover:opacity-100 text-rose-400 hover:text-rose-600 text-sm font-medium transition-opacity duration-200"
                    >
                      Read →
                    </Link>
                    {highlightedBlog === blog.slug && (
                      <span className="absolute top-3 right-3 text-xs bg-rose-50 text-rose-400 px-2 py-1 rounded-full font-medium">
                        Admin View
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {loading && <Loader />}

          {error && blogs.length > 0 && (
            <div className="mt-8">
              <ErrorMessage 
                message="Couldn't load more blogs"
                subMessage="Please try again"
                retry={() => fetchBlogs(page)}
              />
            </div>
          )}

          {!error && hasMore && (
            <div
              ref={loadMoreRef}
              className="mt-8 text-center"
            >
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-rose-500 mx-auto"></div>
            </div>
          )}
        </div>
      </div>
    </BackgroundContainer>
  );
}
