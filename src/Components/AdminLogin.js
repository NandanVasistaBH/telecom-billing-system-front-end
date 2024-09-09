// AdminLogin.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminLogin.css'; // Import the CSS file


const AdminLogin = () => {
  const [formData, setFormData] = useState({
    user: {
      name: '',
      password: '',
      role: 'ADMIN', // default value as specified
    },
  });
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiEndpoint = 'http://localhost:10000/admin/login';

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.text(); // Parse the JSON response

        // Assume the token is returned in the response body as "token"
        //const jwtToken = JSON.parse(data).token;
        const jwtToken=data;
        if (jwtToken && jwtToken!=="failure") {
          // Store the token in localStorage or sessionStorage
          localStorage.setItem('jwtToken', jwtToken);
          alert('Login successful!');
        navigate('/admindashboard');
      } else {
        alert("wrong username and password  ")
        const errorData = await response.json(); // Fetch error message if available
        console.log(`Failed to login: ${errorData.message || 'Please try again.'}`);
      }
    }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please check the console for more details.');
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.user.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.user.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Role Display (hidden input to maintain role value) */}
        <input
          type="hidden"
          name="role"
          value={formData.user.role}
        />

        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
