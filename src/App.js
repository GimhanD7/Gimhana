import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
// import CategoryRegistration from './pages/categoryRegistration';
import ThemeToggle from './components/ThemeToggle';
import Navbar from './components/Navbar';
import './App.css';
import Home from './pages/home';


function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200 flex flex-col">
          <Navbar />
          <div className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </div>
      </Router>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
