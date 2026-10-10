import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [isMounted, setIsMounted] = useState(false);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  // Initialize theme on mount
  useEffect(() => {
    const designVersion = localStorage.getItem('design-theme-version');
    const savedTheme = designVersion === '2'
      ? (localStorage.getItem('theme') || 'dark')
      : 'dark';
    localStorage.setItem('theme', savedTheme);
    localStorage.setItem('design-theme-version', '2');
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    setIsMounted(true);
  }, []);

  // Prevent UI from showing until theme is loaded
  if (!isMounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      toggleTheme 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
