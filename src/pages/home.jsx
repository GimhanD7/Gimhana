import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Button from '../components/Button';
import { useToast } from '../contexts/ToastContext';
import emailjs from '@emailjs/browser';

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

const ArtworkPopup = ({ isOpen, onClose, artworkUrl }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-1">
              <iframe 
                src={artworkUrl}
                className="w-full h-[70vh] border-0 rounded-lg"
                title="Brand Artwork Showcase"
                allowFullScreen
                key={artworkUrl}
              />
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Home = () => {
  const toast = useToast();
  const [isArtworkOpen, setIsArtworkOpen] = useState(false);
  const [artworkUrl, setArtworkUrl] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize EmailJS with your public key
  useEffect(() => {
    emailjs.init('uEfOjnUp0V07aWPgO');
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.showError('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.showError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Import EmailJS
      const emailjs = (await import('@emailjs/browser')).default;
      
      // Send email using EmailJS
      await emailjs.send(
        'service_1k7k7ce', // Service ID
        'template_6znvb0k', // Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject || 'New message from portfolio contact form',
          message: formData.message,
          to_email: 'gimhanadissanayake7@gmail.com' // Your email address
        },
        'uEfOjnUp0V07aWPgO' // Public key
      );
      
      // Show success message
      toast.showSuccess('Message sent successfully!');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Error sending email:', error);
      toast.showError('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
              I craft exceptional digital experiences that blend beautiful design with clean, efficient code. Let's build something amazing together! 
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
                className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500"
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
              
              {/* Tech Stack Grid */}
              <div className="relative w-full max-w-5xl mx-auto hidden sm:block">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 p-4">
                  {[
                    { name: 'React', icon: '⚛️' },
                    { name: 'Node.js', icon: '🟢' },
                    { name: 'MongoDB', icon: '🍃' },
                    { name: 'Firebase', icon: '🔥' },
                    { name: 'HTML5', icon: '📄' },
                    { name: 'JavaScript', icon: 'JS' },
                  ].map((tech, i) => (
                    <motion.div
                      key={tech.name}
                      className="group relative"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                        transition: {
                          delay: 0.05 * i,
                          duration: 0.4
                        }
                      }}
                      viewport={{ once: true, margin: "-50px" }}
                    >
                      <div className="relative p-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />
                        <div className="relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-3 border border-gray-100/50 dark:border-gray-700/50 group-hover:border-blue-200/50 dark:group-hover:border-blue-900/30 transition-all duration-300 h-full flex flex-col items-center">
                          <div className="text-2xl mb-1.5 text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                            {tech.icon}
                          </div>
                          <span className="text-xs font-medium text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-white transition-colors duration-300">
                            {tech.name}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Subtle animated grid background */}
                <div className="absolute inset-0 -z-10 overflow-hidden opacity-20">
                  <div className="absolute inset-0 bg-grid-gray-200 dark:bg-grid-gray-800 [mask-image:linear-gradient(0deg,transparent,white,darkgray,transparent)] dark:[mask-image:linear-gradient(0deg,transparent,rgba(0,0,0,0.05),rgba(0,0,0,0.2),transparent)]" />
                </div>
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
            <div className="grid md:grid-cols-1 gap-12 items-center">
              {/* Left Column - Image */}
              {/* <motion.div 
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
                  <div className="absolute -top-6 -right-6 w-32 h-32 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 dark:opacity-10"></div>
                  <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 dark:opacity-10"></div>
                </div>
              </motion.div> */}

              {/* Right Column - Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl mx-auto"
              >
                <div className="text-left mb-12">
                  <span className="inline-block text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-3">ABOUT ME</span>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    Crafting digital experiences that users <span className="text-indigo-600 dark:text-indigo-400">love</span>
                  </h2>
                  <div className="h-1 w-20 bg-indigo-600 mb-8"></div>
                  
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                      <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                        I'm a UI/UX Designer passionate about creating intuitive and engaging digital experiences. With expertise in user research, wireframing, and prototyping, I transform complex problems into simple, beautiful, and functional designs.
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                        My approach combines aesthetic sensibility with a strong focus on user needs, ensuring that every design decision serves a purpose and enhances the overall user experience.
                      </p>
                      
                      <div className="flex flex-wrap gap-6 mt-8">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mr-3">
                            <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                            <p className="font-medium text-gray-800 dark:text-white">Gimhana Deshapriya</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mr-3">
                            <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                            <p className="font-medium text-indigo-600 dark:text-indigo-400">Gimhandeshapriya567@gmail.com</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mr-3">
                            <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                            <p className="font-medium text-gray-800 dark:text-white">Gampaha, Sri Lanka</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative rounded-2xl overflow-hidden aspect-square hidden md:block">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl transform rotate-6 scale-105"></div>
                      {/* Replace with your actual image */}
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
                  <div className="absolute -top-6 -right-6 w-32 h-32 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 dark:opacity-10"></div>
                  <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 dark:opacity-10"></div>
                </div>
              </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        

        {/* Education Section */}
        <section className="relative py-20 overflow-hidden bg-white dark:bg-gray-900">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-grid-gray-200 dark:bg-grid-gray-800 [mask-image:linear-gradient(0deg,white,transparent)]">
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white/20 dark:from-gray-900/80 dark:to-gray-900/20"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <motion.div 
              className="text-center mb-16 px-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1] 
                }
              }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-3">
                ACADEMIC BACKGROUND
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                My <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Education</span>
              </h2>
              <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                A journey of continuous learning and academic excellence
              </p>
            </motion.div>

            {/* Timeline */}
            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Timeline line */}
              <div className="absolute left-1/2 w-0.5 h-full bg-gradient-to-b from-indigo-200 to-blue-200 dark:from-gray-700 dark:to-gray-600"></div>
              
              {/* Education Items */}
              <div className="space-y-12">
                {[
                  {
                    degree: "BSc (Hons) in Information Technology",
                    institution: "Sri Lanka Institute of Information Technology",
                    period: "2021 - Present",
                    description: "Specializing in Software Engineering and Web Development with hands-on experience in modern technologies.",
                    skills: ["Web Development", "Software Engineering", "Database Systems", "UI/UX Design"],
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className={`relative flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { 
                        duration: 0.6,
                        delay: index * 0.15
                      }
                    }}
                    viewport={{ once: true }}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-indigo-500 dark:bg-indigo-600 border-4 border-white dark:border-gray-800 z-10"></div>
                    
                    {/* Card */}
                    <div className="w-5/12">
                      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg backdrop-blur-sm bg-opacity-70 dark:bg-opacity-70 border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                            {item.icon}
                          </div>
                          <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{item.period}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{item.degree}</h3>
                        <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-3">{item.institution}</p>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">{item.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {item.skills.map((skill, i) => (
                            <span 
                              key={i}
                              className="px-3 py-1 text-xs font-medium bg-indigo-50 dark:bg-gray-700 text-indigo-700 dark:text-indigo-300 rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* View Resume Button */}
              
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
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 mb-4">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></span>
              <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">EXPERIENCE</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Professional <span className="text-indigo-600 dark:text-indigo-400">Journey</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A timeline of my professional growth and key contributions
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
            {/* Vertical line - Hidden on mobile, visible on md+ */}
            <div className="hidden md:block absolute left-1/2 w-0.5 h-full bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
            
            <div className="space-y-12 md:space-y-16">
              {/* JCEY Tea Factory */}
              <motion.div 
                className="relative group pl-8 md:pl-0"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="absolute -left-1 md:-left-4 top-0 w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 z-10">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div className="ml-8 md:ml-12">
                  <div className="hidden md:block absolute -left-1 top-0 w-0.5 h-full bg-gradient-to-b from-indigo-500/30 to-transparent"></div>
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-xl shadow-indigo-500/5 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 group-hover:-translate-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-3">
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
                    <div className="flex flex-wrap gap-2">
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
                    <button
                      onClick={() => {
                        setArtworkUrl('https://www.pacdora.com/share?filter_url=psb5vv3n6w');
                        setIsArtworkOpen(true);
                      }}
                      className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg hover:opacity-90 transition-opacity group-hover:shadow-lg group-hover:shadow-indigo-500/20"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Sample 01
                    </button>
                    <button
                      onClick={() => {
                        setArtworkUrl('https://www.pacdora.com/share?filter_url=ps0x2ejs0o');
                        setIsArtworkOpen(true);
                      }}
                      className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg hover:opacity-90 transition-opacity group-hover:shadow-lg group-hover:shadow-indigo-500/20"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Sample 02
                    </button>
                    <button
                      onClick={() => {
                        setArtworkUrl('https://www.pacdora.com/share?filter_url=pslu23py9h');
                        setIsArtworkOpen(true);
                      }}
                      className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg hover:opacity-90 transition-opacity group-hover:shadow-lg group-hover:shadow-indigo-500/20"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Sample 03
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Freelancing */}
              <motion.div 
                className="relative group pl-8 md:pl-0"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="absolute -right-4 top-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20 z-10">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M12 18h.01" />
                  </svg>
                </div>
                <div className="mr-12">
                  <div className="absolute -right-1 top-0 w-0.5 h-full bg-gradient-to-b from-blue-500/30 to-transparent"></div>
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-xl shadow-blue-500/5 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 group-hover:-translate-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-3">
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
                className="relative group pl-8 md:pl-0"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
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
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-3">
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

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 mb-4">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></span>
              <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">GET IN TOUCH</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Let's <span className="text-indigo-600 dark:text-indigo-400">Work Together</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Have a project in mind or want to discuss potential opportunities? I'd love to hear from you!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm transition-all duration-200"
                      placeholder="Your name"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm transition-all duration-200"
                      placeholder="your.email@example.com"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm transition-all duration-200"
                    placeholder="How can I help you?"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm transition-all duration-200"
                    placeholder="Tell me about your project..."
                    required
                    disabled={isSubmitting}
                  ></textarea>
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    className={`w-full px-6 py-3.5 text-white font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                      isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : 'Send Message'}
                  </button>
                </div>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl h-full">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h4>
                      <a href="mailto:contact@example.com" className="text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">gimhandeshapriya567@gmail.com</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</h4>
                      <a href="tel:+1234567890" className="text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">+94 76 8582 057</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</h4>
                      <p className="text-gray-900 dark:text-white">Gampaha, Sri Lanka</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Connect with me</h4>
                  <div className="flex items-center gap-4">
                    {[
                      { name: 'LinkedIn', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z', path: 'https://linkedin.com' },
                      { name: 'GitHub', icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.39-1.332-1.76-1.332-1.76-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z', path: 'https://github.com' },
                      { name: 'Twitter', icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z', path: 'https://twitter.com' },
                      { name: 'Dribbble', icon: 'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm9.746 13.034a15.07 15.07 0 01-4.095 1.199c.521-.34.985-.756 1.374-1.23a5.99 5.99 0 01-1.9.625 2.98 2.98 0 00-5.06 2.716c0 .234.027.462.08.68a8.48 8.48 0 01-6.15-3.118 2.98 2.98 0 00.922 3.977 2.96 2.96 0 01-1.35-.373v.038a2.98 2.98 0 002.39 2.922 2.977 2.977 0 01-1.345.052 2.98 2.98 0 002.784 2.07 5.978 5.978 0 01-3.7 1.275 6.044 6.044 0 01-.71-.042 8.43 8.43 0 004.566 1.34c5.48 0 8.475-4.54 8.475-8.474 0-.129-.003-.258-.01-.386a6.05 6.05 0 001.488-1.54z', path: 'https://dribbble.com' }
                    ].map((social) => (
                      <a
                        key={social.name}
                        href={social.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        aria-label={social.name}
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d={social.icon} />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Artwork Popup */}
      <ArtworkPopup 
        isOpen={isArtworkOpen} 
        onClose={() => setIsArtworkOpen(false)}
        artworkUrl={artworkUrl}
      />
    </div>
  );
};

export default Home;