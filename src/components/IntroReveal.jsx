import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const IntroReveal = () => {
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), reduceMotion ? 80 : 760);
    return () => window.clearTimeout(timeout);
  }, [reduceMotion]);

  return <AnimatePresence>
    {visible && <motion.div
      aria-hidden="true"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: reduceMotion ? 0 : .45, ease: 'easeOut' } }}
      className="fixed inset-0 z-[100] grid place-items-center bg-[#08070d]"
    >
      <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : .42, ease: 'easeOut' }} className="font-heading text-xl font-semibold tracking-[.12em] text-white sm:text-2xl">
        GIMHANA <span className="text-violet-300">DESHAPRIYA</span>
      </motion.p>
      <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: reduceMotion ? 0 : .5, delay: .1 }} className="absolute bottom-[calc(50%-2.5rem)] h-px w-28 origin-left bg-gradient-to-r from-violet-300 to-transparent" />
    </motion.div>}
  </AnimatePresence>;
};

export default IntroReveal;
