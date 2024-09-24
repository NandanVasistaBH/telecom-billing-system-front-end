import React, { useState } from 'react';

const RazorPayPayment = () => {
  const [payment, setPayment] = useState(null);

  const createPayment = async () => {
    console.log('_____Payment_____');

    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URI+'/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          paymentMethod: document.getElementById('paymentMethod').value,
          amountPaid: parseFloat(document.getElementById('amountPaid').value),
          paymentGateway: document.getElementById('paymentGateway').value,
          status: document.getElementById('status').value,
          customerid: parseInt(document.getElementById('customerid').value),
          currency: 'INR'
        })
      });

      const paymentData = await response.json();
      console.log('_____Payment-Completed_____');
      return paymentData;
    } catch (error) {
      console.error('Error creating payment:', error);
    }
  };

  const handlePaymentClick = async (e) => {
    e.preventDefault();
    console.log(3);

    const payment = await createPayment();
    console.log(payment);

    if (payment) {
      const options = {
        key: 'rzp_test_59f7l7bMLeN2hs',
        amount: payment.amount,
        currency: 'INR',
        name: 'ITIT',
        description: 'Payment Testing',
        order_id: payment.razorpayid,
        receipt: payment.customer
      };

      const razp1 = new window.Razorpay(options);
      razp1.open();
    }
  };

  return (
    <div>
      <input type="text" id="paymentMethod" placeholder="Payment Method" />
      <input type="number" id="amountPaid" placeholder="Amount Paid" />
      <input type="text" id="paymentGateway" placeholder="Payment Gateway" />
      <input type="text" id="status" placeholder="Status" />
      <input type="number" id="customerid" placeholder="Customer ID" />
      
      <button id="rzp-button1" onClick={handlePaymentClick}>
        Pay Now
      </button>
    </div>
  );
};

export default RazorPayPayment;
