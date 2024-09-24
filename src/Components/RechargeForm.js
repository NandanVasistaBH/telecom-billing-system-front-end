import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation from react-router-dom
import './RechargeForm.css'; // Import the CSS file

const RechargeForm = () => {
  const location = useLocation(); // Access the location object to get state
  const navigate = useNavigate();
  const { subscription } = location.state || {}; // Get the subscription details from state
  const [paymentMethod, setPaymentMethod] = useState('');
  const [amountPaid, setAmountPaid] = useState(location.state?.subscription?.price || 0);
  const [status] = useState('pending'); // Set initial status to 'pending'
  const [paymentGateway] = useState('RazorPay'); // Set paymentGateway to 'razorpay'
  const [scriptLoaded, setScriptLoaded] = useState(false);
  
  const [transactionDate] = useState("2024-09-05T10:30:00")

  // Load Razorpay script dynamically
  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => setScriptLoaded(true);
      script.onerror = () => console.error('Failed to load Razorpay script');
      document.body.appendChild(script);
      return () => document.body.removeChild(script);
    };

    if (!window.Razorpay) {
      loadRazorpayScript();
    } else {
      setScriptLoaded(true);
    }
  }, []);

  // Update amountPaid if subscription changes
  useEffect(() => {
    if (subscription && subscription.price) {
      setAmountPaid(subscription.price);
    }
  }, [subscription]);

  const createPayment = async () => {
    console.log('_____Payment_____');
    console.log(amountPaid);
    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URI+'/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethod,
          amountPaid,
          paymentGateway,
          status,
          transactionDate
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      
      const paymentData = await response.json();
      console.log('_____Payment-Completed_____');
      return paymentData;
    } catch (error) {
      console.error('Error creating payment:', error);
    }
  };

  const handlePaymentClick = async (e) => {
    e.preventDefault();
    console.log('Payment button clicked');

    if (!scriptLoaded) {
      console.error('Razorpay script not loaded');
      return;
    }

    const payment = await createPayment();
    console.log(payment);

    if (payment) {
      const options = {
        key: 'rzp_test_lRU4UIyPuqK65t', // Your Razorpay key here
        amount: amountPaid*100, // Amount in paise (e.g., 50000 for INR 500)
        currency: 'INR',
        name: 'ITIT',
        description: 'Payment Testing',
        order_id: payment.razorpayid,
        receipt: payment.customer,
        handler: function (response) {
          console.log('Payment Success: and its id to be sent backend', response.razorpay_payment_id);
          const resp = fetch(process.env.REACT_APP_BACKEND_URI+"/add-payment",{
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`, // Pass the token in the Authorization header
          },
          body: response.razorpay_payment_id
          })
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#E4002B'
        }
      };

      const razp1 = new window.Razorpay(options);
      razp1.open();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handlePaymentClick(e);
  };

  return (
    <div className="recharge-form-container">
      <h2 className="recharge-title">Recharge Your Mobile</h2>
      <form className="recharge-form" onSubmit={handleSubmit}>
        <p><strong>Type:</strong> {subscription?.type}</p>
        <p><strong>Description:</strong> {subscription?.description}</p>
        <p><strong>Price:</strong> {amountPaid.toFixed(2)}</p>
        <p><strong>Duration:</strong> {subscription?.noOfDays} days</p>
        <label htmlFor="mobileNumber" className="form-label">Mobile Number:</label>
        <input
          type="text"
          id="mobileNumber"
          className="form-input"
          placeholder="Enter your mobile number"
          required
        />
        <button type="submit" className="continue-button">Continue</button>
      </form>
    </div>
  );
};

export default RechargeForm;
