import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-us-container">
      <div className="contact-us-box">
        <header className="contact-us-header">
          <h2>📞 Contact Us</h2>
          <h3>🏨 HotelHub</h3>
          <p>Experience luxury and comfort with us!</p>
        </header>

        <section className="contact-details">
          <div className="contact-address">
            <h4>📍 Address</h4>
            <p>123 Street, Mumbai, India</p>
          </div>

          <div className="contact-phone">
            <h4>📞 Phone Numbers</h4>
            <p>+91-98765-43210</p>
            <p>+91-98765-43211</p>
            <p>+91-98765-43212</p>
          </div>

          <div className="contact-email">
            <h4>✉️ Emails</h4>
            <p>support@hotelhub.com</p>
            <p>info@hotelhub.com</p>
            <p>bookings@hotelhub.com</p>
          </div>
        </section>

        <footer className="contact-footer">
          <p>© 2025 HotelHub. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Contact;
