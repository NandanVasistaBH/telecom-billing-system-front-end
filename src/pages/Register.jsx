import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; 
import Confetti from "react-confetti";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isUsernameUnique, setIsUsernameUnique] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [supplierId, setSupplierId] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const navigate = useNavigate();

  const handlePlanSelection = (planType) => {
    navigate(`/${planType}`);
  };

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch("/supplier/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setSuppliers(data);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    fetchSuppliers();
  }, []);

  const checkUsernameUnique = async (username) => {
    if (username.trim() === "") return;
    try {
      const response = await fetch(`/customer/is-name-unique?name=${username}`);
      const isUnique = await response.json();
      setIsUsernameUnique(isUnique);
    } catch (error) {
      console.error("Error checking username uniqueness:", error);
      setIsUsernameUnique(false);
    }
  };

  useEffect(() => {
    checkUsernameUnique(username);
  }, [username]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (supplierId == null) {
      alert("Choose a supplier");
      return;
    }
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
      supplier: {
        id: supplierId,
      },
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
        setShowConfetti(true);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
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
      {showConfetti && <Confetti />}
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
          <Nav className="me-auto">
                <NavDropdown title="View Plans" id="basic-nav-dropdown">
                  <NavDropdown.Item
                    onClick={() => handlePlanSelection("prepaid")}
                  >
                    Prepaid
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => handlePlanSelection("postpaid")}
                  >
                    Postpaid
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
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
                  maxWidth: "900px",
                  padding: "40px",
                  backgroundColor: "#ffffff",
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
                        padding: "12px",
                        borderRadius: "4px",
                        border: "1px solid #0033A0",
                        fontSize: "16px",
                      }}
                    />
                    {!isUsernameUnique && (
                      <p style={{ color: "red" }}>
                        Username is already taken. Please choose another.
                      </p>
                    )}
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <label
                      htmlFor="email"
                      style={{
                        display: "block",
                        marginBottom: "10px",
                        fontWeight: "bold",
                        color: "#0033A0",
                        fontSize: "18px",
                      }}
                    >
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      htmlFor="phoneNumber"
                      style={{
                        display: "block",
                        marginBottom: "10px",
                        fontWeight: "bold",
                        color: "#0033A0",
                        fontSize: "18px",
                      }}
                    >
                      Phone Number:
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
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
                  <div style={{ marginBottom: "20px" }}>
                    <label
                      htmlFor="confirmPassword"
                      style={{
                        display: "block",
                        marginBottom: "10px",
                        fontWeight: "bold",
                        color: "#0033A0",
                        fontSize: "18px",
                      }}
                    >
                      Confirm Password:
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
                      htmlFor="supplierId"
                      style={{
                        display: "block",
                        marginBottom: "10px",
                        fontWeight: "bold",
                        color: "#0033A0",
                        fontSize: "18px",
                      }}
                    >
                      Supplier:
                    </label>
                    <select
                      value={supplierId || ""}
                      onChange={(e) => setSupplierId(e.target.value)}
                      required
                      style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "4px",
                        border: "1px solid #0033A0",
                        fontSize: "16px",
                      }}
                    >
                      <option value="">Select Supplier</option>
                      {suppliers.map((supplier) => (
                        <option key={supplier.id} value={supplier.id}>
                          {supplier.name}
                        </option>
                      ))}
                    </select>
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
                      href="/login"
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

export default Register;
