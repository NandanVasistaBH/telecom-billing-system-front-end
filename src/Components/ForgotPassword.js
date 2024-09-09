import React, { useState } from 'react';
import './ForgotPassword.css';
 
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
 
  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Handle forgot password logic here
    console.log('Forgot Password for:', email);
  };
 
  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="reset-button">Reset Password</button>
      </form>
    </div>
  );
};
 
export default ForgotPassword;