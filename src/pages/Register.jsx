import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const registrationData = {
      user: {
        name: username,
        password: password,
        role: "CUSTOMER",
      },
      custEmail: email,
      custPhoneNo: phoneNumber,
      name: username,
      supplier:{
        id:1
      }
    };

    try {
      const response = await fetch("/customer/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      if (response.ok) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        const error = await response.json();
        alert(`Registration failed: ${error.message}`);
      }
    } catch (error) {
      console.error("Error occurred during registration:", error);
      alert("An error occurred during registration. Please try again later.");
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
          Register
        </h2>
        <form onSubmit={handleRegister}>
          
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
              htmlFor="email"
              className="form-label"
              style={{ color: "#0033A0" }}
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
              style={{ borderColor: "#0033A0" }}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="phoneNumber"
              className="form-label"
              style={{ color: "#0033A0" }}
            >
              Phone Number:
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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
          <div className="mb-3">
            <label
              htmlFor="confirmPassword"
              className="form-label"
              style={{ color: "#0033A0" }}
            >
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="form-control"
              style={{ borderColor: "#0033A0" }}
            />
          </div>
          <button
            type="submit"
            className="btn"
            style={{ backgroundColor: "#E4002B", color: "white" }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;