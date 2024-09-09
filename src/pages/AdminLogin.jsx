// AdminLogin.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    user: {
      name: "",
      password: "",
      role: "ADMIN", // default value as specified
    },
  });
  const [errorMessage, setErrorMessage] = useState("");
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
    const apiEndpoint = "http://localhost:10000/admin/login";

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("response" +response)
      if (response.ok) {
        const jwtToken = await response.text(); // Parse the response
        console.log(jwtToken)
        if (jwtToken && jwtToken!=="failure") {
          // Store the token in localStorage or sessionStorage
          localStorage.setItem("jwtToken", jwtToken);
          alert("Login successful!");
          navigate("/admindashboard");
        }else{
          alert("wrong username or password")
        }
      } else {
        const errorData = await response.json(); // Fetch error message if available
        alert("wrong username and password")
        setErrorMessage(errorData.message || "Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage(
        "An error occurred. Please check the console for more details."
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
          Admin Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="name"
              className="form-label"
              style={{ color: "#0033A0" }}
            >
              Username:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.user.name}
              onChange={handleChange}
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
              name="password"
              value={formData.user.password}
              onChange={handleChange}
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

export default AdminLogin;
