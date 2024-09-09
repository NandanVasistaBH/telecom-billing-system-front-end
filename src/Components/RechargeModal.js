// src/Components/RechargeModal.js
import React, { useState } from 'react';
import './RechargeModal.css'; // Ensure this CSS file exists
 
const RechargeModal = ({ isOpen, onClose, onRecharge }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');
 
  const handleRecharge = () => {
    if (!mobileNumber) {
      setError('Please enter a mobile number.');
      return;
    }
 
    // Example validation
    if (mobileNumber.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
 
    onRecharge(mobileNumber); // Call the parent handler
    onClose(); // Close the modal
  };
 
  return (
    isOpen ? (
      <div className="recharge-modal">
        <div className="recharge-modal-content">
          <h2>Recharge</h2>
          <input
            type="text"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="Enter mobile number"
          />
          {error && <p className="error">{error}</p>}
          <button onClick={handleRecharge}>Continue</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    ) : null
  );
};
 
export default RechargeModal;