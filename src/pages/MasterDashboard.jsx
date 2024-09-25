import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Navbar, Nav, Button, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const MasterDashboard = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        navigate('/masterlogin');
        return;
      }
      const apiEndpoint = process.env.REACT_APP_BACKEND_URI+'/subscriptions/all-subscription-types';

      try {
        const response = await fetch(apiEndpoint, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setSubscriptions(data);
        } else {
          const errorData = await response.text(); // Use text() for plain text responses
          setErrorMessage(errorData || 'Failed to fetch subscriptions');
        }
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
        setErrorMessage('An error occurred. Please try again later.');
      }
    };

    fetchSubscriptions();
  }, [navigate]);

  const handleApprove = async (id) => {
    const token = localStorage.getItem('jwtToken');
    if (!token) return;

    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URI+'/subscriptions/approve-subscription', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded', // Correct content type for URLSearchParams
        },
        body: new URLSearchParams({ subscriptionId: id }),
      });

      if (!response.ok) {
        const errorData = await response.text(); // Use .text() if the response might not be JSON
        throw new Error(errorData || 'Failed to approve subscription');
      }

      const result = await response.text(); // Use .text() if the response might be plain text
      setSubscriptions(subscriptions.map(sub =>
        sub.id === id ? { ...sub, status: 'LIVE' } : sub
      ));
      setSuccessMessage(result); // Set success message
      setErrorMessage(''); // Clear error message
    } catch (error) {
      console.error('Error approving subscription:', error);
      setErrorMessage(error.message || 'An error occurred. Please try again later.');
      setSuccessMessage(''); // Clear success message
    }
  };

  const handleReject = async (id) => {
    const token = localStorage.getItem('jwtToken');
    if (!token) return;

    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URI+'/subscriptions/reject-subscription', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded', // Correct content type for URLSearchParams
        },
        body: new URLSearchParams({ subscriptionId: id }),
      });

      if (!response.ok) {
        const errorData = await response.text(); // Use .text() if the response might not be JSON
        throw new Error(errorData || 'Failed to reject subscription');
      }

      const result = await response.text(); // Use .text() if the response might be plain text
      setSubscriptions(subscriptions.filter(sub => sub.id !== id));
      setSuccessMessage(result); // Set success message
      setErrorMessage(''); // Clear error message
    } catch (error) {
      console.error('Error rejecting subscription:', error);
      setErrorMessage(error.message || 'An error occurred. Please try again later.');
      setSuccessMessage(''); // Clear success message
    }
  };

  const handleDeleteSubscription = (id) => {
    const token = localStorage.getItem("jwtToken");

    fetch(process.env.REACT_APP_BACKEND_URI+`/subscriptions/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`, // Include the token for authorization
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response;
      })
      .then(() => {
        // After deletion, refresh the subscription list
        setSubscriptions(
          subscriptions.filter((subscription) => subscription.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting subscription:", error);
      });
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img
              src="https://invoice-telecom-billing.s3.amazonaws.com/telstralogo1.jpeg"
              alt="Telstra Logo"
              style={{ width: '50px', height: 'auto' }}
            />
            <span className="ms-2" style={{ color: '#FFFDD0' }} onClick={() => navigate('/')}>
              TeleBillPro
            </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link onClick={() => navigate('/masterlogin')} style={{ color: '#FFFDD0' }}>
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div
        style={{
          background: 'radial-gradient(circle, rgba(230,245,255,1) 0%, rgba(255,255,255,1) 100%)',
          minHeight: '100vh',
          padding: '30px',
        }}
      >
        <Container fluid>
          <h2 className="text-center mb-4" style={{ color: '#0033A0' }}>
            Master Admin Dashboard
          </h2>
          {errorMessage && (
            <Alert variant="danger" style={{ textAlign: 'center', marginBottom: '20px' }}>
              {errorMessage}
            </Alert>
          )}
          {successMessage && (
            <Alert variant="success" style={{ textAlign: 'center', marginBottom: '20px' }}>
              {successMessage}
            </Alert>
          )}
          <Row>
            <Col xs={12}> {/* Full width column */}
              <Card>
                <Card.Header as="h5">Subscriptions</Card.Header>
                <Card.Body>
                  <div style={{ width: '100%' }}> {/* Ensure full width */}
                    <Table striped bordered hover responsive="lg" style={{ width: '100%' }}>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Subscription ID</th>
                          <th>Subscription Type</th>
                          <th>Description</th>
                          <th>Price</th>
                          <th>Number Of Active Subscribers</th>
                          <th>Number Of Days</th>
                          <th>Status</th>
                          <th>Request</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subscriptions.map((sub, index) => (
                          <tr key={sub.id}>
                            <td>{index + 1}</td>
                            <td>{sub.id}</td>
                            <td>{sub.type}</td>
                            <td>{sub.description}</td>
                            <td>{sub.price}</td>
                            <td>{sub.noOfActiveSubscribers}</td>
                            <td>{sub.noOfDays}</td>
                            <td>{sub.status}</td>
                            <td>
                              {sub.status === 'PENDING_FOR_APPROVAL_LIVE' && (
                                <>
                                  <Button
                                    variant="success"
                                    onClick={() => handleApprove(sub.id)}
                                    className="me-2"
                                  >
                                    Approve
                                  </Button>
                                  <Button
                                    variant="danger"
                                    onClick={() => handleReject(sub.id)}
                                  >
                                    Reject
                                  </Button>
                                </>
                              )}
                              {sub.status === 'PENDING_FOR_APPROVAL_CLOSED' && (
                                <>
                                  <Button
                                    variant="success"
                                    onClick={() => handleApprove(sub.id)}
                                    className="me-2"
                                  >
                                    LIVE
                                  </Button>
                                  <Button
                                    variant="danger"
                                    onClick={() => handleDeleteSubscription(sub.id)}
                                  >
                                    DELETE
                                  </Button>
                                </>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default MasterDashboard;
