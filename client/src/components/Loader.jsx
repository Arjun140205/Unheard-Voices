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
    <div className="flex flex-col items-center justify-center py-8">
      <div className="flex items-center justify-center space-x-2">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-inkDrop" />
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-inkDrop" style={{ animationDelay: '0.3s' }} />
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-inkDrop" style={{ animationDelay: '0.6s' }} />
      </div>
      <div className="mt-6 text-gray-500 text-sm font-serif tracking-wider">
        {message}
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-95 z-50 flex items-center justify-center backdrop-blur-sm transition-opacity duration-300">
        {loaderContent}
      </div>
    );
  }

  return (
    <div className="min-h-[200px] flex items-center justify-center">
      {loaderContent}
    </div>
  );
};

export default Loader;
