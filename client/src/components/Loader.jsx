import React from 'react';

const Loader = ({ fullScreen = false }) => {
  const loaderContent = (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        {/* Main spinner */}
        <div className="w-12 h-12 rounded-full border-t-2 border-b-2 border-blue-500 animate-spin"></div>
        {/* Inner dot */}
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      <div className="mt-4 text-gray-600 text-sm font-medium">Loading...</div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center">
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
