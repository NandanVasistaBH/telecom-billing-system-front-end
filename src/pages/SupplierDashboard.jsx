import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  NavDropdown,
  Card,
  Table,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const SupplierDashboard = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [selectedInvoiceType, setSelectedInvoiceType] = useState("prepaid");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (token) {
      fetch("http://localhost:10000/supplier/details-from-token", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setSuppliers(data);
        })
        .catch((error) => {
          console.error("Error fetching supplier data:", error);
          setError("Failed to fetch supplier data. Please try again later.");
        });
    }
  }, []);

  const handleSupplierSelection = (supplier) => {
    setSelectedSupplier(supplier);
  };

  const handleViewChange = (type) => {
    setSelectedInvoiceType(type);
  };

 

  return (
    <>
      {/* Navbar */}
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
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

      {/* Main Content */}
      <div
        style={{
          backgroundColor: "#FFFDD0",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <Container>
          <header className="text-center mb-4">
            <h1 className="text-primary">Supplier Dashboard</h1>
          </header>

          {selectedSupplier && (
            <>
              {/* Supplier Details */}
              <Row className="mb-4">
                <Col md={12} className="d-flex justify-content-center">
                  <Card
                    className="p-4 shadow"
                    style={{
                      backgroundColor: "white",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                      width: "100%",
                      maxWidth: "800px", // Adjust max width as needed
                    }}
                  >
                    <h2 className="mb-3 text-primary text-center">
                      Supplier Details
                    </h2>
                    <div className="d-flex flex-column align-items-center">
                      <p>
                        <strong>Branch Name:</strong>{" "}
                        {selectedSupplier.branchName}
                      </p>
                      <p>
                        <strong>Branch Location:</strong>{" "}
                        {selectedSupplier.branchLoc}
                      </p>
                      <p>
                        <strong>Branch Manager:</strong>{" "}
                        {selectedSupplier.branchManager}
                      </p>
                      <p>
                        <strong>Branch Email:</strong>{" "}
                        {selectedSupplier.branchEmail}
                      </p>
                      <p>
                        <strong>Branch Phone Number:</strong>{" "}
                        {selectedSupplier.branchPhoneNo}
                      </p>
                      <Button
                        variant="primary"
                        onClick={() => navigate("/profile")}
                        className="mt-3"
                      >
                        Edit Supplier
                      </Button>
                    </div>
                  </Card>
                </Col>
              </Row>
            </>
          )}
        </Container>
      </div>
    </>
  );
};

export default SupplierDashboard;
