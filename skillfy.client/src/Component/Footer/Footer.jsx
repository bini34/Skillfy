import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div>
          <h4>Company</h4>
          <ul>
            <li>About</li>
            <li>Careers</li>
            <li>Press</li>
            <li>Blog</li>
            <li>Affiliates</li>
          </ul>
        </div>
        <div>
          <h4>Community</h4>
          <ul>
            <li>Go Premium</li>
            <li>Refer a Friend</li>
            <li>Support</li>
            <li>Guidelines</li>
          </ul>
        </div>
        <div>
          <h4>Teaching</h4>
          <ul>
            <li>Become an Instructor</li>
            <li>Teaching Center</li>
            <li>Teaching Guide</li>
            <li>Handbook</li>
          </ul>
        </div>
        <div>
          <h4>Support</h4>
          <ul>
            <li>Help</li>
            <li>System Requirements</li>
            <li>Accessibility</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
