import React from 'react';
import './HowItWorks.css';
//import  telebillpro2 from './image/telebillpro2.jpg';
//import login from './image/login.jpg';
//import recharge from './image/recharge.webp';
import image11 from './images/image11.jpeg';
import image12 from './images/image12.jpeg';
import image13 from './images/image13.jpeg';
const HowItWorks = () => {
  return (
    <div className="how-it-works-container">
      <h1>How it Works</h1>
      <div className="steps">
        <div className="step">
          <img src={image11} alt="Register" />
          <div className="number-box">
          <h2 className="number">1</h2>
            <div className="dotted-line"></div>
          </div>
          <p><strong>Register</strong></p>
          <p>Register to access all our features and services.</p>
        </div>
        <div className="step">
          <img src={image12} alt="Login" />
          <div className="number-box">
          <h2 className="number">2</h2>
            <div className="dotted-line"></div>
          </div>
          <p><strong>Login</strong></p>
          <p>Login with your credentials to manage your account.</p>
        </div>
        <div className="step">
          <img src={image13} alt="Recharge" />
          <div className="number-box">
          <h2 className="number">3</h2>
            <div className="dotted-line"></div>
          </div>
          <p><strong>Recharge</strong></p>
          <p>Choose between prepaid and postpaid plans that suit your needs and Recharge</p>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;