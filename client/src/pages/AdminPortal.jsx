import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Helmet } from "react-helmet-async";
import adminBg from '../assets/admin.jpg';
import { format } from 'date-fns';

// Sophisticated, minimalistic color palette
const COLORS = ['#9DB4C0', '#5C6B73', '#253237', '#8FA6B2', '#405359'];
const PRIMARY_COLOR = '#5C6B73';
const ACCENT_COLOR = '#9DB4C0';

const AdminPortal = () => {
  const [accessToken, setAccessToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [analytics, setAnalytics] = useState({
    totalBlogs: 0,
    flaggedBlogs: 0,
    blogsThisMonth: 0,
    topTags: [],
    engagementData: [],
    dailyPosts: []
  });

  const navigate = useNavigate();

  // Check stored token
  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken');
    if (storedToken) {
      setAccessToken(storedToken);
      setIsAuthenticated(true);
      fetchData(storedToken);
    }
  }, []);

  const fetchData = async (token) => {
    try {
      console.log('Fetching data with token:', token);
      // Fetch blogs and analytics data
      const headers = {
        'Content-Type': 'application/json',
        'adminToken': token || accessToken
      };

      const [blogsRes, analyticsRes] = await Promise.all([
        fetch('http://localhost:4000/api/admin/blogs', { headers }),
        fetch('http://localhost:4000/api/admin/analytics', { headers })
      ]);

      if (!blogsRes.ok || !analyticsRes.ok) {
        const blogsError = await blogsRes.text();
        const analyticsError = await analyticsRes.text();
        console.error('Blogs response:', blogsError);
        console.error('Analytics response:', analyticsError);
        throw new Error('Failed to fetch data');
      }

      const blogsData = await blogsRes.json();
      const analyticsData = await analyticsRes.json();

      console.log('Fetched blogs:', blogsData);
      console.log('Fetched analytics:', analyticsData);

      setBlogs(blogsData);
      setAnalytics(analyticsData);
    } catch (err) {
      setError('Failed to fetch data');
      console.error('Fetch error:', err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      console.log('Attempting login with token:', accessToken);
      const res = await fetch('http://localhost:4000/api/admin/verify', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'adminToken': accessToken
        },
        body: JSON.stringify({ accessToken }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
        localStorage.setItem('adminToken', accessToken);
        fetchData(accessToken);
      } else {
        setError('Invalid access token');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setAccessToken('');
    navigate('/');
  };

  const deleteBlog = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    try {
      const res = await fetch(`http://localhost:4000/api/admin/blogs/${blogId}`, {
        method: 'DELETE',
        headers: { adminToken: accessToken },
      });

      if (res.ok) {
        fetchData(accessToken);
      } else {
        setError('Failed to delete blog');
      }
    } catch (err) {
      setError('Failed to connect to server');
    }
  };

  // Login Form
  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen bg-gray-50">
        <Helmet>
          <title>Admin Portal - Unheard Voices</title>
        </Helmet>
        
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${adminBg})`,
            opacity: 0.1
          }}
        />

        <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white p-8 border border-gray-100">
            <h2 className="text-3xl font-serif text-gray-800 mb-8 text-center" style={{ fontFamily: 'EB Garamond' }}>
              Admin Portal
            </h2>
            
            {error && (
              <div className="mb-6 p-3 text-red-600 border border-red-100 bg-red-50 rounded text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-2 font-serif">
                  Access Token
                </label>
                <input
                  type="password"
                  value={accessToken}
                  onChange={(e) => setAccessToken(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded
                           text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400
                           focus:border-gray-400 transition-all duration-200"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded
                         focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 
                         disabled:opacity-50 transition-colors duration-200
                         font-serif text-base"
                style={{ fontFamily: 'EB Garamond' }}
              >
                {loading ? 'Verifying...' : 'Access Dashboard'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-50">
      <Helmet>
        <title>Admin Dashboard - Unheard Voices</title>
      </Helmet>

      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${adminBg})`,
          opacity: 0.1
        }}
      />

      {/* Header */}
      <div className="relative z-10 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <h1 className="text-2xl font-serif text-gray-800" style={{ fontFamily: 'EB Garamond' }}>
              Admin Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-serif transition-colors duration-200"
              style={{ fontFamily: 'EB Garamond' }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-6 mb-8 border-b border-gray-100">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 font-serif -mb-px ${
              activeTab === 'dashboard'
                ? 'text-gray-800 border-b-2 border-gray-800'
                : 'text-gray-500 hover:text-gray-700'
            } transition-colors duration-200`}
            style={{ fontFamily: 'EB Garamond' }}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-4 py-2 font-serif -mb-px ${
              activeTab === 'blogs'
                ? 'text-gray-800 border-b-2 border-gray-800'
                : 'text-gray-500 hover:text-gray-700'
            } transition-colors duration-200`}
            style={{ fontFamily: 'EB Garamond' }}
          >
            All Blogs
          </button>
          <button
            onClick={() => setActiveTab('flagged')}
            className={`px-4 py-2 font-serif -mb-px ${
              activeTab === 'flagged'
                ? 'text-gray-800 border-b-2 border-gray-800'
                : 'text-gray-500 hover:text-gray-700'
            } transition-colors duration-200`}
            style={{ fontFamily: 'EB Garamond' }}
          >
            Flagged Blogs
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 text-red-600 border border-red-100 bg-red-50 rounded">
            {error}
          </div>
        )}

        {/* Dashboard View */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 border border-[#E5E9EB]">
                <h3 className="text-sm font-medium text-[#5C6B73] uppercase tracking-wide font-serif" style={{ fontFamily: 'EB Garamond' }}>Total Blogs</h3>
                <p className="text-3xl font-bold text-[#253237] mt-2 font-serif" style={{ fontFamily: 'EB Garamond' }}>{analytics.totalBlogs}</p>
              </div>
              <div className="bg-white p-6 border border-[#E5E9EB]">
                <h3 className="text-sm font-medium text-[#5C6B73] uppercase tracking-wide font-serif" style={{ fontFamily: 'EB Garamond' }}>Flagged Content</h3>
                <p className="text-3xl font-bold text-[#405359] mt-2 font-serif" style={{ fontFamily: 'EB Garamond' }}>{analytics.flaggedBlogs}</p>
              </div>
              <div className="bg-white p-6 border border-[#E5E9EB]">
                <h3 className="text-sm font-medium text-[#5C6B73] uppercase tracking-wide font-serif" style={{ fontFamily: 'EB Garamond' }}>This Month</h3>
                <p className="text-3xl font-bold text-[#405359] mt-2 font-serif" style={{ fontFamily: 'EB Garamond' }}>{analytics.blogsThisMonth}</p>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {/* Daily Posts Chart */}
              <div className="bg-white p-6 border border-[#E5E9EB]">
                <h3 className="text-sm font-medium text-[#5C6B73] uppercase tracking-wide mb-6 font-serif" style={{ fontFamily: 'EB Garamond' }}>Posts per Day</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analytics.dailyPosts}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E9EB" />
                      <XAxis dataKey="date" stroke="#5C6B73" />
                      <YAxis stroke="#5C6B73" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff',
                          border: '1px solid #E5E9EB',
                          borderRadius: '2px',
                          boxShadow: 'none'
                        }}
                      />
                      <Bar dataKey="posts" fill="#9DB4C0" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Top Tags Chart */}
              <div className="bg-white p-6 border border-[#E5E9EB]">
                <h3 className="text-sm font-medium text-[#5C6B73] uppercase tracking-wide mb-6 font-serif" style={{ fontFamily: 'EB Garamond' }}>Popular Tags</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analytics.topTags}
                        dataKey="count"
                        nameKey="tag"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                      >
                        {analytics.topTags.map((entry, index) => (
                          <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff',
                          border: '1px solid #E5E9EB',
                          borderRadius: '2px',
                          boxShadow: 'none'
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blogs Table View */}
        {(activeTab === 'blogs' || activeTab === 'flagged') && (
          <div className="bg-white border border-[#E5E9EB]">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-[#F8FAFC] border-b border-[#E5E9EB]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#5C6B73] uppercase tracking-wide font-serif"
                        style={{ fontFamily: 'EB Garamond' }}>
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#5C6B73] uppercase tracking-wide font-serif"
                        style={{ fontFamily: 'EB Garamond' }}>
                      Posted On
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#5C6B73] uppercase tracking-wide font-serif"
                        style={{ fontFamily: 'EB Garamond' }}>
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#5C6B73] uppercase tracking-wide font-serif"
                        style={{ fontFamily: 'EB Garamond' }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E9EB]">
                  {blogs
                    .filter(blog => activeTab === 'flagged' ? blog.flagged : true)
                    .map((blog) => (
                      <tr key={blog._id} className={blog.flagged ? 'bg-[#F8FAFC]' : 'hover:bg-[#F8FAFC]'}>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-[#253237] font-serif" style={{ fontFamily: 'EB Garamond' }}>
                            {blog.title}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-[#5C6B73] font-serif" style={{ fontFamily: 'EB Garamond' }}>
                            {format(new Date(blog.createdAt), 'MMM d, yyyy')}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 inline-flex text-xs leading-5 font-medium rounded-sm font-serif ${
                            blog.flagged
                              ? 'text-[#405359] bg-[#F8FAFC]'
                              : 'text-[#405359] bg-[#F8FAFC]'
                          }`} style={{ fontFamily: 'EB Garamond' }}>
                            {blog.flagged ? 'Flagged' : 'Active'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">
                          <button
                            onClick={() => deleteBlog(blog._id)}
                            className="text-[#5C6B73] hover:text-[#253237] mr-4 transition-colors duration-200 font-serif"
                            style={{ fontFamily: 'EB Garamond' }}
                          >
                            Delete
                          </button>
                          <a
                            href={`/blog/${blog.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#5C6B73] hover:text-[#253237] transition-colors duration-200 font-serif"
                            style={{ fontFamily: 'EB Garamond' }}
                          >
                            View
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPortal;
