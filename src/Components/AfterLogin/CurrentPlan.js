import React from 'react';
import { useNavigate } from 'react-router-dom';

const CurrentPlan = () => {
  const navigate = useNavigate();

  // Static user data
  const user = {
    name: 'Jane Doe', // Placeholder name
    planType: 'prepaid', // Change to 'postpaid' to test the other path
  };

  const handleViewPlanClick = () => {
    if (user.planType === 'prepaid') {
      navigate('/prepaid-plans');
    } else {
      navigate('/postpaid-plans');
    }
  };

  return (
    <div className="card">
      <h5 className="card-header">Current Plan</h5>
      <div className="card-body">
        <h5 className="card-title">{user.name}</h5>
        <p className="card-text">Plan Type: {user.planType}</p>
        <button className="btn btn-primary" onClick={handleViewPlanClick}>
          View Plan
        </button>
      </div>
    </div>
  );
};

export default CurrentPlan;