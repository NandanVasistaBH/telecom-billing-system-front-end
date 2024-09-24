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

  const CustomerDashboard = () => {
    const [userName, setUserName] = useState("");
    const [userDetails, setUserDetails] = useState(null);
    const [prepaidInvoices, setPrepaidInvoices] = useState([]);
    const [postpaidInvoices, setPostpaidInvoices] = useState([]);
    const [selectedInvoiceType, setSelectedInvoiceType] = useState("prepaid");
    const [error, setError] = useState("");
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [paymentMethod] = useState("upi");
    const [status] = useState("pending");
    const [transactionDate] = useState("2024-09-05T10:30:00");
    const [paymentGateway] = useState("RazorPay");
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleMouseEnter = () => {
      setShowDropdown(true);
    };

    const handleMouseLeave = () => {
      setShowDropdown(false);
    };

    useEffect(() => {
      const loadRazorpayScript = () => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => setScriptLoaded(true);
        script.onerror = () => setError("Failed to load payment script.");
        document.body.appendChild(script);
      };
      const token = localStorage.getItem("jwtToken");
      const storedUserName = localStorage.getItem("username");

      const user = localStorage.getItem("user");

      if(user==="admin" || user==="supplier" || user==="master"){
        navigate("/login");
        return;
      }
      if (token) {
        fetch(process.env.REACT_APP_BACKEND_URI+"/customer/details-from-token", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setUserDetails(data);
            fetchInvoices(data.id); // Assuming you use the customer ID to fetch invoices
          })
          .catch((error) => {
            console.error("Error fetching user details:", error);
          });
      }
      if (!window.Razorpay) {
        loadRazorpayScript();
      } else {
        setScriptLoaded(true);
      }
    }, []);

    const fetchInvoices = (customerId) => {
      const token = localStorage.getItem("jwtToken");

      fetch(process.env.REACT_APP_BACKEND_URI+`/invoice/all-invoice-customer/${customerId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const prepaid = data.filter(
            (invoice) => invoice.subscription.type === "PREPAID"
          );
          const postpaid = data.filter(
            (invoice) => invoice.subscription.type === "POSTPAID"
          );
          setPrepaidInvoices(prepaid);
          setPostpaidInvoices(postpaid);
        })
        .catch((error) => {
          console.error("Error fetching invoices:", error);
        });
    };

    const handlePlanSelection = (planType) => {
      navigate(`/${planType}`, { state: { userDetails } });
    };

    const handleGeneratePDF = (invoiceId) => {
      if(!invoiceId) {
        alert("the specified invoice doesn't exist")
        return
      }
     const token = localStorage.getItem("jwtToken");
     fetch(process.env.REACT_APP_BACKEND_URI+`/pdf/create?invoiceId=${invoiceId}`, {
       method: "GET",
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
       },
     })
       .then((response) => {
         if (response.ok) {
           return response.blob(); // Convert the response to a Blob (binary large object)
         }
         throw new Error("Failed to generate PDF.");
       })
       .then((blob) => {
         // Create a URL for the Blob and open it in a new window
         const url = window.URL.createObjectURL(blob);
         const a = document.createElement("a");
         a.href = url;
         a.download = `invoice-${invoiceId}.pdf`; // Filename for the downloaded PDF
         document.body.appendChild(a);
         a.click();
         a.remove();
       })
       .catch((error) => {
         console.error("Error generating PDF:", error);
       });
   };


    const handlePayBill = async (invoice) => {
      if (!scriptLoaded) {
        setError("Payment script not loaded.");
        return;
      }

      const createPayment = async () => {
        try {
          const response = await fetch(process.env.REACT_APP_BACKEND_URI+"/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization:"Bearer "+localStorage.getItem("jwtToken")
            },
            body: JSON.stringify({
              paymentMethod,
              amountPaid: invoice.subscription.price,
              paymentGateway,
              status,
              transactionDate,
            }),
          });

          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }

          return await response.json();
        } catch (error) {
          setError("Error creating payment: " + error.message);
          return null;
        }
      };

      const payment = await createPayment();

      if (payment) {
        const options = {
          key: "rzp_test_lRU4UIyPuqK65t", // Replace with your Razorpay key
          amount: (invoice.subscription.price - invoice.amountPaid) * 100,
          currency: "INR",
          name: "TeleBillPro",
          description: "Postpaid Bill Payment",
          order_id: payment.razorpayid,
          handler: async function (response) {
            try {
              // Step 1: Add the payment to your system (optional)
              const addPaymentResponse = await fetch(
                process.env.REACT_APP_BACKEND_URI+"/add-payment",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                  },
                  body: response.razorpay_payment_id,
                }
              );

              if (!addPaymentResponse.ok) {
                throw new Error("Error adding payment.");
              }

              // Step 2: Update the amountPaid in the backend after successful payment
              const updateInvoiceResponse = await fetch(
                process.env.REACT_APP_BACKEND_URI+"/invoice/update-postpaid",
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                  },
                  body: JSON.stringify({
                    id: invoice.id,
                    amountPaid: invoice.subscription.price, // Assuming full payment
                  }),
                }
              );

              if (!updateInvoiceResponse.ok) {
                throw new Error("Error updating invoice.");
              }

              setSuccessMessage(
                "Your postpaid transaction was successful and the bill is paid!"
              );
              setShowSuccessModal(true);
            } catch (error) {
              setError("Error during payment processing: " + error.message);
            }
          },
          prefill: {
            name: userDetails.name,
            email: userDetails.custEmail,
            contact: userDetails.custPhoneNo,
          },
          theme: {
            color: "#0033A0",
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      }
    };

    const handleLogout=()=>{
      // localStorage.setItem("jwtToken",null);
      localStorage.removeItem("jwtToken")
      localStorage.removeItem("user")
    }
    const handleViewChange = (type) => {
      setSelectedInvoiceType(type);
    };

    const renderInvoiceTable = (invoices) => (
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Supplier</th>
            <th>Subscription</th>
            <th>Issue Date</th>
            <th>Last Updated</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{invoice.supplierDTO.name}</td>
              <td>{invoice.subscription.type}</td>
              <td>{invoice.invoiceIssueDate}</td>
              <td>{invoice.lastUpdatedAt}</td>
              <td>
                {invoice.subscription.type === "PREPAID" && invoice.amountPaid}
                {invoice.subscription.type === "POSTPAID" &&
                  invoice.subscription.price }
              </td>
              <td>
                {invoice.subscription.type === "PREPAID" && (
                  <Button
                    variant="secondary"
                    onClick={() => handleGeneratePDF(invoice.id)}
                  >
                    Generate PDF
                  </Button>
                )}
                {invoice.subscription.type === "POSTPAID" && (
                  <>
                    <Button
                      variant="secondary"
                      onClick={() => handleGeneratePDF(invoice.id)}
                      className="me-2"
                    >
                      Generate PDF
                    </Button>
                    {invoice.subscription.price - invoice.amountPaid > 0 && (
                      <Button
                        variant="success"
                        onClick={() => handlePayBill(invoice)}
                      >
                        Pay Bill
                      </Button>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );

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
              <NavDropdown
                title={<span style={{ color: "#fff", fontSize: '1.2rem' }}>View Plans</span>}
                id="basic-nav-dropdown"
                style={{
                  backgroundColor: 'transparent', // Makes background transparent
                  boxShadow: 'none', // Removes shadow
                  border: 'none' // Ensures no border
                }}
                show={showDropdown}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <NavDropdown.Item
                  onClick={() => handlePlanSelection("prepaid")}
                  style={{
                    color: '#0033a0',
                    fontWeight: 'bold',
                    padding: '10px 20px',
                    transition: 'background-color 0.3s ease, color 0.3s ease',
                    borderRadius: '5px',
                    backgroundColor: '#fff', // Ensure item background is white
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#0033a0';
                    e.target.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#fff';
                    e.target.style.color = '#0033a0';
                  }}
                >
                  Prepaid
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => handlePlanSelection("postpaid")}
                  style={{
                    color: '#0033a0',
                    fontWeight: 'bold',
                    padding: '10px 20px',
                    transition: 'background-color 0.3s ease, color 0.3s ease',
                    borderRadius: '5px',
                    backgroundColor: '#fff', // Ensure item background is white
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#0033a0';
                    e.target.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#fff';
                    e.target.style.color = '#0033a0';
                  }}
                >
                  Postpaid
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
              <Nav className="ms-auto" style={{ alignItems: 'center', flexDirection: 'column' }}>
                <Nav.Link onClick={handleLogout} href="/login" style={{ color: "#FFFDD0" }}>
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
              <h1 className="text-primary">Welcome to Dashboard</h1>
            </header>

            {userDetails && (
              <>
                {/* User Details */}
                <Row className="mb-4">
                  <Col md={12} className="d-flex justify-content-center">
                    <Card
                      className="p-4 shadow"
                      style={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        width: "100%",
                        maxWidth: "800px",
                      }}
                    >
                      <h2 className="mb-3 text-primary text-center">
                        Your Details
                      </h2>
                      <div
                        className="d-flex flex-column"
                        style={{ alignItems: "flex-start" }}
                      >
                        <p style={{ color: "#000" }}>
                          <strong>Name:</strong> {userDetails.name}
                        </p>
                        <p style={{ color: "#000" }}>
                          <strong>Email:</strong> {userDetails.custEmail}
                        </p>
                        <p style={{ color: "#000" }}>
                          <strong>Phone Number:</strong>{" "}
                          {userDetails.custPhoneNo}
                        </p>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </>
            )}

            {/* Invoice View Dropdown */}
            <Row className="mb-4">
              <Col>
                <NavDropdown
                  title={`View ${
                    selectedInvoiceType.charAt(0).toUpperCase() +
                    selectedInvoiceType.slice(1)
                  } Invoices`}
                  id="invoice-view-dropdown"
                  onSelect={(eventKey) => handleViewChange(eventKey)}
                  className="dropdown-button"
                >
                  <NavDropdown.Item eventKey="prepaid">
                    <Button
                      variant="outline-primary"
                      className="w-100 text-start"
                    >
                      Prepaid
                    </Button>
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="postpaid">
                    <Button
                      variant="outline-primary"
                      className="w-100 text-start"
                    >
                      Postpaid
                    </Button>
                  </NavDropdown.Item>
                </NavDropdown>
              </Col>
            </Row>

            {/* Invoice Tables */}
            <Row>
              <Col md={12}>
                {selectedInvoiceType === "prepaid" &&
                  renderInvoiceTable(prepaidInvoices)}
                {selectedInvoiceType === "postpaid" && (
                  <>
                    <button onClick={() => window.location.reload()}>
                      Reload
                    </button>
                    <div>{renderInvoiceTable(postpaidInvoices)}</div>
                  </>
                )}
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  };

  export default CustomerDashboard;
