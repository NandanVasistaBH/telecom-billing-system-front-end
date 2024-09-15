import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Navbar, Nav } from "react-bootstrap";
import Confetti from "react-confetti";

const PostpaidRecharge = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false); // State for managing confetti display
  const navigate = useNavigate();
  const location = useLocation();
  const { userDetails } = location.state || {}; // Retrieve userDetails from location.state

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch(
          "http://localhost:10000/subscriptions/postpaid",
          {
            method: "GET",
            headers: {
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
    const token = localStorage.getItem("jwtToken");
    if (token && localStorage.getItem("user") === "customer") {
      setShowConfetti(true); // Trigger confetti effect
      setTimeout(() => {
        navigate("/recharge", { state: { subscription, userDetails } });
      }, 3000); // Delay navigation to allow confetti to be visible
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("jwtToken");
      navigate("/login");
    }
  };

  return (
    <>
      {showConfetti && (
        <>
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={100}
            confettiSource={{ x: 0, y: 0, w: window.innerWidth / 2, h: window.innerHeight }}
          />
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={100}
            confettiSource={{ x: window.innerWidth / 2, y: 0, w: window.innerWidth / 2, h: window.innerHeight }}
          />
        </>
      )}
      {/* Navbar */}
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
          Postpaid Subscription Plans
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
                className="d-flex justify-content-center mb-4"
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
                        width: "100%", // Full width button
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

export default PostpaidRecharge;
