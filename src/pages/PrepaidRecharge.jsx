import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap"; // Bootstrap components

const PrepaidRecharge = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate
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
    navigate("/recharge", { state: { subscription, userDetails } }); // Pass subscription and userDetails
  };

  return (
    <Container
      fluid
      className="d-flex flex-column min-vh-100"
      style={{ backgroundColor: "#FFFDD0" }}
    >
      <h1 className="text-center mb-4" style={{ color: "#0033A0" }}>
        Subscription Plans
      </h1>
      {error && <p className="text-center text-danger">{`Error: ${error}`}</p>}
      {data.length ? (
        <Row className="flex-grow-1">
          {data.map((item) => (
            <Col md={3} sm={6} className="mb-4" key={item.id}>
              <Card
                style={{ backgroundColor: "#EAEDED", borderRadius: "10px" }}
              >
                <Card.Body>
                  <Card.Title style={{ color: "#0033A0" }}>
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
                      backgroundColor: "#E4002B",
                      borderColor: "#E4002B",
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
  );
};

export default PrepaidRecharge;
