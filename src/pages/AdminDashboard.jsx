import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Navbar,
  Nav,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdminSubscriptions from "./AdminSubscriptions";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const AdminDashboard = () => {
  const navigate = useNavigate();
  return (
     <>
      {/* Navbar */}
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand
            onClick={() => navigate("/")}
            className="d-flex align-items-center"
          >
            <img
              src="/telstraLogo1.jpeg"
              alt="Telstra Logo"
              style={{ width: "50px", height: "auto" }}
            />
            <span className="ms-2" style={{ color: "#FFFDD0" }}>
              TeleBillPro
            </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/login" style={{ color: "#FFFDD0" }}>
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    <div
      style={{
        background:
          "radial-gradient(circle, rgba(204,229,255,1) 0%, rgba(255,255,255,1) 100%)",
        minHeight: "100vh",
        padding: "30px",
      }}
    >
      <div className="container-fluid d-flex flex-column min-vh-100 p-0">
        <h2 className="text-center mb-4">Admin Dashboard</h2>
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <div
            className="card p-4 w-100"
            style={{
              maxWidth: "1200px",
              background:
                "linear-gradient(to right, rgba(204,229,255,1) 0%, rgba(204,229,255,0.8) 70%, rgba(255,255,255,0.5) 100%)",
            }} // Beige color
          >
            <h3 className="text-primary mb-3">Manage Subscriptions</h3>
            <AdminSubscriptions />
          </div>
        </div>
      </div>
      </div>
      </>
  );
};

export default AdminDashboard;
