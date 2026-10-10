import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const Background = () => {
  const reduceMotion = useReducedMotion();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      className={`fixed inset-0 -z-10 pointer-events-none overflow-hidden transition-colors duration-500 ${isDark ? 'bg-[#050816]' : 'bg-[#f8f7ff]'}`}
      aria-hidden="true"
    >
      <motion.div
        className="absolute -left-[24vw] -top-[35vw] h-[78vw] w-[78vw] rounded-full opacity-75"
        style={{ background: `radial-gradient(circle, ${isDark ? 'rgba(192,132,252,.24)' : 'rgba(168,85,247,.16)'}, transparent 66%)` }}
        animate={reduceMotion ? undefined : { x: [0, 44, 0], y: [0, 28, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-[25vw] top-0 h-[76vw] w-[76vw] rounded-full opacity-75"
        style={{ background: `radial-gradient(circle, ${isDark ? 'rgba(217,70,239,.24)' : 'rgba(217,70,239,.11)'}, transparent 66%)` }}
        animate={reduceMotion ? undefined : { x: [0, -38, 0], y: [0, 58, 0], scale: [1.04, 0.97, 1.04] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage: `radial-gradient(circle at 72% 88%, ${isDark ? 'rgba(147,51,234,.18)' : 'rgba(168,85,247,.10)'}, transparent 34%), linear-gradient(${isDark ? 'rgba(148,163,184,.035)' : 'rgba(99,102,241,.06)'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? 'rgba(148,163,184,.035)' : 'rgba(99,102,241,.06)'} 1px, transparent 1px)`,
          backgroundSize: 'auto, 64px 64px, 64px 64px',
        }}
      />
    </div>
  );
};

export default Background;
