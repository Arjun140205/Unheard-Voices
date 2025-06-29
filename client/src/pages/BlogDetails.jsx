import { useEffect, useState, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useInView } from 'react-intersection-observer';
import { recentBlogsCache } from "../utils/cache";
import LazyImage from "../components/LazyImage";
import ErrorMessage from "../components/Error";
import Loader from "../components/Loader";


export default function BlogDetails() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [voteCounts, setVoteCounts] = useState({ yes: 0, no: 0 });
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullContent, setShowFullContent] = useState(false);
  
  const { ref: contentRef, inView: contentInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

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
      setVoteCounts({ yes: data.poll?.yes || 0, no: data.poll?.no || 0 });

      if (data) {
        recentBlogsCache.add({
          slug: data.slug,
          title: data.title,
          content: data.content.slice(0, 200)
        });
      }

      const voted = localStorage.getItem(`voted_${data._id}`);
      setHasVoted(!!voted);
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
      // Don't show error UI for recommendations failure
      setRecommendations([]);
    }
  };

  useEffect(() => {
    fetchBlog();
    fetchRecommendations();
  }, [slug]);

  const handleVote = async (type) => {
    if (!blog || hasVoted) return;

    try {
      const res = await fetch(`https://unheard-voices.onrender.com/api/blogs/${blog._id}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vote: type }),
      });

      if (res.ok) {
        const updated = { ...voteCounts, [type]: voteCounts[type] + 1 };
        setVoteCounts(updated);
        setHasVoted(true);
        localStorage.setItem(`voted_${blog._id}`, true);
      }
    } catch (err) {
      console.error("Voting failed", err);
    }
  };

  const totalVotes = voteCounts.yes + voteCounts.no;
  const yesPercent = totalVotes ? Math.round((voteCounts.yes / totalVotes) * 100) : 0;
  const noPercent = totalVotes ? 100 - yesPercent : 0;

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
          fetchBlog();
          fetchRecommendations();
        }}
      />
    );
  }

  return (
    <>
      <Helmet>
        <title>{blog?.title || "Blog Post"} | Unheard Voices</title>
      </Helmet>
      
      <div className="w-full max-w-md mx-auto px-2 py-6 sm:px-6 sm:py-10 bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-lg relative mt-6 mb-20 flex flex-col overflow-x-hidden">
        {/* Back to Explore (inside card, always visible) */}
        <div className="w-full flex justify-start mb-4">
          <Link to="/explore" className="text-blue-500 hover:text-blue-700 text-base font-medium bg-white/90 px-4 py-2 rounded-full shadow-sm transition">
            ← Back to Explore
          </Link>
        </div>
        {/* Feather watermark (top right, smaller on mobile) */}
        <svg className="absolute top-4 right-4 w-10 h-10 sm:w-16 sm:h-16 text-blue-100 opacity-20 pointer-events-none" fill="none" viewBox="0 0 32 32"><path d="M6 28 L10 24 L14 20 L18 16 L22 12 L26 10 L28 12 L26 16 L22 20 L18 24 L14 28 L10 30 L6 28" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
        <div className="relative z-10 flex flex-col items-center w-full">
          <span className="text-xs text-gray-400 italic mb-2">{new Date(blog.createdAt).toLocaleDateString()}</span>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-gray-900 mb-3 text-center w-full break-words leading-tight">{blog.title}</h1>
          <div className="w-10 sm:w-12 border-t border-gray-200 my-4" />
          {blog.image && (
            <LazyImage
              src={blog.image}
              alt={blog.title}
              className="w-full h-auto rounded-lg mb-8"
            />
          )}
          <div ref={contentRef} className="prose prose-base sm:prose-lg max-w-none text-gray-800 mb-6 leading-relaxed w-full">
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
      {/* Recommendations */}
      <div className="max-w-4xl mx-auto px-4 mt-12">
        <h2 className="text-2xl font-bold mb-6">Recommended Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendations.map((rec) => (
            <Link
              key={rec.slug}
              to={`/explore/${rec.slug}`}
              className="block group relative bg-gradient-to-br from-white to-blue-50/30 border border-gray-200 rounded-xl shadow transition-all duration-200 hover:shadow-xl hover:border-blue-200 hover:scale-[1.03] overflow-hidden"
            >
              {/* Feather watermark */}
              <svg className="absolute bottom-3 right-3 w-8 h-8 text-blue-100 opacity-40 pointer-events-none" fill="none" viewBox="0 0 32 32"><path d="M6 28 L10 24 L14 20 L18 16 L22 12 L26 10 L28 12 L26 16 L22 20 L18 24 L14 28 L10 30 L6 28" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
              <div className="p-7 pl-6 flex flex-col min-h-[120px]">
                <span className="text-xs text-gray-400 italic mb-2">{new Date(rec.createdAt).toLocaleDateString()}</span>
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-1 group-hover:underline transition-all duration-200 line-clamp-2">{rec.title}</h3>
                <div className="w-8 border-t border-gray-200 my-2" />
                <div className="text-gray-600 text-base italic mb-3 line-clamp-2">
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
    </>
  );
}