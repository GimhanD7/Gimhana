import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Toast = ({ message, type = 'info', isVisible, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getToastStyles = () => {
    const baseStyles = "fixed top-6 right-4 sm:right-6 z-[100] max-w-sm w-[calc(100%-2rem)] rounded-2xl bg-[#0b1224]/95 shadow-2xl shadow-black/50 backdrop-blur-xl border border-white/10 overflow-hidden";

    switch (type) {
      case 'success':
        return `${baseStyles} border-l-4 border-green-500`;
      case 'error':
        return `${baseStyles} border-l-4 border-red-500`;
      case 'warning':
        return `${baseStyles} border-l-4 border-yellow-500`;
      default:
        return `${baseStyles} border-l-4 border-purple-600`;
    }
  };

  const getIconStyles = () => {
    switch (type) {
      case 'success':
        return 'text-emerald-300 bg-emerald-400/10';
      case 'error':
        return 'text-red-300 bg-red-400/10';
      case 'warning':
        return 'text-amber-300 bg-amber-400/10';
      default:
        return 'text-violet-300 bg-violet-400/10';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 28, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 28, scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 360, damping: 28 }}
      className={getToastStyles()}
    >
      <div className="p-5">
        <div className="flex items-center">
          <div className={`flex-shrink-0 p-2 rounded-xl ${getIconStyles()}`}>
            {getIcon()}
          </div>
          <div className="ml-4 flex-1">
            <p className="text-sm font-semibold text-slate-100 leading-relaxed">
              {message}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      {duration > 0 && (
        <div className="h-1 w-full bg-white/5 overflow-hidden">
          <div
            className={`h-full transition-all ease-linear ${type === 'success' ? 'bg-green-500' :
              type === 'error' ? 'bg-red-500' :
                type === 'warning' ? 'bg-yellow-500' : 'bg-purple-600'
              }`}
            style={{
              width: '100%',
              animation: `toast-progress ${duration}ms linear forwards`
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes toast-progress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </motion.div>
  );
};

export default Toast;
