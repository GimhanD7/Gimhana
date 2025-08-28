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
              <div className="absolute inset-0 -z-10 flex items-center justify-center scale-125">
                {[
                  { name: 'React', icon: '⚛️' },
                  { name: 'Node', icon: '⬢' },
                  { name: 'Express', icon: '🚀' },
                  { name: 'MongoDB', icon: '🍃' },
                  { name: 'Firebase', icon: '🔥' },
                  { name: 'CSS', icon: '🎨' },
                  { name: 'HTML', icon: '🌐' },
                  { name: 'JavaScript', icon: 'JS' },
                  { name: 'Redux', icon: '🔄' },
                  { name: 'Git', icon: '🐙' },
                  { name: 'REST API', icon: '🔌' },
                  { name: 'JWT', icon: '🔑' }
                ].map((tech, i, arr) => {
                  const angle = (i * (360 / arr.length)) * (Math.PI / 180);
                  const baseRadius = 14; // Increased base radius
                  const radiusVariance = 3; // More dynamic movement
                  const radius = baseRadius + (Math.sin(angle * 2) * radiusVariance);
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  const z = Math.sin(angle * 2) * 20;
                  
                  const hue = (i * (360 / arr.length) + 200) % 360;
                  const color = `hsl(${hue}, 80%, 60%)`;
                  
                  return (
                    <motion.div
                      key={tech}
                      className="absolute"
                      style={{
                        x: `${x}rem`,
                        y: `${y}rem`,
                        zIndex: 100 + Math.round(z),
                        scale: 1.2,
                        transformStyle: 'preserve-3d',
                        transform: 'translateZ(0)',
                        willChange: 'transform, opacity'
                      }}
                      initial={{ opacity: 0, scale: 0.5, y: 20 }}
                      animate={{
                        x: `${x}rem`,
                        y: `${y}rem`,
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
                        className="glass-card p-1.5 rounded-2xl backdrop-blur-lg"
                        style={{
                          transform: 'translateZ(30px)',
                          background: `linear-gradient(145deg, ${color}10, rgba(255,255,255,0.1))`,
                          boxShadow: `0 8px 32px -8px ${color}20, 0 4px 8px -4px rgba(0, 0, 0, 0.1)`,
                          border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}
                        whileHover={{
                          y: -5,
                          scale: 1.05,
                          boxShadow: `0 12px 24px -4px ${color}30, 0 6px 12px -4px rgba(0, 0, 0, 0.15)`,
                          transition: { 
                            duration: 0.3,
                            type: 'spring',
                            stiffness: 300,
                            damping: 15
                          }
                        }}
                      >
                        <div className="px-4 py-3 bg-white/90 dark:bg-gray-800/90 rounded-xl flex items-center gap-3">
                          <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
                            style={{
                              background: `linear-gradient(135deg, ${color}15, ${color}30)`,
                              color: color,
                              border: `1px solid ${color}30`
                            }}
                          >
                            {tech.icon}
                          </div>
                          <span className="font-medium text-sm text-gray-800 dark:text-gray-100">
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
              className="absolute -z-20 -inset-20 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 filter blur-3xl"
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

      {/* Skills/Technologies */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            My <span className="text-indigo-600 dark:text-indigo-400">Skills</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['React', 'JavaScript', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Figma', 'Git', 'AWS'].map((skill, index) => (
              <motion.div 
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="w-14 h-14 bg-indigo-50 dark:bg-gray-700 rounded-full flex items-center justify-center mb-3">
                  <span className="text-2xl">{skill[0]}</span>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white">{skill}</h3>
              </motion.div>
            ))}
          </div>
        </motion.div>
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