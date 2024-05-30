import React from 'react';
import './hero.css';

const Hero = () => {
  return (
    <section className="hero-container">
      <div className="hero-text">
        <h1>Distant learning for further expansion</h1>
        <p>Choose from over 100,000 online video courses with new additions published every month.</p>
        <button className="hero-button">Get Started Now for Free</button>
      </div>
      <img className="hero-image" src="/path/to/your/image.jpg" alt="Hero" />
    </section>
  );
};

export default Hero;
