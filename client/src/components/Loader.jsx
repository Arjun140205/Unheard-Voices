import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import loaderVideo from '../assets/videos/loader.mp4';

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
  const videoRef = useRef(null);
  const message = customMessage || getLoadingMessage(location.pathname);

  useEffect(() => {
    // Reset and play the video whenever the loader mounts
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(err => console.log('Video autoplay failed:', err));
    }
  }, []);
  
  const loaderContent = (
    <div className="flex flex-col items-center justify-center w-full h-full relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          muted
          loop={false}
          autoPlay
        >
          <source src={loaderVideo} type="video/mp4" />
        </video>
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <div className="flex items-center justify-center space-x-3 mb-8">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="w-3 h-3 bg-gray-600/80 rounded-full animate-inkDrop"
              style={{
                animationDelay: `${index * 0.4}s`,
              }}
            />
          ))}
        </div>

        {/* Message */}
        <div className="text-gray-800 text-lg font-serif tracking-widest animate-loaderText bg-white/40 px-6 py-3 rounded-full backdrop-blur-sm">
          {message}
        </div>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 w-screen h-screen">
        {loaderContent}
      </div>
    );
  }

  return (
    <div className="w-full h-[50vh] min-h-[400px]">
      {loaderContent}
    </div>
  );
};

export default Loader;
