// Cache configuration
const CACHE_CONFIG = {
  RECENT_BLOGS_KEY: 'uv_recent_blogs',
  DRAFT_KEY: 'uv_blog_draft',
  MAX_RECENT_BLOGS: 20, // Maximum number of recent blogs to cache
  BLOG_CACHE_EXPIRY: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  DRAFT_EXPIRY: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
};

// Cache manager for recent blogs
export const recentBlogsCache = {
  get: () => {
    try {
      const cached = localStorage.getItem(CACHE_CONFIG.RECENT_BLOGS_KEY);
      if (!cached) return [];
      
      const { blogs, timestamp } = JSON.parse(cached);
      
      // Check if cache is expired
      if (Date.now() - timestamp > CACHE_CONFIG.BLOG_CACHE_EXPIRY) {
        localStorage.removeItem(CACHE_CONFIG.RECENT_BLOGS_KEY);
        return [];
      }
      
      return blogs;
    } catch (error) {
      console.error('Error reading from cache:', error);
      return [];
    }
  },

  add: (blog) => {
    try {
      const cached = recentBlogsCache.get();
      const existingIndex = cached.findIndex(b => b.slug === blog.slug);
      
      // Remove if exists
      if (existingIndex > -1) {
        cached.splice(existingIndex, 1);
      }
      
      // Add to front of array
      cached.unshift({
        slug: blog.slug,
        title: blog.title,
        timestamp: Date.now()
      });
      
      // Limit size
      const limitedCache = cached.slice(0, CACHE_CONFIG.MAX_RECENT_BLOGS);
      
      localStorage.setItem(CACHE_CONFIG.RECENT_BLOGS_KEY, JSON.stringify({
        blogs: limitedCache,
        timestamp: Date.now()
      }));

      return true;
    } catch (error) {
      console.error('Error writing to cache:', error);
      return false;
    }
  },

  check: (slug) => {
    const cached = recentBlogsCache.get();
    return cached.some(blog => blog.slug === slug);
  },

  clear: () => {
    try {
      localStorage.removeItem(CACHE_CONFIG.RECENT_BLOGS_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing cache:', error);
      return false;
    }
  }
};

// Draft manager for blog form
export const draftCache = {
  save: (content) => {
    try {
      localStorage.setItem(CACHE_CONFIG.DRAFT_KEY, JSON.stringify({
        content,
        timestamp: Date.now()
      }));
      return true;
    } catch (error) {
      console.error('Error saving draft:', error);
      return false;
    }
  },

  get: () => {
    try {
      const cached = localStorage.getItem(CACHE_CONFIG.DRAFT_KEY);
      if (!cached) return null;
      
      const { content, timestamp } = JSON.parse(cached);
      
      // Check if draft is expired
      if (Date.now() - timestamp > CACHE_CONFIG.DRAFT_EXPIRY) {
        localStorage.removeItem(CACHE_CONFIG.DRAFT_KEY);
        return null;
      }
      
      return content;
    } catch (error) {
      console.error('Error reading draft:', error);
      return null;
    }
  },

  clear: () => {
    try {
      localStorage.removeItem(CACHE_CONFIG.DRAFT_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing draft:', error);
      return false;
    }
  }
};
