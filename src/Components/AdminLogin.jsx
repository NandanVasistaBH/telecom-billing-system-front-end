import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
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
      if (response.ok) {
        const jwtToken = await response.text(); // Parse the response
        if (jwtToken && jwtToken !== "failure") {
          // Store the token in localStorage or sessionStorage
          localStorage.setItem("jwtToken", jwtToken);
          alert("Login successful!");
          navigate("/admindashboard");
        } else {
          alert("Wrong username or password");
        }
      } else {
        const errorData = await response.json(); // Fetch error message if available
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
      style={{
        background:
          "radial-gradient(circle, rgba(230,245,255,1) 0%, rgba(255,255,255,1) 100%)",
        minHeight: "100vh",
        padding: "30px",
      }}
    >
      <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100">
        <div className="row w-100">
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <img
              src="../telstraLogo1.jpeg"
              alt="Admin Login"
              className="img-fluid"
              style={{ maxHeight: "100vh", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <div
              style={{
                maxWidth: "900px",
                padding: "40px",
                backgroundColor: "#cce0ff",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderColor: "#0033A0",
                borderWidth: "1px",
                borderStyle: "solid",
              }}
            >
              <h2
                style={{
                  textAlign: "center",
                  marginBottom: "30px",
                  color: "#0033A0",
                  fontSize: "30px",
                }}
              >
                Admin Login
              </h2>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "20px" }}>
                  <label
                    htmlFor="name"
                    style={{
                      display: "block",
                      marginBottom: "10px",
                      fontWeight: "bold",
                      color: "#0033A0",
                      fontSize: "18px",
                    }}
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
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "4px",
                      border: "1px solid #0033A0",
                      fontSize: "16px",
                    }}
                  />
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <label
                    htmlFor="password"
                    style={{
                      display: "block",
                      marginBottom: "10px",
                      fontWeight: "bold",
                      color: "#0033A0",
                      fontSize: "18px",
                    }}
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
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "4px",
                      border: "1px solid #0033A0",
                      fontSize: "16px",
                    }}
                  />
                </div>
                {errorMessage && (
                  <div style={{ marginBottom: "20px" }}>
                    <div style={{ color: "red", fontSize: "16px" }}>
                      {errorMessage}
                    </div>
                  </div>
                )}
                <button
                  type="submit"
                  data-testid="admin-button"
                  style={{
                    width: "100%",
                    padding: "12px",
                    backgroundColor: "#0033A0",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                >
                  Login
                </button>
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <a
                    href="/forgot-password"
                    style={{
                      color: "#0033A0",
                      textDecoration: "none",
                      fontSize: "16px",
                    }}
                  >
                    Forgot Password?
                  </a>
                  <br />
                  <a
                    href="/register"
                    style={{
                      color: "#0033A0",
                      textDecoration: "none",
                      fontSize: "16px",
                    }}
                  >
                    Don't have an account? Register
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
