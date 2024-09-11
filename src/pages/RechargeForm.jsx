import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";

const RechargeForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { subscription } = location.state || {};
  console.log(subscription)
  const [paymentMethod, setPaymentMethod] = useState("");
  const [amountPaid, setAmountPaid] = useState(
    location.state?.subscription?.price || 0
  );
  const [status] = useState("pending");
  const [paymentGateway] = useState("RazorPay");
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [transactionDate] = useState("2024-09-05T10:30:00");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [isPrepaid, setIsPrepaid] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [paymentResponse,setPaymentResponse] = useState({})
  const [userDetails,setUserDetails]=useState({})

  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => setScriptLoaded(true);
      script.onerror = () => setError("Failed to load payment script.");
      document.body.appendChild(script);
      return () => document.body.removeChild(script);
    };

    if (!window.Razorpay) {
      loadRazorpayScript();
    } else {
      setScriptLoaded(true);
    }
    const getUserDetailsFromToken=async()=>{
      const response =await fetch("http://localhost:10000/customer/details-from-token",{
        headers:{
          Authorization:"Bearer "+localStorage.getItem("jwtToken")
        }
      })
      const data = await response.json();
      console.log(data)
      setUserDetails(data)
    }
    getUserDetailsFromToken()
  }, []);

  useEffect(() => {
    if (subscription && subscription.price) {
      setAmountPaid(subscription.price);
    }
    setIsPrepaid(subscription?.type === "PREPAID");
  }, [subscription]);

  const createPayment = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:10000/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethod,
          amountPaid,
          paymentGateway,
          status,
          transactionDate,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const paymentData = await response.json();
      return paymentData;
    } catch (error) {
      setError("Error creating payment: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentClick = async (e) => {
    e.preventDefault();

    if (!scriptLoaded) {
      setError("Payment script not loaded.");
      return;
    }

    if (mobileNumberError) {
      setError("Please correct the errors before proceeding.");
      return;
    }

    const payment = await createPayment();

    if (payment) {
      const options = {
        key: "rzp_test_lRU4UIyPuqK65t",
        amount: amountPaid * 100,
        currency: "INR",
        name: "ITIT",
        description: "Payment Testing",
        order_id: payment.razorpayid,
        receipt: payment.customer,
        handler: async function (response) {
          try {
            const addPaymentResponse = await fetch(
              "http://localhost:10000/add-payment",
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
            const responseData = await addPaymentResponse.json();
      
            // Log the parsed response
            console.log("Payment response:", responseData);
            setPaymentResponse(responseData)
            if (isPrepaid) {
              console.log("payment done " + "invoice generating.....")
              await createPrepaidInvoice(responseData);
            }

            setSuccessMessage(
              isPrepaid
                ? "Your prepaid transaction was successful and the plan is activated!"
                : "Your postpaid transaction was successful and the plan is activated!"
            );
            setShowSuccessModal(true); // Show success modal
          } catch (error) {
            setError("Error during payment processing: " + error.message);
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#0033A0",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mobileNumber || mobileNumberError) {
      setError("Please correct the errors before proceeding.");
      return;
    }

    if (subscription?.type === "PREPAID") {
      handlePaymentClick(e);
    } else if (subscription?.type === "POSTPAID") {
      try {
        setLoading(true);
        await createPostpaidInvoice();
        setSuccessMessage(
          "Your postpaid transaction was successful and the plan is activated!"
        );
        setShowSuccessModal(true); // Show success modal
      } catch (error) {
        setError("Error creating invoice: " + error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setError("Unknown subscription type.");
    }
  };

  const handleMobileNumberChange = (e) => {
    const value = e.target.value;
    setMobileNumber(value);

    if (!/^\d{10}$/.test(value)) {
      setMobileNumberError("Please enter a valid 10-digit mobile number");
    } else {
      setMobileNumberError("");
    }
  };

  const createPrepaidInvoice = async (responseData) => {
    console.log(responseData);
    console.log(responseData.payId);
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      const response = await fetch(
        "http://localhost:10000/invoice/create-prepaid",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({
            amountPaid: amountPaid,
            tax: 15.0,
            customer: { id: userDetails?.id },
            payment: { payId: responseData.payId},
            subscription: { id: subscription?.id },
            supplier: { id: userDetails?.supplierId }
          }),
        }
      );
      console.log(response)
      if (!response.ok) {
        throw new Error("Failed to create prepaid invoice.");
      }

      return response;
    } catch (error) {
      setError("Error creating invoice: " + error.message);
    }
  };

  const createPostpaidInvoice = async () => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      const response = await fetch(
        "http://localhost:10000/invoice/create-postpaid",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({
            amountPaid: 0,
            tax: 15.0,
            customer: { id: userDetails?.id },
            subscription: { id: subscription?.id },
            supplier: { id: 1 },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create postpaid invoice.");
      }
      return  response;
    } catch (error) {
      setError("Error creating invoice: " + error.message);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    navigate("/CustomerDashboard", { state: { subscription, userDetails } }); // Pass subscription and userDetails to dashboard
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#FFF9C4" }} // Full viewport yellow background
    >
      <div
        className="p-4 rounded shadow-sm"
        style={{
          backgroundColor: "#FFFFFF", // White background for the form
          maxWidth: "600px", // Max width of the form
          width: "100%", // Full width within max-width
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)", // Shadow for better separation
        }}
      >
        <h2 className="text-primary text-center mb-4">Recharge Your Mobile</h2>
        <form className="form" onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
          <p>
            <strong>Type:</strong> {subscription?.type}
          </p>
          <p>
            <strong>Description:</strong> {subscription?.description}
          </p>
          <p>
            <strong>Price:</strong> ₹{amountPaid.toFixed(2)}
          </p>
          <div className="form-group">
            <label htmlFor="mobileNumber">Mobile Number:</label>
            <input
              type="text"
              id="mobileNumber"
              className="form-control"
              value={mobileNumber}
              onChange={handleMobileNumberChange}
              placeholder="Enter your mobile number"
            />
            {mobileNumberError && (
              <div className="text-danger">{mobileNumberError}</div>
            )}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Processing..." : "Submit Payment"}
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={handleSuccessClose}>
        <Modal.Header closeButton>
          <Modal.Title>Transaction Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{successMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSuccessClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RechargeForm;
