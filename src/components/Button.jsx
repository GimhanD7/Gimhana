import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const Button = forwardRef(({
  children,
  primary = false,
  secondary = false,
  className = '',
  onClick,
  ...props
}, ref) => {
  const baseClasses = 'relative isolate overflow-hidden px-8 py-3.5 font-bold rounded-xl transition-all duration-300 flex items-center justify-center group tracking-tight border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]';

  let variantClasses = '';
  if (primary) {
    variantClasses = 'border-purple-300/30 bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 hover:from-purple-500 hover:via-violet-500 hover:to-fuchsia-500 text-white shadow-xl shadow-purple-950/40 hover:shadow-[0_0_32px_rgba(168,85,247,.38)]';
  } else if (secondary) {
    variantClasses = 'border-white/10 bg-white/[0.05] hover:bg-white/[0.10] text-slate-100 shadow-sm hover:shadow-md';
  }

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 420, damping: 24 }}
      className={`${baseClasses} ${variantClasses} ${className}`}
      onClick={onClick}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      <span className="absolute inset-0 -z-10 translate-x-[-120%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;
