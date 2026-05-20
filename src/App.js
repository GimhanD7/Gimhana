import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
// import CategoryRegistration from './pages/categoryRegistration';
import Navbar from './components/Navbar';
import './App.css';
import Home from './pages/home';
import About from './pages/about';
import Projects from './pages/project';
import ContactMe from './pages/contactme';



function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Router>
          <div className="min-h-screen bg-white transition-colors duration-200 flex flex-col">
            <Navbar />
            <div className="flex-1 overflow-auto">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<ContactMe />} />
              </Routes>
            </div>
          </div>
        </Router>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
