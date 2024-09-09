// src/CustomerLogin.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const CustomerLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      user: {
        name: username,
        password: password,
        role: "CUSTOMER",
      },
    };

    try {
      const response = await fetch("http://localhost:10000/customer/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const jwtToken = await response.text(); // Assuming the token is returned as a plain text
        if (jwtToken && jwtToken!=="failure") {
          localStorage.setItem("jwtToken", jwtToken);
          alert("Login successful!");
          navigate("/CustomerDashboard");
        }else{
          alert("wrong password or username");
        }
      } else {
      
        setErrorMessage("Invalid username or password.");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      setErrorMessage(
        "An error occurred while logging in. Please try again later."
      );
    }
  };

  return (
    <div
      className="container d-flex align-items-center justify-content-center min-vh-100"
      style={{ backgroundColor: "#FFFDD0" }}
    >
      <div
        className="bg-white shadow rounded p-4 p-md-5"
        style={{
          maxWidth: "500px",
          borderColor: "#0033A0",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        <h2 className="text-center mb-4" style={{ color: "#E4002B" }}>
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label
              htmlFor="username"
              className="form-label"
              style={{ color: "#0033A0" }}
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-control"
              style={{ borderColor: "#0033A0" }}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="password"
              className="form-label"
              style={{ color: "#0033A0" }}
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
              style={{ borderColor: "#0033A0" }}
            />
          </div>
          {errorMessage && (
            <div className="mb-3">
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            </div>
          )}
          <button
            type="submit"
            className="btn"
            style={{ backgroundColor: "#E4002B", color: "white" }}
          >
            Login
          </button>
          <div className="text-center mt-3">
            <a href="/forgot-password" style={{ color: "#E4002B" }}>
              Forgot Password?
            </a>
            <br />
            <a href="/register" style={{ color: "#E4002B" }}>
              Don't have an account? Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerLogin;
