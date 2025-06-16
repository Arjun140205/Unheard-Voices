import { useState, useEffect } from 'react';

const Admin = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');
  const [adminToken, setAdminToken] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'flagged'

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:4000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok) {
        setIsAuthenticated(true);
        setAdminToken(data.token);
        fetchBlogs(data.token);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch {
      setError('Failed to connect to server');
    }
  };

  const fetchBlogs = async (token) => {
    try {
      const res = await fetch('http://localhost:4000/api/admin/blogs', {
        headers: { adminToken: token || adminToken },
      });
      const data = await res.json();
      if (res.ok) setBlogs(data);
    } catch {
      setError('Failed to fetch blogs');
    }
  };

  const updateBlogStatus = async (blogId, status) => {
    try {
      const res = await fetch(`http://localhost:4000/api/admin/blogs/${blogId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          adminToken,
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) fetchBlogs();
    } catch {
      setError('Failed to update status');
    }
  };

  const unflagBlog = async (blogId) => {
    try {
      const res = await fetch(`http://localhost:4000/api/admin/blogs/${blogId}/unflag`, {
        method: 'PATCH',
        headers: { adminToken },
      });
      if (res.ok) fetchBlogs();
    } catch {
      setError('Failed to unflag blog');
    }
  };

  const deleteBlog = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    try {
      const res = await fetch(`http://localhost:4000/api/admin/blogs/${blogId}`, {
        method: 'DELETE',
        headers: { adminToken },
      });
      if (res.ok) fetchBlogs();
    } catch {
      setError('Failed to delete blog');
    }
  };

  const filteredBlogs = activeTab === 'flagged'
    ? blogs.filter((blog) => blog.flagged)
    : blogs;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="max-w-md w-full bg-white rounded-lg shadow p-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
          {error && <div className="text-red-600 mb-4">{error}</div>}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full px-3 py-2 border rounded-lg mb-4"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Admin Dashboard</h2>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Logout
            </button>
          </div>

          {/* Tabs */}
          <div className="mb-4">
            <button
              className={`px-4 py-2 mr-2 rounded ${
                activeTab === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setActiveTab('all')}
            >
              All Blogs
            </button>
            <button
              className={`px-4 py-2 rounded ${
                activeTab === 'flagged' ? 'bg-red-600 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setActiveTab('flagged')}
            >
              Flagged Blogs
            </button>
          </div>

          {error && <div className="text-red-600 mb-4">{error}</div>}

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Flagged
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBlogs.map((blog) => (
                  <tr key={blog._id}>
                    <td className="px-6 py-4">{blog.title}</td>
                    <td className="px-6 py-4">{blog.authorId || 'Anonymous'}</td>
                    <td className="px-6 py-4 capitalize">{blog.status}</td>
                    <td className="px-6 py-4">
                      {blog.flagged ? '🚩' : '—'}
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      {blog.status !== 'approved' && (
                        <button
                          onClick={() => updateBlogStatus(blog._id, 'approved')}
                          className="text-green-600 hover:underline"
                        >
                          Approve
                        </button>
                      )}
                      {blog.flagged && (
                        <button
                          onClick={() => unflagBlog(blog._id)}
                          className="text-yellow-600 hover:underline"
                        >
                          Unflag
                        </button>
                      )}
                      <button
                        onClick={() => deleteBlog(blog._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredBlogs.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      No blogs to display
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;