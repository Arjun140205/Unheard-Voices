import React from 'react';
import { useLocation } from 'react-router-dom';

const getLoadingMessage = (pathname) => {
  switch (pathname) {
    case '/':
      return 'discovering stories...';
    case '/write':
      return 'preparing your canvas...';
    case '/explore':
      return 'curating stories...';
    case '/admin-portal':
      return 'analyzing insights...';
    case '/tips':
      return 'gathering wisdom...';
    default:
      if (pathname.startsWith('/explore/')) {
        return 'unfolding story...';
      }
      return 'weaving thoughts...';
  }
};

const Loader = ({ fullScreen = false, customMessage }) => {
  const location = useLocation();
  const message = customMessage || getLoadingMessage(location.pathname);
  
  const loaderContent = (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {/* Feather SVG with gentle floating animation */}
      <div className="mb-8 animate-float">
        <svg
          width="60"
          height="40"
          viewBox="0 0 60 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-gray-400"
        >
          {/* Feather path - elegant, flowing lines */}
          <path
            d="M10 35 L15 30 L20 25 L25 20 L30 15 L35 10 L40 8 L45 10 L50 15 L55 20 L58 25 L60 30 L58 35 L55 38 L50 40 L45 38 L40 35 L35 30 L30 25 L25 20 L20 15 L15 10 L10 8 L5 10 L2 15 L0 20 L2 25 L5 30 L10 35"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />
          {/* Feather quill */}
          <path
            d="M30 15 L30 5 L28 3 L32 3 L30 5"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            opacity="0.8"
          />
          {/* Subtle feather details */}
          <path
            d="M25 20 L35 20 M20 25 L40 25 M15 30 L45 30"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.4"
          />
        </svg>
      </div>

      {/* Loading message */}
      <div className="text-gray-600 text-lg font-serif tracking-wide animate-pulse">
          {message}
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 w-screen h-screen bg-white/95 backdrop-blur-sm">
        {loaderContent}
      </div>
    );
  }

  return (
    <div className="w-full h-[50vh] min-h-[400px] bg-white/50">
      {loaderContent}
    </div>
  );
};

export default Loader;
