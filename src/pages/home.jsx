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
            className="relative"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <motion.div 
              className="relative z-10 bg-white/40 dark:bg-gray-800/40 backdrop-blur-lg rounded-3xl p-1.5 shadow-2xl transform transition-all duration-700 group hover:shadow-purple-500/20 hover:-translate-y-2"
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 25px 50px -12px rgba(124, 58, 237, 0.25)'
              }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 aspect-square border border-white/20">
                {/* Animated background grid */}
                <div className="absolute inset-0 opacity-10 dark:opacity-5">
                  <div className="absolute inset-0 bg-[length:30px_30px] [mask-image:linear-gradient(0deg,transparent,white,transparent)]" 
                    style={{
                      backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)'
                    }}
                  />
                </div>
                
                {/* Profile image container */}
                <div className="w-full h-full flex items-center justify-center p-6">
                  <motion.div 
                    className="w-full h-full bg-white/30 dark:bg-black/20 backdrop-blur-sm rounded-2xl flex items-center justify-center overflow-hidden border-2 border-white/30 dark:border-white/10"
                    whileHover={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    <motion.div
                      className="w-full h-full relative overflow-hidden"
                      animate={{ 
                        y: [0, -5, 0],
                        rotate: [0, 1, -1, 0],
                      }}
                      transition={{ 
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        times: [0, 0.2, 0.4, 1]
                      }}
                    >
                      <img 
                        src="/profile.png" 
                        alt="Profile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '';
                        }}
                      />
                    </motion.div>
                  </motion.div>
                </div>
                
                {/* Animated floating elements */}
                <motion.div 
                  className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 group-hover:opacity-30 transition-all duration-1000"
                  animate={{
                    y: [0, -15, 0],
                    x: [0, 10, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
                
                <motion.div 
                  className="absolute -top-10 -left-10 w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 group-hover:opacity-30 transition-all duration-1000"
                  animate={{
                    y: [0, 15, 0],
                    x: [0, -10, 0],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1
                  }}
                />
              </div>
              
              {/* Floating elements outside card */}
              <motion.div 
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 dark:opacity-5"
                animate={{
                  y: [0, -20, 0],
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, 0]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5
                }}
              />
              
              <motion.div 
                className="absolute -top-8 -right-8 w-40 h-40 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 dark:opacity-5"
                animate={{
                  y: [0, 20, 0],
                  scale: [1, 1.2, 1],
                  rotate: [0, -15, 0]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1
                }}
              />
              
              {/* Tech stack badges with staggered animation */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {['React', 'Node', 'Next', 'TS'].map((tech, i) => (
                  <motion.span 
                    key={tech}
                    className="px-3 py-1.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md text-xs font-medium rounded-full shadow-lg border border-white/20 dark:border-gray-700"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.3 + (i * 0.1),
                      type: 'spring',
                      stiffness: 100,
                      damping: 10
                    }}
                    whileHover={{
                      y: -5,
                      scale: 1.1,
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                      transition: { duration: 0.2 }
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
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