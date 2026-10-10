import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const Background = () => {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="fixed inset-0 -z-10 bg-[#050816] pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        className="absolute -left-[24vw] -top-[35vw] h-[78vw] w-[78vw] rounded-full opacity-75"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,.18), transparent 66%)' }}
        animate={reduceMotion ? undefined : { x: [0, 44, 0], y: [0, 28, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-[25vw] top-0 h-[76vw] w-[76vw] rounded-full opacity-75"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,.21), transparent 66%)' }}
        animate={reduceMotion ? undefined : { x: [0, -38, 0], y: [0, 58, 0], scale: [1.04, 0.97, 1.04] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage: `
            radial-gradient(circle at 72% 88%, rgba(79, 70, 229, 0.14), transparent 34%),
            linear-gradient(rgba(148, 163, 184, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: 'auto, 64px 64px, 64px 64px',
        }}
      />
    </div>
  );
};

export default Background;
