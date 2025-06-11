import React from 'react';

export default function BackgroundImage({ children, imageUrl }) {
  return (
    <div className="min-h-[calc(100vh-80px)] relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${imageUrl})`,
          backgroundAttachment: 'fixed'
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.82), rgba(255, 255, 255, 0.75))',
          backdropFilter: 'blur(1px)',
        }}
      />
      <div className="relative z-0">
        {children}
      </div>
    </div>
  );
}
