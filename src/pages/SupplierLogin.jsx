import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const SupplierLogin = () => {
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
        role: "SUPPLIER",
      },
    };

    try {
      const response = await fetch("http://localhost:10000/supplier/login", {
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
          navigate("/SupplierDashboard");
        }else{
          alert("wrong username or password")
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
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#FFFDD0", // Light beige background
      }}
    >
      <div
        style={{
          maxWidth: "400px",
          padding: "20px",
          backgroundColor: "#f5ede2", // Beige color
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "black" }}>
          Supplier Login
        </h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="username"
              style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#0033A0" }}
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #cbd5e0",
                borderColor: "#0033A0", // Blue color
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="password"
              style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#0033A0" }}
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #cbd5e0",
                borderColor: "#0033A0", // Blue color
              }}
            />
          </div>
          {errorMessage && (
            <div style={{ marginBottom: "15px" }}>
              <div style={{ color: "red" }}>{errorMessage}</div>
            </div>
          )}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "rgba(13,84,255,255)",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
          <div style={{ textAlign: "center", marginTop: "15px" }}>
            <a href="/forgot-password" style={{ color: "black", textDecoration: "none" }}>
              Forgot Password?
            </a>
            <br />
            <a href="/supplierregister" style={{ color: "black", textDecoration: "none" }}>
              Don't have an account? Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupplierLogin;