import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section */}
        <div className="footer-section">
          <h3>🏨 HotelHub</h3>
          <p>Experience luxury and comfort with us!</p>
          <p>© {new Date().getFullYear()} HotelHub. All rights reserved.</p>
        </div>

        {/* Middle Section */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/rooms">Rooms</a>
            </li>
            <li>
              <a href="/bookings">Bookings</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/profile">Profile</a>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>📍 123 Street, Mumbai, India</p>
          <p>📞 +91-98765-43210</p>
          <p>✉️ support@hotelhub.com</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>🌐 Follow Us:</p>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          Facebook
        </a>
        |
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
        |
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
      </div>
    </footer>
  );
};

export default Footer;
