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
      const res = await fetch(`http://localhost:4000/api/blogs/${slug}`);
      
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
      const res = await fetch(`http://localhost:4000/api/blogs/recommend/${slug}`);
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
      const res = await fetch(`http://localhost:4000/api/blogs/${blog._id}/vote`, {
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
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {loading ? (
          <Loader />
        ) : blog ? (
          <>
            <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
            <div className="mb-8 text-gray-600">
              {new Date(blog.createdAt).toLocaleDateString()}
            </div>
            
            {blog.image && (
              <LazyImage
                src={blog.image}
                alt={blog.title}
                className="w-full h-auto rounded-lg mb-8"
              />
            )}
            
            <div ref={contentRef} className="prose max-w-none">
              {contentInView ? (
                showFullContent ? (
                  <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                ) : (
                  <>
                    <div dangerouslySetInnerHTML={{ 
                      __html: blog.content.slice(0, 1000) + "..."
                    }} />
                    <button
                      onClick={() => setShowFullContent(true)}
                      className="text-blue-500 hover:text-blue-700 mt-4"
                    >
                      Read More
                    </button>
                  </>
                )
              ) : (
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
              )}
            </div>
            
            {/* Recommendations */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Recommended Blogs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendations.map((rec) => (
                  <Link
                    key={rec.slug}
                    to={`/explore/${rec.slug}`}
                    className="block group"
                  >
                    {rec.image && (
                      <LazyImage
                        src={rec.image}
                        alt={rec.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    <h3 className="text-xl font-semibold group-hover:text-blue-500">
                      {rec.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">Blog not found</div>
        )}
      </div>
    </>
  );
}