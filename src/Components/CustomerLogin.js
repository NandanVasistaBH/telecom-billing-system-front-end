import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CustomerLogin.css';
import LoginChecker from './LoginChecker';
import CustomerDashboard from './CustomerDashboard';
// import DashboardCustomer from './DashboardCustomer';
const CustomerLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleLogin = async (e) => {
    e.preventDefault();

    // Construct the payload to send to the API
    const loginData = {
      user: {
        name: username,
        password: password,
        role: 'CUSTOMER'
      }
    };

    try {
      console.log(loginData)
      const response = await fetch(process.env.REACT_APP_BACKEND_URI+'/customer/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });
      console.log(response);
      
      if (response.ok) {
        const data = await response.text(); // Parse the JSON response

        // Assume the token is returned in the response body as "token"
        //const jwtToken = JSON.parse(data).token;
        const jwtToken=data;
        if (jwtToken) {
          // Store the token in localStorage or sessionStorage
          localStorage.setItem('jwtToken', jwtToken);
          alert('Login successful!');
          // Redirect to the desired page after successful login
          navigate("/CustomerDashboard"); // Replace '/dashboard' with the route you want to navigate to
        }
      } else {
        // Handle error response
        setErrorMessage('Invalid username or password.');
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
      setErrorMessage('An error occurred while logging in. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <h2>Customer Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="login-button">Login</button>
      </form>
      <div className="login-options">
        <Link to="/forgot-password">Forgot Password?</Link>
        <Link to="/register">Don't have an account? Register</Link>
      </div>
    </div>
  );
};

export default CustomerLogin;
