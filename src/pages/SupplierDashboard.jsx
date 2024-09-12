import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SupplierDashboard = () => {
  const [supplierId, setSupplierId] = useState(''); // You can remove this if not using it
  const [supplierDetails, setSupplierDetails] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    console.log(token)
    const fetchSupplierDetails = async () => {
      if (token) {
        try {
          const response = await fetch(`http://localhost:10000/supplier/details-from-token`, {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
              'Content-Type': 'application/json'
            }
          });
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          setSupplierDetails(data);
        } catch (err) {
          setError(err.message);
        }
      }
    };

    fetchSupplierDetails();
  }, []);

  const fetchCustomers = async () => {
    if (!supplierDetails) return;
    try {
      const response = await fetch(`http://localhost:10000/supplier/list-of-customers?supplierId=${supplierDetails.id}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setCustomers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFetchCustomers = () => {
    fetchCustomers();
  };

  return (
    <>
      {/* Navbar */}
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand
            onClick={() => navigate('/')}
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

      {/* Main Content */}
      <div
        style={{
          background: "rgb(255,255,255)",
          background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(92,118,255,1) 100%)", // You can remove this if you want only the gradient
          minHeight: "100vh",
          padding: "20px",
          // Gradient applied here
        }}
      >
        <Container>
          <header className="text-center mb-4">
            <h1 className="text-primary">Supplier Dashboard</h1>
          </header>

          {/* Supplier Details */}
          {supplierDetails && (
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
                    <p style={{ color: "#333" }}>
                      <strong>Branch Name:</strong> {supplierDetails.name}
                    </p>
                    <p style={{ color: "#333" }}>
                      <strong>Branch Manager:</strong> {supplierDetails.branchManager}
                    </p>
                    <p style={{ color: "#333" }}>
                      <strong>Branch Location:</strong> {supplierDetails.branchLoc}
                    </p>
                    <p style={{ color: "#333" }}>
                      <strong>Email:</strong> {supplierDetails.branchEmail}
                    </p>
                    <p style={{ color: "#333" }}>
                      <strong>Phone Number:</strong> {supplierDetails.branchPhoneNo}
                    </p>
                    {/* You can add more details here */}
                  </div>
                </Card>
              </Col>
            </Row>
          )}

          {/* Fetch Customers Button */}
          <Row className="mb-4">
            <Col md={12} className="d-flex justify-content-center">
              <Button
                onClick={handleFetchCustomers}
                variant="primary"
                style={{ borderRadius: "25px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
              >
                Get Customers
              </Button>
            </Col>
          </Row>

          {/* Customer List */}
          {error && <p className="text-danger">{error}</p>}
          {customers.length > 0 && (
            <Row>
              <Col md={12}>
                <div
                  className="bg-white p-4 rounded shadow"
                  style={{
                    background: "linear-gradient(135deg, #e0f7fa, #b2dfdb)",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  <h2 className="text-primary mb-3">Customer List</h2>
                  <ul className="list-unstyled">
                    {customers.map(customer => (
                      <li key={customer.id} className="mb-3 p-4 border rounded"
                          style={{
                            background: "linear-gradient(135deg, #ffffff, #f1f8e9)",
                            border: "1px solid #ddd",
                            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)"
                          }}>
                        <p className="font-weight-bold" style={{ color: "#007bff" }}><strong>Name:</strong> {customer.name}</p>
                        <p className="font-weight-bold" style={{ color: "#007bff" }}><strong>Email:</strong> {customer.custEmail}</p>
                        <p className="font-weight-bold" style={{ color: "#007bff" }}><strong>Phone Number</strong> {customer.custPhoneNo}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </>
  );
};

export default SupplierDashboard;
