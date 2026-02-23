import React from 'react';
import { motion } from 'framer-motion';

const Background = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden -z-10 bg-[#fafafa]">
      {/* Mesh Gradient Base */}
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: `
          radial-gradient(at 0% 0%, rgba(124, 58, 237, 0.1) 0px, transparent 50%),
          radial-gradient(at 100% 0%, rgba(79, 70, 229, 0.05) 0px, transparent 50%),
          radial-gradient(at 100% 100%, rgba(124, 58, 237, 0.1) 0px, transparent 50%),
          radial-gradient(at 0% 100%, rgba(79, 70, 229, 0.05) 0px, transparent 50%)
        `
      }}></div>

      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")'
      }}></div>

      {/* Geometric Grid Pattern */}
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.03) 1px, transparent 0)`,
        backgroundSize: '48px 48px'
      }}></div>

      {/* Dynamic Animated Blobs - Refined */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-200/20 rounded-full filter blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 50, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-100/30 rounded-full filter blur-[100px]"
        />
        <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-purple-300/10 rounded-full filter blur-[80px] animate-pulse"></div>
      </div>
    </div>
  );
};

export default Background;
