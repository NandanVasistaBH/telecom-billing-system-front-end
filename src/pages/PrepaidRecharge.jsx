import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Navbar,
  Nav,
} from "react-bootstrap";

const PrepaidRecharge = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { userDetails } = location.state || {};

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await fetch(
          "http://localhost:10000/subscriptions/prepaid",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchSubscriptions();
  }, []);

  const handleRechargeClick = (subscription) => {
    navigate("/recharge", { state: { subscription, userDetails } });
  };

  return (
    <>
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
      <Container
        fluid
        className="d-flex flex-column min-vh-100"
        style={{
          background:
            "radial-gradient(circle, rgba(204,229,255,1) 0%, rgba(255,255,255,1) 100%)",
          minHeight: "100vh",
          padding: "30px",
        }}
      >
        <h1 className="text-center mb-4" style={{ color: "#0033A0" }}>
          Prepaid Subscription Plans
        </h1>
        {error && (
          <p className="text-center text-danger">{`Error: ${error}`}</p>
        )}
        {data.length ? (
          <Row
            className="d-flex justify-content-center"
            style={{ gap: "1rem" }}
          >
            {data.map((item) => (
              <Col
                xs={12}
                md={6}
                lg={3}
                className="d-flex justify-content-center mb-3"
                key={item.id}
              >
                <Card
                  className="text-center"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "10px",
                    border: "1px solid #0033A0",
                    width: "100%",
                    maxWidth: "300px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <Card.Body style={{ padding: "1rem" }}>
                    <Card.Title
                      style={{ color: "#0033A0", fontSize: "1.25rem" }}
                    >
                      {item.type}
                    </Card.Title>
                    <Card.Text>
                      <strong>Description:</strong> {item.description}
                    </Card.Text>
                    <Card.Text>
                      <strong>Price:</strong> ₹{item.price.toFixed(2)}
                    </Card.Text>
                    <Card.Text>
                      <strong>Duration:</strong> {item.noOfDays} days
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => handleRechargeClick(item)}
                      style={{
                        backgroundColor: "#0033A0",
                        borderColor: "#0033A0",
                        width: "100%",
                      }}
                    >
                      Recharge
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </Container>
    </>
  );
};

export default PrepaidRecharge;
