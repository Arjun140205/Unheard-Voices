import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { format } from 'date-fns';

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

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Login Form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Admin Portal</h2>
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Access Token
              </label>
              <input
                type="password"
                value={accessToken}
                onChange={(e) => setAccessToken(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Verifying...' : 'Access Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'dashboard'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } transition-colors`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'blogs'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } transition-colors`}
          >
            All Blogs
          </button>
          <button
            onClick={() => setActiveTab('flagged')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'flagged'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } transition-colors`}
          >
            Flagged Blogs
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Dashboard View */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900">Total Blogs</h3>
                <p className="text-3xl font-bold text-indigo-600 mt-2">{analytics.totalBlogs}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900">Flagged Content</h3>
                <p className="text-3xl font-bold text-red-600 mt-2">{analytics.flaggedBlogs}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900">This Month</h3>
                <p className="text-3xl font-bold text-green-600 mt-2">{analytics.blogsThisMonth}</p>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Daily Posts Chart */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Posts per Day</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analytics.dailyPosts}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="posts" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Top Tags Chart */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Popular Tags</h3>
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
                      <Tooltip />
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
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Posted On
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {blogs
                    .filter(blog => activeTab === 'flagged' ? blog.flagged : true)
                    .map((blog) => (
                      <tr key={blog._id} className={blog.flagged ? 'bg-red-50' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {blog.title}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {format(new Date(blog.createdAt), 'MMM d, yyyy')}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            blog.flagged
                              ? 'bg-red-100 text-red-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {blog.flagged ? 'Flagged' : 'Active'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => deleteBlog(blog._id)}
                            className="text-red-600 hover:text-red-900 mr-4"
                          >
                            Delete
                          </button>
                          <a
                            href={`/blog/${blog.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-900"
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
