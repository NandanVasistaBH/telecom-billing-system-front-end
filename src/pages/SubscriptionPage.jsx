import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const PrepaidRecharge = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch('http://localhost:10000/subscriptions/all', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

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
    navigate('/recharge', { state: { subscription } }); // Pass subscription details
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#FFFDD0' }}>
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold" style={{ color: '#0033A0' }}>Subscription Page</h1>
        {error && <p className="text-red-600 mb-4">{`Error: ${error}`}</p>}
        {data.length ? (
          <div className="space-y-4">
            {data.map((item) => (
              <div key={item.id} className="bg-cream border border-blue-300 rounded-lg p-4 shadow-md" style={{ backgroundColor: '#FFFDD0', borderColor: '#0033A0' }}>
                <h2 className="text-xl font-semibold" style={{ color: '#0033A0' }}>{item.type}</h2>
                <p className="text-gray-700 mb-2">{item.description}</p>
                <p className="text-gray-900 mb-2">Price: ${item.price.toFixed(2)}</p>
                <p className="text-gray-700 mb-4">Duration: {item.noOfDays} days</p>
                <button
                  onClick={() => handleRechargeClick(item)}
                  className="font-bold py-2 px-4 rounded"
                  style={{ backgroundColor: '#E4002B', color: 'white' }}
                >
                  RECHARGE
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default PrepaidRecharge;
