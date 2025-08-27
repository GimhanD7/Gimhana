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
  
  const baseClasses = 'relative overflow-hidden px-8 py-4 font-medium rounded-2xl transition-all duration-500 flex items-center group';
  
  let variantClasses = '';
  if (primary) {
    variantClasses = 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl hover:shadow-indigo-500/30';
  } else if (secondary) {
    variantClasses = 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-white/90 dark:hover:bg-gray-800/90 shadow-lg hover:shadow-xl';
  }
  
  return (
    <motion.button
      ref={ref}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variantClasses} ${className}`}
      onClick={handleClick}
      {...props}
    >
      <span className="relative z-10 flex items-center">
        {children}
      </span>
      <span 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
        style={{
          transform: 'translateX(-100%)',
          animation: 'shimmer 3s infinite',
          backgroundSize: '200% 100%'
        }}
      />
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;
