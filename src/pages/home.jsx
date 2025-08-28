import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100
    }
  }
};

const Home = () => {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Lightning Fast',
      description: 'Optimized for speed and performance.'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'Secure',
      description: 'Built with security in mind.'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      title: 'Responsive',
      description: 'Looks great on any device.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-gray-200 dark:bg-grid-gray-800 [mask-image:linear-gradient(0deg,transparent,black,transparent)]"></div>
      
      {/* Animation styles */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float { 
          animation: float 6s ease-in-out infinite;
        }
        .bg-grid-gray-200 {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(229 231 235 / 0.5)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
        }
        .dark .bg-grid-gray-800 {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(31 41 55 / 0.5)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
        }
      `}</style>
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[90vh] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left Column - Text Content */}
          <motion.div 
            className="text-left space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-sm font-medium mb-4"
            >
              👋 Welcome to my portfolio
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Hi, I'm <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Gimhana</span>
              <span className="block mt-2 text-2xl md:text-3xl font-normal bg-gradient-to-r from-gray-600 to-gray-400 dark:from-gray-300 dark:to-gray-500 bg-clip-text text-transparent">
                Full-Stack Developer
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              I craft exceptional digital experiences that blend beautiful design with clean, efficient code. Let's build something amazing together! 🚀
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-5 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Button 
                primary 
                onClick={() => window.location.href = '#work'}
              >
                View My Work
                <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Button>
              
              <Button 
                secondary
                onClick={() => window.open('/cv.pdf', '_blank')}
              >
                Download CV
                <svg className="w-5 h-5 ml-3 group-hover:translate-y-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </Button>
            </motion.div>
            
            <style jsx global>{`
              @keyframes shimmer {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
              }
              
              .ripple {
                position: absolute;
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                background-color: rgba(255, 255, 255, 0.3);
                pointer-events: none;
              }
              
              .btn-secondary .ripple {
                background-color: rgba(0, 0, 0, 0.1);
              }
              
              @keyframes ripple {
                to {
                  transform: scale(2.5);
                  opacity: 0;
                }
              }
            `}</style>

            {/* Social Icons */}
            <motion.div 
              className="flex gap-5 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {[
                { name: 'github', icon: 'github' },
                { name: 'linkedin', icon: 'linkedin' },
                { name: 'twitter', icon: 'twitter' },
                { name: 'email', icon: 'mail' }
              ].map((social) => (
                <a 
                  key={social.name}
                  href={`#${social.name}`}
                  className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1"
                  aria-label={social.name}
                >
                  <i className={`fab fa-${social.icon} text-xl`}></i>
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Profile Image */}
          <motion.div 
            className="relative w-full max-w-md mx-auto perspective-1000"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {/* 3D Tilt Effect Container */}
            <motion.div 
              className="relative z-10 group"
              whileHover="hover"
              variants={{
                hover: {
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }
              }}
            >
              {/* Animated gradient border with 3D effect */}
              <motion.div 
                className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-all duration-500"
                variants={{
                  hover: {
                    opacity: 1,
                    rotateX: 10,
                    rotateY: 10,
                    transition: { duration: 0.5 }
                  }
                }}
              />
              
              {/* Transparent circle container */}
              <motion.div 
                className="relative rounded-full p-1 bg-transparent overflow-visible"
                style={{
                  border: '2px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 0 40px rgba(124, 58, 237, 0.2)',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 70%)',
                  backdropFilter: 'blur(10px)'
                }}
                variants={{
                  hover: {
                    rotateX: -5,
                    rotateY: -5,
                    transition: { 
                      type: 'spring',
                      stiffness: 300,
                      damping: 20
                    }
                  }
                }}
              >
                {/* Subtle circular grid */}
                <div className="absolute inset-0 opacity-20 dark:opacity-10">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <circle cx="50" cy="50" r="49" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.3" />
                    <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.3" />
                    <circle cx="50" cy="50" r="15" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.3" />
                    <line x1="10" y1="50" x2="90" y2="50" stroke="rgba(255,255,255,0.2)" strokeWidth="0.3" />
                    <line x1="50" y1="10" x2="50" y2="90" stroke="rgba(255,255,255,0.2)" strokeWidth="0.3" />
                  </svg>
                </div>
                
                {/* Profile image with parallax effect */}
                <motion.div 
                  className="relative rounded-full overflow-hidden w-full aspect-square"
                  whileHover={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <motion.div
                    className="w-full h-full rounded-full overflow-hidden"
                    style={{
                      background: 'transparent',
                      border: '2px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: 'inset 0 0 40px rgba(124, 58, 237, 0.3)'
                    }}
                    animate={{ 
                      scale: [1, 1.02, 1],
                      rotate: [0, 1, -1, 0],
                    }}
                    transition={{ 
                      duration: 12,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <img 
                      src="/profile.png" 
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdC<KEY>';
                      }}
                    />
                  </motion.div>
                  
                  {/* Animated gradient overlay */}
                  <motion.div 
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                    style={{
                      background: 'radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.2), transparent 50%)',
                      mixBlendMode: 'overlay'
                    }}
                    variants={{
                      hover: {
                        opacity: 1,
                        transition: { duration: 0.5 }
                      }
                    }}
                  />
                </motion.div>
                
                {/* Floating particles - More visible and dynamic */}
                {[...Array(12)].map((_, i) => {
                  const size = Math.random() * 8 + 4;
                  const color = `hsl(${Math.random() * 60 + 200}, 90%, 70%)`;
                  const startX = 10 + Math.random() * 80; // Keep particles more centered
                  const startY = 10 + Math.random() * 80;
                  
                  return (
                    <motion.div
                      key={`particle-${i}`}
                      className="absolute rounded-full z-10"
                      style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        background: color,
                        boxShadow: `0 0 ${size}px ${size/2}px ${color}40`,
                        top: `${startY}%`,
                        left: `${startX}%`,
                        opacity: 0,
                        filter: 'blur(1.5px)'
                      }}
                      animate={{
                        y: [0, -40, 0],
                        x: [0, (Math.random() - 0.5) * 60, 0],
                        opacity: [0, 0.9, 0],
                        scale: [0.3, 1.5, 0.3],
                        boxShadow: [
                          `0 0 ${size}px ${size/3}px ${color}40`,
                          `0 0 ${size*2}px ${size}px ${color}80`,
                          `0 0 ${size}px ${size/3}px ${color}40`
                        ]
                      }}
                      transition={{
                        duration: 6 + Math.random() * 8,
                        repeat: Infinity,
                        repeatType: 'loop',
                        delay: Math.random() * 3,
                        ease: 'easeInOut',
                        times: [0, 0.5, 1]
                      }}
                    />
                  );
                })}
              </motion.div>
              
              {/* Orbiting tech badges with 3D effect */}
              <div className="absolute -inset-10 -z-10 flex items-center justify-center scale-110">
                {[
                  { name: 'React', icon: 'react', color: 'text-blue-500' },
                  { name: 'Node', icon: 'nodejs', color: 'text-green-500' },
                  { name: 'Express', icon: 'express', color: 'text-gray-500' },
                  { name: 'MongoDB', icon: 'mongodb', color: 'text-green-600' },
                  { name: 'Firebase', icon: 'firebase', color: 'text-yellow-500' },
                  { name: 'CSS', icon: 'css3', color: 'text-blue-400' },
                  { name: 'HTML', icon: 'html5', color: 'text-orange-500' },
                  { name: 'JavaScript', icon: 'javascript', color: 'text-yellow-400' },
                  { name: 'Redux', icon: 'redux', color: 'text-purple-500' },
                  { name: 'Git', icon: 'git', color: 'text-orange-600' },
                  { name: 'REST', icon: 'rest', color: 'text-blue-500' },
                  { name: 'JWT', icon: 'jwt', color: 'text-pink-500' }
                ].map((tech, i, arr) => {
                  const angle = (i * (360 / arr.length)) * (Math.PI / 180);
                  const baseRadius = 16; // Increased base radius
                  const radiusVariance = 4; // More dynamic movement
                  const radius = baseRadius + (Math.sin(angle * 2) * radiusVariance);
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  const z = Math.sin(angle * 2) * 15;
                  
                  const hue = (i * (360 / arr.length) + 200) % 360;
                  const color = `hsl(${hue}, 80%, 60%)`;
                  
                  return (
                    <motion.div 
                      className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg p-2"
                      style={{ 
                        boxShadow: `0 10px 20px -5px ${color}40`,
                        transform: `translateZ(${z}px) translateY(${y}rem)`
                      }}
                      animate={{
                        z: z,
                        opacity: [0.9, 1, 0.9],
                        scale: [0.9, 1.1, 0.9],
                        rotateY: [0, 180, 360],
                        rotateX: [0, 180, 360]
                      }}
                      transition={{
                        x: {
                          duration: 30 + Math.random() * 10,
                          repeat: Infinity,
                          ease: 'linear',
                          repeatType: 'reverse'
                        },
                        y: {
                          duration: 35 + Math.random() * 15,
                          repeat: Infinity,
                          ease: [0.4, 0, 0.2, 1],
                          repeatType: 'reverse'
                        },
                        z: {
                          duration: 20 + Math.random() * 10,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          repeatType: 'reverse'
                        },
                        rotateY: {
                          duration: 40 + Math.random() * 20,
                          repeat: Infinity,
                          ease: 'linear'
                        },
                        rotateX: {
                          duration: 30 + Math.random() * 20,
                          repeat: Infinity,
                          ease: 'linear',
                          delay: Math.random() * 5
                        },
                        opacity: {
                          duration: 5 + Math.random() * 3,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        },
                        scale: {
                          duration: 4 + Math.random() * 2,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        },
                        default: {
                          duration: 0.6,
                          delay: 0.1 + (i * 0.05),
                          type: 'spring',
                          stiffness: 120,
                          damping: 12
                        }
                      }}
                      whileHover={{
                        scale: 1.3,
                        z: 50,
                        filter: 'brightness(1.2)',
                        transition: { 
                          duration: 0.2,
                          type: 'spring',
                          stiffness: 400,
                          damping: 10
                        }
                      }}
                    >
                      <motion.div 
                        className="glass-card p-0.5 rounded-xl backdrop-blur-sm"
                        style={{
                          transform: 'translateZ(20px)',
                          background: `linear-gradient(145deg, ${color}05, rgba(255,255,255,0.05))`,
                          boxShadow: `0 4px 12px -4px ${color}15, 0 2px 4px -2px rgba(0, 0, 0, 0.05)`,
                          border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                        whileHover={{
                          y: -2,
                          scale: 1.02,
                          boxShadow: `0 6px 16px -2px ${color}20, 0 2px 8px -2px rgba(0, 0, 0, 0.1)`,
                          transition: { 
                            duration: 0.2,
                            type: 'spring',
                            stiffness: 400,
                            damping: 15
                          }
                        }}
                      >
                        <div className="px-2.5 py-1.5 bg-white/90 dark:bg-gray-800/90 rounded-lg flex items-center gap-2">
                          <div 
                            className="w-5 h-5 rounded-md flex items-center justify-center text-sm"
                            style={{
                              background: `linear-gradient(135deg, ${color}15, ${color}30)`,
                              color: color,
                              border: `1px solid ${color}20`
                            }}
                          >
                            {tech.icon}
                          </div>
                          <span className="font-medium text-xs text-gray-700 dark:text-gray-200">
                            {tech.name}
                          </span>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
            
            {/* Animated background glow */}
            <motion.div 
              className="absolute -z-20 -inset-32 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 filter blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.15, 0.1],
                rotate: [0, 5, 0]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5
              }}
            />
            
            {/* Floating micro-interactions */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`dot-${i}`}
                className="absolute rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                style={{
                  width: `${Math.random() * 6 + 2}px`,
                  height: `${Math.random() * 6 + 2}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  filter: 'blur(1px)'
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, (Math.random() - 0.5) * 40, 0],
                  opacity: [0, 0.7, 0],
                  scale: [0.5, 1.2, 0.5]
                }}
                transition={{
                  duration: 8 + Math.random() * 10,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </motion.div>
        </div>

        </section>

        {/* About Me Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Column - Image */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative w-full h-full">
                  <img 
                    src="/121.png" 
                    alt="Profile" 
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  {/* Decorative elements */}
                  <div className="absolute -top-6 -right-6 w-32 h-32 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 dark:opacity-10"></div>
                  <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 dark:opacity-10"></div>
                </div>
              </motion.div>

              {/* Right Column - Content */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  About <span className="text-indigo-600 dark:text-indigo-400">Me</span>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  A passionate UI/UX Designer with a strong foundation in user interface (UI) and user experience (UX) design. Proficient in design principles, wireframing, prototyping, and user research. Seeking opportunities to apply creative skills and contribute to designing intuitive and engaging digital experiences. Eager to leverage academic knowledge and hands-on experience to contribute to innovative design projects and enhance user satisfaction.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-1 h-6 bg-indigo-600 mr-3"></div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                      <p className="font-medium text-gray-800 dark:text-white">Gimhana Deshapriya</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-1 h-6 bg-indigo-600 mr-3"></div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <p className="font-medium text-gray-800 dark:text-white">Gimhandeshapriya567@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-1 h-6 bg-indigo-600 mr-3"></div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">From</p>
                      <p className="font-medium text-gray-800 dark:text-white">Gampaha, Sri Lanka</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        

        {/* Education Section - Modern Background */}
        <section className="py-20 relative overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-blue-50/50 dark:from-gray-900/95 dark:via-gray-800/95 dark:to-gray-900/95"></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10 dark:opacity-5" style={{
            backgroundImage: 'linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
          
          {/* Animated Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-32 -top-32 w-[600px] h-[600px] bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40 dark:opacity-10 animate-float"></div>
            <div className="absolute -left-32 -bottom-32 w-[600px] h-[600px] bg-gradient-to-tr from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40 dark:opacity-10 animate-float animation-delay-2000"></div>
            <br/>
            <br/>
          
            <div className="text-center mb-16 overflow-hidden">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { 
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1] 
                  }
                }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ 
                    opacity: 1, 
                    x: 0,
                    transition: { 
                      delay: 0.1,
                      duration: 0.6
                    }
                  }}
                  className="inline-block"
                >
                  My 
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ 
                    opacity: 1, 
                    x: 0,
                    transition: { 
                      delay: 0.2,
                      duration: 0.6
                    }
                  }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 inline-block"
                >
                  Education
                </motion.span>
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    delay: 0.4,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1]
                  }
                }}
                viewport={{ once: true, margin: "-20px" }}
              >
                <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                  Academic journey and achievements
                </p>
              </motion.div>
            </div>
            
            {/* Subtle dots */}
            <div className="absolute right-20 top-1/4 w-3 h-3 bg-indigo-400 dark:bg-indigo-600 rounded-full opacity-70 animate-pulse"></div>
            <div className="absolute left-1/4 bottom-1/3 w-2 h-2 bg-blue-400 dark:bg-blue-600 rounded-full opacity-70 animate-pulse animation-delay-1000"></div>
          </div>
          <br/>
            <br/>
            <br/>
            <br/>
            <br/>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            

            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {[
                {
                  degree: "BSc (Hons) in Information Technology",
                  institution: "Sri Lanka Institute of Information Technology",
                  period: "2021 - Present",
                  description: "Specializing in Software Engineering and Web Development with hands-on experience in modern technologies.",
                  skills: ["Web Development", "Software Engineering", "Database Systems", "UI/UX Design"],
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.01a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.01a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                  )
                },
                {
                  degree: "G.C.E Advanced Level (A/L)",
                  institution: "Thakshila College Gampaha",
                  period: "2017 - 2019",
                  description: "Physical Science Stream with strong analytical and problem-solving skills development.",
                  skills: ["Combined Mathematics", "Physics", "Chemistry"],
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  )
                }
              ].map((edu, index) => (
                <motion.div
                  key={index}
                  className="group relative rounded-2xl p-6 backdrop-blur-sm bg-white/70 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-600/10 dark:from-indigo-400/10 dark:to-purple-500/10 group-hover:scale-110 transition-transform duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-600 dark:text-indigo-400">
                        {edu.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{edu.degree}</h3>
                        <p className="text-indigo-600 dark:text-indigo-400 font-medium">{edu.institution}</p>
                      </div>
                    </div>
                    
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-indigo-50 dark:bg-gray-700 text-indigo-700 dark:text-indigo-300 rounded-full mb-4">
                      {edu.period}
                    </span>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-5">{edu.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {edu.skills.map((skill, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 text-xs font-medium bg-white dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-600"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills/Technologies */}
        <section className="py-16     backdrop-blur-sm relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1] 
                }
              }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <motion.h2 
                className="text-4xl font-bold text-gray-900 dark:text-white mb-3"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    delay: 0.2,
                    duration: 0.6
                  }
                }}
                viewport={{ once: true }}
              >
                My <motion.span 
                  className="text-blue-600 dark:text-blue-400 inline-block"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ 
                    opacity: 1, 
                    scale: 1,
                    transition: { 
                      delay: 0.3,
                      type: 'spring',
                      stiffness: 300
                    }
                  }}
                  viewport={{ once: true }}
                >Skills</motion.span>
              </motion.h2>
              <motion.p 
                className="text-gray-500 dark:text-gray-400 text-lg"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    delay: 0.4,
                    duration: 0.6
                  }
                }}
                viewport={{ once: true }}
              >
                Here are my skills and expertise
              </motion.p>
            </motion.div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {[
                { 
                  name: 'HTML5', 
                  category: 'Frontend', 
                  icon: 'HTML5',
                  color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
                },
                { 
                  name: 'CSS3', 
                  category: 'Styling', 
                  icon: 'CSS3',
                  color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
                },
                { 
                  name: 'JavaScript', 
                  category: 'Language', 
                  icon: 'JavaScript',
                  color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
                },
                { 
                  name: 'React', 
                  category: 'Frontend', 
                  icon: 'React',
                  color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
                },
                { 
                  name: 'Node.js', 
                  category: 'Backend', 
                  icon: 'nodejs',
                  color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
                },
                { 
                  name: 'MongoDB', 
                  category: 'Database', 
                  icon: 'MongoDB',
                  color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
                },
                { 
                  name: 'Express', 
                  category: 'Backend', 
                  icon: 'Express',
                  color: 'bg-gray-100 text-gray-600 dark:bg-gray-700/30 dark:text-gray-300',
                },
                { 
                  name: 'MySQL', 
                  category: 'Database', 
                  icon: 'MySQL',
                  color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
                },
                { 
                  name: 'PHP', 
                  category: 'Backend', 
                  icon: 'PHP',
                  color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
                },
                { 
                  name: 'Java', 
                  category: 'Language', 
                  icon: 'Java',
                  color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
                },
                { 
                  name: 'C', 
                  category: 'Language', 
                  icon: 'C',
                  color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
                },
                { 
                  name: 'C++', 
                  category: 'Language', 
                  icon: 'CPlusPlus',
                  color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
                },
                { 
                  name: 'Kotlin', 
                  category: 'Mobile', 
                  icon: 'Kotlin',
                  color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
                },
                { 
                  name: 'Figma', 
                  category: 'Design', 
                  icon: 'Figma',
                  color: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400',
                },
                { 
                  name: 'React Native', 
                  category: 'Mobile', 
                  icon: 'react',
                  color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
                },
                { 
                  name: 'TypeScript', 
                  category: 'Language', 
                  icon: 'typescript',
                  color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
                },
                { 
                  name: 'Laravel', 
                  category: 'Backend', 
                  icon: 'laravel',
                  color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
                },
                { 
                  name: 'Firebase', 
                  category: 'Backend', 
                  icon: 'firebase',
                  color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
                },
                {
                  name: 'Git',
                  category: 'Version Control',
                  icon: 'git',
                  color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
                },
                {
                  name: 'Github',
                  category: 'Version Control',
                  icon: 'github',
                  color: 'bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400',
                },
                {
                  name: 'Wordpress',
                  category: 'CMS',
                  icon: 'wordpress',
                  color: 'bg-white-100 text-white-600 dark:bg-white-900/30 dark:text-white-400',
                }
              ].map((skill, index) => (
                <motion.div 
                  key={index}
                  className="bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-md p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="flex flex-col items-center">
                    <div className={`${skill.color} w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-2`}>
                      <img 
                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon.toLowerCase()}/${skill.icon.toLowerCase()}-original.svg`} 
                        alt={skill.name}
                        className="w-8 h-8 md:w-10 md:h-10"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon.toLowerCase()}/${skill.icon.toLowerCase()}-plain.svg`;
                        }}
                      />
                    </div>
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm md:text-base">{skill.name}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              variants={item}
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 bg-indigo-50 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Work Experience Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 mb-4">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></span>
              <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">EXPERIENCE</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
              Professional Journey
            </h2>
            <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              A timeline of my professional growth and key contributions
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-1/2 w-0.5 h-full bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
            
            <div className="space-y-16">
              {/* JCEY Tea Factory */}
              <motion.div 
                className="relative group"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 z-10">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div className="ml-12">
                  <div className="absolute -left-1 top-0 w-0.5 h-full bg-gradient-to-b from-indigo-500/30 to-transparent"></div>
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-xl shadow-indigo-500/5 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 group-hover:-translate-y-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                      <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                        Art Work Designer
                      </h3>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-700 dark:text-indigo-300 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                        2023
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      JCEY Tea Factory
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Leading the design of visually stunning tea packaging and marketing materials, collaborating with the Artwork development team to create compelling brand experiences that resonate with customers.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="px-3 py-1 text-xs font-medium bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full">
                        Packaging Design
                      </span>
                      <span className="px-3 py-1 text-xs font-medium bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full">
                        Brand Identity
                      </span>
                      <span className="px-3 py-1 text-xs font-medium bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full">
                        Print Production
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Freelancing */}
              <motion.div 
                className="relative group"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="absolute -right-4 top-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20 z-10">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M12 18h.01" />
                  </svg>
                </div>
                <div className="mr-12">
                  <div className="absolute -right-1 top-0 w-0.5 h-full bg-gradient-to-b from-blue-500/30 to-transparent"></div>
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-xl shadow-blue-500/5 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 group-hover:-translate-y-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                      <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">
                        Social Media Designer
                      </h3>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-blue-500/10 text-blue-700 dark:text-blue-300 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                        2022
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M12 18h.01" />
                      </svg>
                      Freelance Designer
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Crafted engaging social media content and strategic visual assets for diverse clients, helping them build strong brand identities and increase their digital presence across multiple platforms.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="px-3 py-1 text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                        Social Media Graphics
                      </span>
                      <span className="px-3 py-1 text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                        Brand Strategy
                      </span>
                      <span className="px-3 py-1 text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                        Content Creation
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Company of Environment */}
              <motion.div 
                className="relative group"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 z-10">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.486M7 17h.01" />
                  </svg>
                </div>
                <div className="ml-12">
                  <div className="absolute -left-1 top-0 w-0.5 h-full bg-gradient-to-b from-emerald-500/30 to-transparent"></div>
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-xl shadow-emerald-500/5 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 group-hover:-translate-y-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                      <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">
                        Social Media Manager
                      </h3>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        2020
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      Company of Environment
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Managed and curated content for social media platforms, creating impactful campaigns to raise environmental awareness and engage the community in sustainability initiatives.
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 text-xs font-medium bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full">
                          Content Strategy
                        </span>
                        <span className="px-3 py-1 text-xs font-medium bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full">
                          Community Engagement
                        </span>
                        <span className="px-3 py-1 text-xs font-medium bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full">
                          Visual Storytelling
                        </span>
                      </div>
                      <a 
                        href="https://www.facebook.com/companyofenvironment76" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg hover:opacity-90 transition-opacity group-hover:shadow-lg group-hover:shadow-emerald-500/20"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                        </svg>
                        View Work
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to get started?</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of satisfied users who are already using our platform.
          </p>
          <button className="px-8 py-3 bg-white text-indigo-600 font-medium rounded-lg hover:bg-opacity-90 transition-opacity">
            Sign Up Free
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;