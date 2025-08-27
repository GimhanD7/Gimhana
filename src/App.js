import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
// import CategoryRegistration from './pages/categoryRegistration';
import ThemeToggle from './components/ThemeToggle';
import './App.css';
import InstrallationRegistration from './pages/InstrallationRegistration';


function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200 flex">
          {/* <Sidebar /> */}
          <div className="flex-1 overflow-auto">
            <Routes>
              {/* <Route path="/members" element={<MemberDatabase />} /> */}
              {/* <Route path="/category" element={<CategoryRegistration />} /> */}
              {/* Add more routes as needed */}
              {/* <Route path="/attendance" element={<AttendancePage />} />
              <Route path="/scanqr" element={<ScanQRPage />} />
              <Route path="/events" element={<Events />} /> */}
              <Route path="/" element={<InstrallationRegistration />} />


            </Routes>
          </div>
          <ThemeToggle />
        </div>
      </Router>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
