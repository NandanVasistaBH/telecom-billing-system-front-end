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
        if (jwtToken && jwtToken !== "failure") {
          localStorage.setItem("jwtToken", jwtToken);
          alert("Login successful!");
          navigate("/CustomerDashboard");
        } else {
          alert("Wrong password or username");
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
    <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100">
      <div className="row w-100">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <img
            src="../telstraLogo1.jpeg"
            alt="Login"
            className="img-fluid"
            style={{ maxHeight: "100vh", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div
            style={{
              maxWidth: "900px", // Increased width for larger login box
              padding: "40px", // Increased padding for better spacing
              backgroundColor: "#ffffff", // Original color
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderColor: "#0033A0",
              borderWidth: "1px",
              borderStyle: "solid",
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#0033A0", fontSize: "30px" }}>
              Login
            </h2>
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: "20px" }}>
                <label
                  htmlFor="username"
                  style={{ display: "block", marginBottom: "10px", fontWeight: "bold", color: "#0033A0", fontSize: "18px" }}
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
                    padding: "12px", // Increased padding
                    borderRadius: "4px",
                    border: "1px solid #0033A0", // Original border color
                    fontSize: "16px", // Increased font size
                  }}
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label
                  htmlFor="password"
                  style={{ display: "block", marginBottom: "10px", fontWeight: "bold", color: "#0033A0", fontSize: "18px" }}
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
                    padding: "12px", // Increased padding
                    borderRadius: "4px",
                    border: "1px solid #0033A0", // Original border color
                    fontSize: "16px", // Increased font size
                  }}
                />
              </div>
              {errorMessage && (
                <div style={{ marginBottom: "20px" }}>
                  <div style={{ color: "red", fontSize: "16px" }}>{errorMessage}</div>
                </div>
              )}
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "12px", // Increased padding
                  backgroundColor: "#0033A0", // Original button color
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "16px", // Increased font size
                }}
              >
                Login
              </button>
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <a href="/forgot-password" style={{ color: "#0033A0", textDecoration: "none", fontSize: "16px" }}>
                  Forgot Password?
                </a>
                <br />
                <a href="/register" style={{ color: "#0033A0", textDecoration: "none", fontSize: "16px" }}>
                  Don't have an account? Register
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;
