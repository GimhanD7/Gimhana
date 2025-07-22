import React from 'react';
import './home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="hero-section">
        <h1>Welcome to Our Website</h1>
        <p>Discover amazing features and services</p>
        <button className="cta-button">Get Started</button>
      </header>

      <section className="features-section">
        <h2>Our Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Feature 1</h3>
            <p>Description of your first amazing feature</p>
          </div>
          <div className="feature-card">
            <h3>Feature 2</h3>
            <p>Description of your second amazing feature</p>
          </div>
          <div className="feature-card">
            <h3>Feature 3</h3>
            <p>Description of your third amazing feature</p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>About Us</h2>
        <p>
          We are dedicated to providing excellent services and creating 
          meaningful experiences for our users. Our team is passionate 
          about innovation and quality.
        </p>
      </section>

      <footer className="footer">
        <p>&copy; 2025 Your Company Name. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
