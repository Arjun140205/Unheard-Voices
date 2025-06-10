import React from 'react';

export default function BackgroundImage({ children, imageUrl }) {
  return (
    <div className="min-h-screen relative">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500"
        style={{ 
          backgroundImage: `url(${imageUrl})`,
          backgroundAttachment: 'fixed'
        }}
      />
      <div
        className="fixed inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.82), rgba(255, 255, 255, 0.75))',
          backdropFilter: 'blur(1px)',
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
