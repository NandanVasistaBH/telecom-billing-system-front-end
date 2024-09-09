import React from 'react';
import './ContactUs.css'; // Import the custom CSS for styling
 
const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <h1>Get in Touch</h1>
      <p className="intro-text">Want to get in touch? We'd love to hear from you. Here's how you can reach us...</p>
     
      <div className="contact-options">
        <div className="contact-card">
          <div className="icon">
            {/* Add phone icon here, e.g., using FontAwesome or an image */}
            <span role="img" aria-label="phone">📞</span>
          </div>
          <h2>Talk to Sales</h2>
          <p>Interested in our plans? Just pick up the phone to chat with a member of our support team.</p>
          <a href="tel:+91 6302775670" className="contact-link">+91 7671976676</a>
        </div>
       
        <div className="contact-card">
          <div className="icon">
            {/* Add chat icon here */}
            <span role="img" aria-label="chat">💬</span>
          </div>
          <h2>Contact Customer Support</h2>
          <p>Sometimes you need a little help from your friends. Or a support rep. Don't worry... we're here for you.</p>
          <a href="mailto:telebillprosupport@company.com" className="contact-link">telebillprosupport@company.com</a>
        </div>
      </div>
    </div>
  );
};
 
export default ContactUs;