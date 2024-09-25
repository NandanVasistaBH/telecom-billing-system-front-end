import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import {
  Button,
  Container,
  Navbar,
  Nav,
} from "react-bootstrap";
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
      const response = await fetch(process.env.REACT_APP_BACKEND_URI+"/supplier/login", {
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
          localStorage.setItem("user","supplier");
          alert("Login successful!");
          navigate("/SupplierDashboard");
        } else {
          alert("Wrong username or password");
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
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img
              src="https://invoice-telecom-billing.s3.amazonaws.com/telstralogo1.jpeg"
              alt="Telstra Logo"
              style={{ width: "50px", height: "auto" }}
            />
            <span className="ms-2" style={{ color: "#FFFDD0" }} onClick={() => navigate("/")}>
              TeleBillPro
            </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" style={{ alignItems: 'center', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
              <button
                onClick={() => navigate(-1)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#FFFDD0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <span style={{ marginTop: '5px' }}>←</span>
              </button>
              <button
                onClick={() => navigate(1)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#FFFDD0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <span style={{ marginTop: '5px' }}>→</span>
              </button>
            </div>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
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
                src="https://invoice-telecom-billing.s3.amazonaws.com/telstralogo1.jpeg"
                alt="Login"
                className="img-fluid"
                style={{ maxHeight: "100vh", objectFit: "cover" }}
              />
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <div
                style={{
                  maxWidth: "900px", // Increased width
                  padding: "40px", // Increased padding for better spacing
                  backgroundColor: "#99c2ff", // Light blue color
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
                  Supplier Login
                </h2>
                <form onSubmit={handleLogin}>
                  <div style={{ marginBottom: "20px" }}>
                    <label
                      htmlFor="username"
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
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      style={{
                        width: "100%",
                        padding: "12px", // Increased padding
                        borderRadius: "4px",
                        border: "1px solid #0033A0", // Blue color
                        fontSize: "16px", // Increased font size
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={{
                        width: "100%",
                        padding: "12px", // Increased padding
                        borderRadius: "4px",
                        border: "1px solid #0033A0", // Blue color
                        fontSize: "16px", // Increased font size
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
                    style={{
                      width: "100%",
                      padding: "12px", // Increased padding
                      backgroundColor: "#0033A0", // Blue color
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
                      href="/supplierregister"
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
    </>
  );
};

export default SupplierLogin;
