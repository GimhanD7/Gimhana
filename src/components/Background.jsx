import React from 'react';

const Background = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden -z-10">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-1000"></div>
      
      {/* Geometric shapes */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10 transition-opacity duration-1000">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-400/30 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-t from-indigo-400/30 to-transparent"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-300/20 dark:bg-purple-600/10 mix-blend-multiply filter blur-3xl animate-blob"></div>
      </div>
      
      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10 transition-opacity duration-1000" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")'
      }}></div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-30 dark:opacity-10 transition-opacity duration-1000" style={{
        backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        color: 'rgba(99, 102, 241, 0.1)'
      }}></div>
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-transparent to-indigo-50/80 dark:from-gray-900/95 dark:to-gray-800/90 transition-colors duration-1000"></div>
      
      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-indigo-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>
    </div>
  );
};

export default Background;
