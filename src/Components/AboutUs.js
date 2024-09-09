import React from 'react';
import './AboutUs.css';
import { Link, useNavigate } from 'react-router-dom';
import { Earth, BookText, Rss} from 'lucide-react';
const AboutUs = () => {
    const navigate = useNavigate();
    const handleContactClick = () => {
        navigate('/contactus'); // Navigate to ContactUs page on button click
    };
    return (
        <div className="about-container">
           
            

            {/* Our Story Section */}
            <section className="our-story">
                <h2>Our Story</h2>
                <p>
                    Founded in 2024, our company has been committed to delivering excellence in Telecom. 
                    We believe in innovation, collaboration, and building lasting relationships with our customers.
                    Find out how we're committed to responsible business and a sustainable,
                     connected future for everyone.
                </p>
            </section>

            <section className="j-container">
      <h1>Here's why India prefers TeleBillPro</h1>
      <div className="features-container">
        <div className="feature">
          <Earth size={48} color='Blue'/>
          <h3>Fast Internet</h3>
          <p>Experience the internet at lightning speed with no latency.</p>
        </div>
        <div className="feature">
          <BookText size={48} color='Blue'/>
          <h3>Plans for All</h3>
          <p>Explore plans with unlimited voice calls, data, SMS, and a host of benefits.</p>
        </div>
        <div className="feature">
          <Rss size={48}color='Blue' />
          <h3>PAN India Coverage</h3>
          <p>Enjoy HD-quality voice calls and faster data speeds anywhere in India.</p>
        </div>
      </div>
    </section>
                 
                       

            {/* Core Values Section */}
            <section className="core-values">
                <h2>Our Values</h2>
                <div className="values-grid">
                    <div className="value-item">
                        <h3>We are better together</h3>
                        <p>We’re one team and embrace the value each of us bring. Our power lies in working together to deliver for our customers. We’re each accountable for our actions and do what we say we’re going to do.</p>
                    </div>
                    <div className="value-item">
                        <h3>Consumer Advice</h3>
                        <p>Get practical advice and the support you need to help you stay safely connected to your TeleBillPro services at all times.</p>
                    </div>
                    <div className="value-item">
                        <h3>Cheif Customer Advocate</h3>
                        <p>Providing an independent voice, championing customers in vulnerable circumstances, and holding TeleBillPro to account.</p>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="contact-section">
                <h2>Get In Touch</h2>
                <p>Want to know more? Feel free to reach out!</p>
                <button className="button" onClick={handleContactClick}>Contact Us</button> {/* Button to navigate to ContactUs page */}
            </section>
        </div>
    );
};

export default AboutUs;