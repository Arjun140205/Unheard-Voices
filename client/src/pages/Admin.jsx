import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const Admin = () => {
  const [accessToken, setAccessToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'flagged'
  const [loading, setLoading] = useState(false);

  // Check if there's a stored token
  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken');
    if (storedToken) {
      setAccessToken(storedToken);
      setIsAuthenticated(true);
      fetchBlogs(storedToken);
    }
  }, []);

  const handleAccess = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken }),
      });
      const data = await res.json();
      
      if (res.ok) {
        setIsAuthenticated(true);
        localStorage.setItem('adminToken', accessToken);
        fetchBlogs(accessToken);
      } else {
        setError(data.error || 'Invalid access token');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const fetchBlogs = async (token) => {
    try {
      const res = await fetch('http://localhost:4000/api/admin/blogs', {
        headers: { adminToken: token || accessToken },
      });
      const data = await res.json();
      if (res.ok) {
        setBlogs(data);
      } else {
        setError('Session expired. Please authenticate again.');
        handleLogout();
      }
    } catch {
      setError('Failed to fetch blogs');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setAccessToken('');
    setBlogs([]);
  };

  const deleteBlog = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    
    try {
      const res = await fetch(`http://localhost:4000/api/admin/blogs/${blogId}`, {
        method: 'DELETE',
        headers: { adminToken: accessToken },
      });
      
      if (res.ok) {
        setSuccessMessage('Blog deleted successfully');
        fetchBlogs(accessToken);
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError('Failed to delete blog');
      }
    } catch {
      setError('Failed to connect to server');
    }
  };

  const toggleBlogFlag = async (blogId, currentFlagStatus) => {
    try {
      const res = await fetch(`http://localhost:4000/api/admin/blogs/${blogId}/flag`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          adminToken: accessToken
        },
        body: JSON.stringify({ flagged: !currentFlagStatus })
      });
      
      if (res.ok) {
        setSuccessMessage(currentFlagStatus ? 'Blog unflagged' : 'Blog flagged');
        fetchBlogs(accessToken);
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError('Failed to update blog status');
      }
    } catch {
      setError('Failed to connect to server');
    }
  };

  // Redirect to home if someone tries to access via URL
  if (!isAuthenticated && !accessToken) {
    return <Navigate to="/" replace />;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Admin Access</h2>
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleAccess}>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Access Token
              </label>
              <input
                type="password"
                value={accessToken}
                onChange={(e) => setAccessToken(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Access Admin Panel'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const filteredBlogs = activeTab === 'flagged' 
    ? blogs.filter(blog => blog.flagged)
    : blogs;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
            {successMessage}
          </div>
        )}

        <div className="mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              All Blogs ({blogs.length})
            </button>
            <button
              onClick={() => setActiveTab('flagged')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'flagged'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Flagged Blogs ({blogs.filter(b => b.flagged).length})
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
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
                {filteredBlogs.map((blog) => (
                  <tr key={blog._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {blog.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(blog.createdAt).toLocaleDateString()}
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
                        onClick={() => toggleBlogFlag(blog._id, blog.flagged)}
                        className={`mr-3 ${
                          blog.flagged
                            ? 'text-green-600 hover:text-green-900'
                            : 'text-yellow-600 hover:text-yellow-900'
                        }`}
                      >
                        {blog.flagged ? 'Unflag' : 'Flag'}
                      </button>
                      <button
                        onClick={() => deleteBlog(blog._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;