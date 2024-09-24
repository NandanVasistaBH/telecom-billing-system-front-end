import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import {
  Container,
  Navbar,
  Nav,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const SupplierRegister = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [branchLoc, setBranchLoc] = useState("");
  const [branchManager, setBranchManager] = useState("");
  const [branchEmail, setBranchEmail] = useState("");
  const [branchPhoneNo, setBranchPhoneNo] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const registrationData = {
      user: {
        name: name,
        password: password,
        role: "SUPPLIER",
      },
      branchLoc: branchLoc,
      branchManager: branchManager,
      branchEmail: branchEmail,
      branchPhoneNo: branchPhoneNo,
      name,
    };

    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URI+"/supplier/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      if (response.ok) {
        alert("Registration successful!");
        navigate("/supplierlogin");
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
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img
              src="/telstraLogo1.jpeg"
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
                src="../telstraLogo1.jpeg"
                alt="Register"
                className="img-fluid"
                style={{ maxHeight: "100vh", objectFit: "cover" }}
              />
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <div
                style={{
                  maxWidth: "900px", // Width of the form container
                  padding: "40px",
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
                  Register
                </h2>
                <form onSubmit={handleRegister}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
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
                        Name:
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                    <div className="col-md-6 mb-3">
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
                          padding: "12px",
                          borderRadius: "4px",
                          border: "1px solid #0033A0",
                          fontSize: "16px",
                        }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor="branchLoc"
                        style={{
                          display: "block",
                          marginBottom: "10px",
                          fontWeight: "bold",
                          color: "#0033A0",
                          fontSize: "18px",
                        }}
                      >
                        Branch Location:
                      </label>
                      <input
                        type="text"
                        id="branchLoc"
                        value={branchLoc}
                        onChange={(e) => setBranchLoc(e.target.value)}
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
                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor="branchManager"
                        style={{
                          display: "block",
                          marginBottom: "10px",
                          fontWeight: "bold",
                          color: "#0033A0",
                          fontSize: "18px",
                        }}
                      >
                        Branch Manager:
                      </label>
                      <input
                        type="text"
                        id="branchManager"
                        value={branchManager}
                        onChange={(e) => setBranchManager(e.target.value)}
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
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor="branchEmail"
                        style={{
                          display: "block",
                          marginBottom: "10px",
                          fontWeight: "bold",
                          color: "#0033A0",
                          fontSize: "18px",
                        }}
                      >
                        Branch Email:
                      </label>
                      <input
                        type="email"
                        id="branchEmail"
                        value={branchEmail}
                        onChange={(e) => setBranchEmail(e.target.value)}
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
                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor="branchPhoneNo"
                        style={{
                          display: "block",
                          marginBottom: "10px",
                          fontWeight: "bold",
                          color: "#0033A0",
                          fontSize: "18px",
                        }}
                      >
                        Branch Phone Number:
                      </label>
                      <input
                        type="tel"
                        id="branchPhoneNo"
                        value={branchPhoneNo}
                        onChange={(e) => setBranchPhoneNo(e.target.value)}
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
                  </div>
                  <button
                    type="submit"
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
                    Register
                  </button>
                  <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <a
                      href="/supplierlogin"
                      style={{
                        color: "#0033A0",
                        textDecoration: "none",
                        fontSize: "16px",
                      }}
                    >
                      Already have an account? Login
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

export default SupplierRegister;
