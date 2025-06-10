import { useState, useEffect } from 'react';

const Admin = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:6000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.status === 200) {
        setIsAuthenticated(true);
        setError('');
      } else {
        setError('Invalid password');
      }
    } catch (err) {
      console.error(err);
      setError('Server error');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetch('http://localhost:6000/api/admin/blogs')
        .then((res) => res.json())
        .then(setBlogs)
        .catch(console.error);
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-12">
      {!isAuthenticated ? (
        <form
          onSubmit={handleLogin}
          className="max-w-sm mx-auto bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 mb-4"
          />
          <button
            type="submit"
            className="w-full py-2 bg-green-600 rounded hover:bg-green-700 transition"
          >
            Login
          </button>
          {error && <p className="mt-2 text-red-400">{error}</p>}
        </form>
      ) : (
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h2>
          <div className="grid gap-6">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white/10 p-5 rounded-lg shadow border border-white/10"
              >
                <h3 className="text-pink-400 text-xl font-semibold">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-400 mt-2">
                  Author ID: {blog.authorId}
                </p>
                <div
                  className="prose prose-invert mt-4 max-w-none"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
                <p className="text-xs mt-4 text-gray-400">
                  Created: {new Date(blog.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
