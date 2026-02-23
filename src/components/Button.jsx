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
  const handleClick = (e) => {
    // Ripple effect
    const button = e.currentTarget;
    const circle = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - rect.left - radius}px`;
    circle.style.top = `${e.clientY - rect.top - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);

    // Call the original onClick handler
    if (onClick) {
      onClick(e);
    }
  };

  const baseClasses = 'relative overflow-hidden px-10 py-4 font-bold rounded-2xl transition-all duration-500 flex items-center justify-center group tracking-tight';

  let variantClasses = '';
  if (primary) {
    variantClasses = 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-xl shadow-purple-500/20 hover:shadow-purple-500/40';
  } else if (secondary) {
    variantClasses = 'glass hover:bg-white text-slate-900 shadow-sm hover:shadow-md';
  }

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variantClasses} ${className}`}
      onClick={handleClick}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;
