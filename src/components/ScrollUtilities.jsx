import { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';

const ScrollUtilities = () => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  useMotionValueEvent(scrollY, 'change', (value) => setVisible(value > 700));

  return (
    <AnimatePresence>
      {visible && <motion.button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        className="fixed bottom-20 right-5 z-40 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-[#15121d]/90 text-lg text-white shadow-xl backdrop-blur-lg transition-colors hover:border-violet-300/50 hover:text-violet-200 md:bottom-7 md:right-7"
      >↑</motion.button>}
    </AnimatePresence>
  );
};

export default ScrollUtilities;
