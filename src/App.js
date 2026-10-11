import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from 'framer-motion';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
// import CategoryRegistration from './pages/categoryRegistration';
import Navbar from './components/Navbar';
import MotionSystem from './components/MotionSystem';
import ScrollUtilities from './components/ScrollUtilities';
import IntroReveal from './components/IntroReveal';
import './App.css';
import Home from './pages/home';
import About from './pages/about';
import Projects from './pages/project';
import ContactMe from './pages/contactme';
import Admin from './pages/admin';
import ProjectDetail from './pages/ProjectDetail';

const pageVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

function AnimatedRoutes() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial={reduceMotion ? false : 'hidden'}
        animate="visible"
        exit={reduceMotion ? undefined : 'exit'}
        transition={{ duration: reduceMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-full"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/contact" element={<ContactMe />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function AppSurface() {
  const { theme } = useTheme();

  return (
    <MotionConfig reducedMotion="user">
      <Router>
        <MotionSystem />
        <div className={`min-h-screen transition-colors duration-500 flex flex-col ${theme === 'dark' ? 'bg-[#050816] text-slate-100' : 'bg-[#f8f7ff] text-slate-900'}`}>
          <Navbar />
          <ScrollUtilities />
          <IntroReveal />
          <div className="flex-1">
            <AnimatedRoutes />
          </div>
        </div>
      </Router>
    </MotionConfig>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AppSurface />
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
