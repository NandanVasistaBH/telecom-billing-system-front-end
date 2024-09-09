import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation

const PaymentMethodPage = () => {
  const location = useLocation(); // Access location object to get state
  const [paymentMethod, setPaymentMethod] = useState('');
  const [amountPaid, setAmountPaid] = useState(location.state?.subscription?.price || 0);
  const [status] = useState('pending'); // Set initial status to 'pending'
  const [paymentGateway] = useState('RazorPay'); // Set paymentGateway to 'razorpay'
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [lastUpdate]=useState("2024-09-05T10:30:00")
  const [transactionDate]=useState("2024-09-05")

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

  const createPayment = async () => {
    console.log('_____Payment_____');
    console.log(amountPaid)
    try {
      const response = await fetch('http://localhost:10000/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethod,
          amountPaid:10000,
          paymentGateway,
          status,
          lastUpdate,
          transactionDate
        })
      });
      console.log(response)

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
        amount: payment.amount, // Amount in paise (e.g., 50000 for INR 500)
        currency: 'INR',
        name: 'ITIT',
        description: 'Payment Testing',
        order_id: payment.razorpayid,
        receipt: payment.customer,
        handler: function (response) {
          console.log('Payment Success:', response);
          // Handle payment success here
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
    <div className="payment-method-container">
      <h2 className="payment-method-title">Select Payment Method</h2>
      <form className="payment-method-form" onSubmit={handleSubmit}>
        <label htmlFor="paymentMethod" className="form-label">Payment Method:</label>
        <input
          type="text"
          id="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="form-input"
          placeholder="Enter your payment method"
          required
        />
        <button type="submit" className="continue-button">Continue</button>
      </form>
    </div>
  );
};

export default PaymentMethodPage;
