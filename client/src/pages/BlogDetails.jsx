import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { recentBlogsCache } from "../utils/cache";


export default function BlogDetails() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [voteCounts, setVoteCounts] = useState({ yes: 0, no: 0 });
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/blogs/recommend/${slug}`);
        const data = await res.json();
        setRecommendations(data);
      } catch (err) {
        console.error("Failed to fetch recommendations", err);
      }
    };
    fetchRecommendations();
  }, [slug]);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:4000/api/blogs/${slug}`);
        const data = await res.json();
        setBlog(data);
        setVoteCounts({ yes: data.poll?.yes || 0, no: data.poll?.no || 0 });

        // Add to recent blogs cache
        if (data) {
          recentBlogsCache.add({
            slug: data.slug,
            title: data.title,
            content: data.content.slice(0, 200) // Cache preview only
          });
        }

        const voted = localStorage.getItem(`voted_${data._id}`);
        setHasVoted(!!voted);
      } catch (err) {
        console.error("Failed to load blog", err);
      } finally {
        setLoading(false);
      }
    };

    // Check if we have the blog in cache
    const cachedBlog = recentBlogsCache.check(slug);
    if (!cachedBlog) {
      fetchBlog();
    }
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

        {/* --- Poll Section --- */}
        <div className="mt-10 bg-white/10 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-white">Did this resonate with you?</h3>
          {!hasVoted ? (
            <div className="flex gap-4">
              <button
                onClick={() => handleVote("yes")}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                ✅ Yes
              </button>
              <button
                onClick={() => handleVote("no")}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                ❌ No
              </button>
            </div>
          ) : (
            <div className="mt-4">
              <div className="mb-2">
                <p className="text-sm text-white mb-1">Yes: {yesPercent}%</p>
                <div className="w-full bg-gray-200 h-3 rounded">
                  <div
                    className="bg-green-500 h-3 rounded"
                    style={{ width: `${yesPercent}%` }}
                  />
                </div>
              </div>
              <div>
                <p className="text-sm text-white mb-1">No: {noPercent}%</p>
                <div className="w-full bg-gray-200 h-3 rounded">
                  <div
                    className="bg-red-500 h-3 rounded"
                    style={{ width: `${noPercent}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {recommendations.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-pink-300 mb-4">You might also like...</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {recommendations.map((rec) => (
              <Link
                key={rec._id}
                to={`/explore/${rec.slug}`}
                className="min-w-[250px] bg-white/10 backdrop-blur-md rounded-lg p-4 hover:bg-white/20 transition duration-200 shadow"
              >
                <h3 className="text-lg font-semibold text-white">{rec.title}</h3>
                <p className="text-white/60 text-sm line-clamp-3 mt-2">{rec.content.slice(0, 100)}...</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}