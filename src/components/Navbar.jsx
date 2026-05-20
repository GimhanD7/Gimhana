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
        className={`relative px-4 py-2 flex items-center text-sm font-semibold tracking-tight transition-all duration-300 ${className} ${isActive
          ? 'text-purple-600'
          : 'text-slate-600 hover:text-slate-950'
          }`}
      >
        {children}
        {isActive && (
          <motion.span
            className="absolute left-1/2 -bottom-1 w-1.5 h-1.5 rounded-full bg-purple-600 -translate-x-1/2"
            layoutId="nav-indicator"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
        className={`hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-50 glass rounded-2xl shadow-xl transition-all duration-500 ${isScrolled ? 'px-6 py-2' : 'px-8 py-3'
          }`}
        initial={{ y: -100, x: '-50%' }}
        animate={{ y: 0, x: '-50%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="flex items-center gap-12">
          <motion.div
            className="flex items-center space-x-2"
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
              { to: '/', icon: <HomeIcon className="w-5 h-5" />, text: 'Home' },
              { to: '/about', icon: <AboutIcon className="w-5 h-5" />, text: 'About' },
              { to: '/projects', icon: <ProjectsIcon className="w-5 h-5" />, text: 'Projects' },
              { to: '/contact', icon: <ContactIcon className="w-5 h-5" />, text: 'Contact' }
            ].map((item, index) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="group p-2 rounded-xl hover:bg-white/50 transition-all duration-300"
                index={index}
              >
                <div className="flex items-center gap-2.5">
                  <span className="group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </span>
                  <span className="text-sm tracking-tight">{item.text}</span>
                </div>
              </NavLink>
            ))}
          </motion.div>

          <div className="w-[1px] h-6 bg-slate-200" />

          {/* Theme Toggle Button */}
          <motion.button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/50 border border-white/50 hover:bg-white shadow-sm transition-all duration-300"
            whileHover={{ scale: 1.05, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            <motion.div
              key={theme}
              initial={{ rotate: theme === 'light' ? 0 : 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </motion.div>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Navigation - Bottom Bar */}
      <nav className={`md:hidden fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/90 backdrop-blur-sm shadow-lg'
        : 'bg-white border-t border-gray-200'
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
            className="w-12 h-12 flex items-center justify-center rounded-full -mt-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg"
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
            className="fixed inset-0 bg-white/95 backdrop-blur-sm z-40 pt-20 pb-24 px-6 overflow-y-auto"
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
                    className="flex items-center p-4 rounded-xl text-lg font-medium hover:bg-gray-100"
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
