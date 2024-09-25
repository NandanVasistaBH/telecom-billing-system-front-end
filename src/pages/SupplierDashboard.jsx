import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Navbar,
  Nav,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const SupplierDashboard = () => {
  const [supplierDetails, setSupplierDetails] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const user = localStorage.getItem("user");

    if(user==="admin" || user==="customer" || user==="master"){
      navigate("/supplierlogin")
      return;
    }
    const fetchSupplierDetails = async () => {
      if (token) {
        try {
          const response = await fetch(
            process.env.REACT_APP_BACKEND_URI+`/supplier/details-from-token`,
            {
              method: "GET",
              headers: {
                Authorization: "Bearer " + localStorage.getItem("jwtToken"),
                "Content-Type": "application/json",
              },
            }
          );
          if (!response.ok) throw new Error("Network response was not ok");
          const data = await response.json();
          setSupplierDetails(data);
        } catch (err) {
          setError(err.message);
        }
      }
    };

    fetchSupplierDetails();
  }, []);

  const handleLogout=()=>{
    localStorage.removeItem("jwtToken")
    localStorage.removeItem("user");
  }

  const fetchCustomers = async () => {
    if (!supplierDetails) return;
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URI+`/supplier/list-of-customers?supplierId=${supplierDetails.id}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken"),
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Network response was not ok");
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
            as={Link} 
            to="/"
            className="d-flex align-items-center"
          >
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
            <Nav.Link onClick={handleLogout} href="/supplierlogin" style={{ color: "#FFFDD0" }}>
              Logout
            </Nav.Link>
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

      {/* Main Content */}
      <div
        style={{
          background:
            "radial-gradient(circle, rgba(204,229,255,1) 0%, rgba(255,255,255,1) 100%)",
          minHeight: "100vh",
          padding: "30px",
        }}
      >
        <Container>
          <header className="text-center mb-4">
            <h1 className="text-dark display-4 font-weight-bold">
              Supplier Dashboard
            </h1>
            <p className="text-muted lead">
              Overview of your branch and customers
            </p>
          </header>

          {/* Supplier Details */}
          {supplierDetails && (
            <Row className="mb-4">
              <Col md={12} className="d-flex justify-content-center">
                <Card
                  className="p-4 shadow-sm"
                  style={{
                    background:
                      "linear-gradient(135deg, #e0f7fa 0%, #ffffff 50%, #f7f9fc 100%)",
                    borderRadius: "15px",
                    border: "1px solid #ddd",
                    width: "100%",
                    maxWidth: "900px",
                  }}
                >
                  <h2 className="text-primary mb-4 font-weight-bold">
                    Supplier Details
                  </h2>
                  <div
                    className="d-flex flex-column"
                    style={{ alignItems: "flex-start" }}
                  >
                    <p className="mb-2" style={{ color: "#000" }}>
                      <strong>Branch Name:</strong> {supplierDetails.name}
                    </p>
                    <p className="mb-2" style={{ color: "#000" }}>
                      <strong>Branch Manager:</strong>{" "}
                      {supplierDetails.branchManager}
                    </p>
                    <p className="mb-2" style={{ color: "#000" }}>
                      <strong>Branch Location:</strong>{" "}
                      {supplierDetails.branchLoc}
                    </p>
                    <p className="mb-2" style={{ color: "#000" }}>
                      <strong>Email:</strong> {supplierDetails.branchEmail}
                    </p>
                    <p className="mb-0" style={{ color: "#000" }}>
                      <strong>Phone Number:</strong>{" "}
                      {supplierDetails.branchPhoneNo}
                    </p>
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
                style={{
                  background:
                    "linear-gradient(135deg, #007bff 0%, #0056d2 100%)",
                  borderRadius: "25px",
                  color: "#fff",
                  boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.2)",
                  padding: "10px 30px",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                Get Customers
              </Button>
            </Col>
          </Row>

          {/* Customer List */}
          {error && <p className="text-danger text-center">{error}</p>}
          {customers.length > 0 && (
            <Row>
              <Col md={12}>
                <div
                  className="bg-white p-4 rounded shadow-sm"
                  style={{
                    background:
                      "linear-gradient(135deg, #f0f8ff 0%, #ffffff 100%)",
                    borderRadius: "12px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
                    border: "1px solid #ddd",
                  }}
                >
                  <h2 className="text-primary mb-3 font-weight-bold text-center">
                    Customer List
                  </h2>
                  <table className="table table-striped table-hover table-borderless">
                    <thead className="thead-light">
                      <tr style={{ backgroundColor: "#e3f2fd" }}>
                        <th
                          className="text-dark"
                          style={{ fontWeight: "bold", color: "#000" }}
                        >
                          Name
                        </th>
                        <th
                          className="text-dark"
                          style={{ fontWeight: "bold", color: "#000" }}
                        >
                          Email
                        </th>
                        <th
                          className="text-dark"
                          style={{ fontWeight: "bold", color: "#000" }}
                        >
                          Phone Number
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((customer) => (
                        <tr
                          key={customer.id}
                          style={{ borderBottom: "1px solid #ddd" }}
                        >
                          <td
                            className="text-secondary"
                            style={{ fontWeight: "bold", color: "#000" }}
                          >
                            {customer.name}
                          </td>
                          <td
                            className="text-secondary"
                            style={{ fontWeight: "bold", color: "#000" }}
                          >
                            {customer.custEmail}
                          </td>
                          <td
                            className="text-secondary"
                            style={{ fontWeight: "bold", color: "#000" }}
                          >
                            {customer.custPhoneNo}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
