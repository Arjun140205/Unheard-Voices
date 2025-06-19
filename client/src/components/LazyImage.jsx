import React from 'react';
import { useInView } from 'react-intersection-observer';

const LazyImage = ({ src, alt, className }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '50px 0px',
  });

  return (
    <div ref={ref} className={className}>
      {inView ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={className}
        />
      ) : (
        <div className="animate-pulse bg-gray-200 w-full h-full min-h-[200px]" />
      )}
    </div>
  );
};

export default LazyImage;
