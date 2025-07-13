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

  useEffect(() => {
    // Inject animation CSS only once
    if (!document.getElementById('explore-animations')) {
      const style = document.createElement('style');
      style.id = 'explore-animations';
      style.innerHTML = `
        @keyframes drawLine {
          to { stroke-dashoffset: 0; }
        }
        .hand-drawn-line {
          stroke-dasharray: 800;
          stroke-dashoffset: 800;
          animation: drawLine 1.2s cubic-bezier(0.77,0,0.18,1) forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.7s cubic-bezier(0.77,0,0.18,1) both;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

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
                  className={`group relative bg-[#f9f7f3] border border-[#e5ded7] rounded-3xl shadow-md transition-all duration-200 hover:shadow-lg hover:border-[#cfc7b8] hover:scale-[1.015] overflow-hidden animate-fadeInUp ${
                    highlightedBlog === blog.slug ? 'ring-2 ring-[#e5ded7] scale-105' : ''
                  }`}
                  style={{ 
                    boxShadow: '0 2px 16px 0 rgba(180, 170, 140, 0.07)',
                    backgroundImage: `url('data:image/svg+xml;utf8,<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg"><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch"/></filter><rect width="100%" height="100%" fill="white"/><rect width="100%" height="100%" filter="url(%23grain)" opacity="0.08"/></svg>')`,
                    backgroundSize: 'cover',
                  }}
                >
                  {/* Animated hand-drawn brushstroke accent at the top */}
                  <svg className="absolute top-0 left-0 w-full h-6 hand-drawn-line" viewBox="0 0 400 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 12 Q100 24 200 12 T400 12" stroke="#e5ded7" strokeWidth="2.5" fill="none" />
                  </svg>
                  <div className="p-8 flex flex-col min-h-[200px]">
                    <span className="text-xs text-[#b1a89c] italic mb-2 font-serif">{new Date(blog.createdAt).toLocaleDateString()}</span>
                    <Link to={`/explore/${blog.slug}`}
                      className="text-2xl font-serif font-bold text-[#3d372f] mb-3 group-hover:underline transition-all duration-200 line-clamp-2"
                    >
                      {blog.title}
                    </Link>
                    <div className="text-[#7c6f5a] text-base mb-6 font-serif line-clamp-3">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: blog.content.substring(0, 120) + "..."
                        }}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-auto mb-4">
                      {blog.tags && blog.tags.length > 0 && blog.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-xs bg-[#f7f4ef] text-[#a89c8a] rounded-full font-medium font-serif"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-end">
                      <Link
                        to={`/explore/${blog.slug}`}
                        className="px-5 py-2 text-sm font-serif rounded-full bg-[#ede9e3] text-[#7c6f5a] border border-[#e5ded7] shadow-sm hover:bg-[#e5ded7] hover:text-[#3d372f] transition"
                      >
                        Read →
                      </Link>
                    </div>
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
