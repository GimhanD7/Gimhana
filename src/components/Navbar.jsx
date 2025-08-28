import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

// Icons
const HomeIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const AboutIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ProjectsIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

const ContactIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const MenuIcon = ({ open }) => (
  open ? (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ) : (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
  )
);

const NavLink = ({ to, children, className = '', isMobile = false, index = 0 }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    }),
    hover: {
      scale: 1.05,
      transition: { type: 'spring', stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };

  const indicatorVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25
      }
    },
    hover: {
      scaleX: 1.2,
      originX: 0.5,
      transition: { type: 'spring', stiffness: 400, damping: 10 }
    }
  };

  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      variants={itemVariants}
      className="relative"
    >
      <Link 
        to={to}
        className={`relative px-3 py-2 flex items-center text-sm font-medium transition-colors duration-200 ${className} ${
          isActive 
            ? 'text-indigo-600 dark:text-indigo-400' 
            : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
        }`}
      >
        {children}
        {isActive && (
          <motion.span 
            className="absolute left-0 bottom-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400"
            variants={indicatorVariants}
            initial="hidden"
            animate={isActive ? 'visible' : 'hidden'}
          />
        )}
      </Link>
    </motion.div>
  );
};

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Navigation - Centered */}
      <motion.nav 
        className="hidden md:block fixed top-0 left-0 right-0 z-50     backdrop-blur-sm  "
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="w-10"></div> {/* Spacer to balance the theme toggle */}
            <motion.div 
              className="flex items-center space-x-8"
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2
                  }
                }
              }}
            >
              {[
                { to: '/', icon: <HomeIcon className="w-6 h-6" />, text: 'Home' },
                { to: '/about', icon: <AboutIcon className="w-6 h-6" />, text: 'About' },
                { to: '/projects', icon: <ProjectsIcon className="w-6 h-6" />, text: 'Projects' },
                { to: '/contact', icon: <ContactIcon className="w-6 h-6" />, text: 'Contact' }
              ].map((item, index) => (
                <NavLink 
                  key={item.to}
                  to={item.to} 
                  className="flex flex-col items-center group"
                  index={index}
                >
                  <motion.div
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-full"
                  >
                    {item.icon}
                  </motion.div>
                  <motion.span 
                    className="text-xs mt-1"
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {item.text}
                  </motion.span>
                </NavLink>
              ))}
            </motion.div>
            
            {/* Theme Toggle Button */}
            <motion.button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <motion.div
                key={theme}
                initial={{ rotate: theme === 'light' ? 0 : 180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: theme === 'light' ? 180 : 0, opacity: 0 }}
                transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
              >
                {theme === 'light' ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation - Bottom Bar */}
      <nav className={`md:hidden fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg' 
          : 'bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700'
      }`}>
        <div className="flex justify-around items-center h-16 px-2">
          <NavLink to="/" className="flex flex-col items-center flex-1">
            <HomeIcon className="w-5 h-5" />
            <span className="text-xs mt-0.5">Home</span>
          </NavLink>
          <NavLink to="/about" className="flex flex-col items-center flex-1">
            <AboutIcon className="w-5 h-5" />
            <span className="text-xs mt-0.5">About</span>
          </NavLink>
          {/* Theme Toggle for Mobile - Centered */}
          <motion.button
            onClick={toggleTheme}
            className="w-12 h-12 flex items-center justify-center rounded-full -mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            <motion.div
              key={`mobile-${theme}`}
              initial={{ rotate: theme === 'light' ? 0 : 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {theme === 'light' ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </motion.div>
          </motion.button>
          <NavLink to="/projects" className="flex flex-col items-center flex-1">
            <ProjectsIcon className="w-5 h-5" />
            <span className="text-xs mt-0.5">Projects</span>
          </NavLink>
          <NavLink to="/contact" className="flex flex-col items-center flex-1">
            <ContactIcon className="w-5 h-5" />
            <span className="text-xs mt-0.5">Contact</span>
          </NavLink>
        </div>
      </nav>

      {/* Mobile menu - Only shown when menu button is clicked */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '100%' }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { 
                type: 'spring',
                damping: 25,
                stiffness: 300
              }
            }}
            exit={{ 
              opacity: 0, 
              y: '100%',
              transition: { 
                type: 'spring',
                damping: 30,
                stiffness: 300
              } 
            }}
            className="fixed inset-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-40 pt-20 pb-24 px-6 overflow-y-auto"
          >
            <motion.div 
              className="flex flex-col space-y-4 mt-8"
              initial="closed"
              animate="open"
              variants={{
                open: {
                  transition: { staggerChildren: 0.07, delayChildren: 0.2 }
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 }
                }
              }}
            >
              {[
                { to: '/', icon: <HomeIcon className="w-6 h-6" />, text: 'Home' },
                { to: '/about', icon: <AboutIcon className="w-6 h-6" />, text: 'About' },
                { to: '/projects', icon: <ProjectsIcon className="w-6 h-6" />, text: 'Projects' },
                { to: '/contact', icon: <ContactIcon className="w-6 h-6" />, text: 'Contact' }
              ].map((item, index) => (
                <motion.div
                  key={item.to}
                  custom={index}
                  variants={{
                    open: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        y: { stiffness: 1000, velocity: -100 }
                      }
                    },
                    closed: {
                      y: 50,
                      opacity: 0,
                      transition: {
                        y: { stiffness: 1000 }
                      }
                    }
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <NavLink 
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center p-4 rounded-xl text-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800/50"
                    isMobile
                    index={index}
                  >
                    <motion.span className="mr-4" whileHover={{ scale: 1.1 }}>
                      {item.icon}
                    </motion.span>
                    <span>{item.text}</span>
                  </NavLink>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
