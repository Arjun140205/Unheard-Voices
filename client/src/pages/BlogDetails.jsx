import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useInView } from 'react-intersection-observer';
import { recentBlogsCache } from "../utils/cache";
import LazyImage from "../components/LazyImage";
import ErrorMessage from "../components/Error";
import exploreHero from '../assets/explorebg.jpg';

export default function BlogDetails() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { ref: contentRef, inView: contentInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`https://unheard-voices.onrender.com/api/blogs/${slug}`);
        
        if (!res.ok) {
          throw new Error(
            res.status === 404 
              ? "Blog post not found" 
              : "Failed to load blog post"
          );
        }
        
        const data = await res.json();
        setBlog(data);

        if (data) {
          recentBlogsCache.add({
            slug: data.slug,
            title: data.title,
            content: data.content.slice(0, 200)
          });
        }
      } catch (err) {
        console.error("Failed to load blog", err);
        setError(err.message || "Failed to load blog post");
      } finally {
        setLoading(false);
      }
    };

    const fetchRecommendations = async () => {
      try {
        const res = await fetch(`https://unheard-voices.onrender.com/api/blogs/recommend/${slug}`);
        if (!res.ok) {
          throw new Error("Failed to load recommendations");
        }
        const data = await res.json();
        setRecommendations(data);
      } catch (err) {
        console.error("Failed to fetch recommendations", err);
        setRecommendations([]);
      }
    };

    fetchBlog();
    fetchRecommendations();
  }, [slug]);

  useEffect(() => {
    // Inject animations CSS only once
    if (!document.getElementById('blogdetails-animations')) {
      const style = document.createElement('style');
      style.id = 'blogdetails-animations';
      style.innerHTML = `
        @keyframes drawLine {
          to { stroke-dashoffset: 0; }
        }
        .hand-drawn-line {
          stroke-dasharray: 800;
          stroke-dashoffset: 800;
          animation: drawLine 1.2s cubic-bezier(0.77,0,0.18,1) forwards;
        }
        @keyframes drawLine {
          to { stroke-dashoffset: 0; }
        }
        .hand-drawn-line {
          stroke-dasharray: 800;
          stroke-dashoffset: 800;
          animation: drawLine 1.2s cubic-bezier(0.77,0,0.18,1) forwards;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  if (loading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  if (!blog) {
    return <div className="text-white text-center mt-10">Blog not found</div>;
  }

  if (error) {
    return (
      <ErrorMessage 
        message={error}
        subMessage="Please try again later"
        retry={() => {
          // fetchBlog(); // This line was removed as per the edit hint
          // fetchRecommendations(); // This line was removed as per the edit hint
        }}
      />
    );
  }

  // Remove yesPercent since it's not used
  // const totalVotes = voteCounts.yes + voteCounts.no;

  return (
    <div className="min-h-screen relative">
      <Helmet>
        <title>{blog?.title || "Blog Post"} | Unheard Voices</title>
      </Helmet>
      {/* Fixed background with overlay */}
      <div className="fixed inset-0 w-full h-full">
        <img src={exploreHero} alt="Background" className="w-full h-full object-cover filter brightness-95" />
        <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px]"></div>
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-3xl mx-auto">
            {/* Main blog content */}
            <div className="bg-white rounded-2xl px-5 sm:px-8 py-8 sm:py-10 shadow-lg">
        <div className="w-full flex justify-start mb-6">
          <Link to="/explore" className="text-[#7c6f5a] hover:text-[#5c5343] text-base font-medium bg-[#f7f4ef] px-4 py-2 rounded-full shadow-sm transition">
            ← Back to Explore
          </Link>
        </div>
        <div className="relative z-10 flex flex-col items-center w-full">
          <span className="text-xs text-[#b1a89c] italic mb-4 font-serif">{new Date(blog.createdAt).toLocaleDateString()}</span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-[#3d372f] mb-2 text-center w-full break-words leading-tight">{blog.title}</h1>
          
          {/* Hand-drawn brushstroke accent under the title */}
          <svg className="w-full h-6 hand-drawn-line mb-6" viewBox="0 0 400 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 12 Q100 24 200 12 T400 12" stroke="#e5ded7" strokeWidth="2.5" fill="none" />
          </svg>
          {blog.image && (
            <LazyImage
              src={blog.image}
              alt={blog.title}
              className="w-full h-auto rounded-lg mb-8"
            />
          )}
          <div ref={contentRef} className="prose prose-base sm:prose-lg max-w-none text-[#7c6f5a] mb-8 w-full font-serif text-justify prose-p:my-3 prose-p:text-base sm:prose-p:text-lg prose-p:leading-tight" style={{ lineHeight: 1.5 }}>
            {contentInView ? (
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            ) : (
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            )}
          </div>
        </div>
      </div>
          </div>
          {/* Recommendations */}
          <div className="mt-16">
            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-8">Recommended Blogs</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {recommendations.map((rec) => (
            <Link
              key={rec.slug}
              to={`/explore/${rec.slug}`}
              className="block group relative bg-white rounded-xl p-4 shadow-md transition-all duration-200 hover:shadow-lg hover:translate-y-[-2px] overflow-hidden"
            >
              {/* Feather watermark */}
              <svg className="absolute bottom-3 right-3 w-8 h-8 text-blue-100 opacity-40 pointer-events-none" fill="none" viewBox="0 0 32 32"><path d="M6 28 L10 24 L14 20 L18 16 L22 12 L26 10 L28 12 L26 16 L22 20 L18 24 L14 28 L10 30 L6 28" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
              <div className="p-5 sm:p-6 flex flex-col min-h-[120px]">
                <span className="text-xs text-[#b1a89c] italic mb-2 font-serif">{new Date(rec.createdAt).toLocaleDateString()}</span>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#3d372f] mb-2 group-hover:text-[#5c5343] transition-all duration-200 line-clamp-2">{rec.title}</h3>
                <div className="w-12 border-t border-[#e5ded7] my-2 sm:my-3" />
                <div className="text-[#7c6f5a] text-sm sm:text-base font-serif italic mb-2 sm:mb-3 line-clamp-2">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: rec.content.substring(0, 80) + "..."
                    }}
                  />
                </div>
              </div>
            </Link>
          ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .blog-content-art {
            border-radius: 1.2rem;
          }
          .prose {
            font-size: 0.95rem;
          }
          .prose p {
            margin-top: 0.75rem;
            margin-bottom: 0.75rem;
          }
        }
        @media (max-width: 480px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          .blog-content-art {
            padding-left: 1.25rem;
            padding-right: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}