import React, { useEffect, useState } from 'react';

const AdminSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [newSubscription, setNewSubscription] = useState({
    type: '',
    description: '',
    price: '',
    noOfDays: '',
  });

  useEffect(() => {
    const fetchSubscriptions = () => {
      const token = localStorage.getItem('jwtToken'); // Get the JWT token from storage

      if (token) {
        // Fetch all subscriptions
        fetch(process.env.REACT_APP_BACKEND_URI+'/subscriptions/all', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Include the token for authorization
          },
        })
          .then(response => response.json())
          .then(data => setSubscriptions(data))
          .catch(error => {
            console.error('Error fetching subscriptions:', error);
          });
      } else {
        console.error('No JWT token found in localStorage.');
      }
    };

    fetchSubscriptions();
  }, []);

  // Function to handle subscription creation
  const handleCreateSubscription = (e) => {
    e.preventDefault(); // Prevent the default form submission

    const token = localStorage.getItem('jwtToken');

    fetch(process.env.REACT_APP_BACKEND_URI+'/subscriptions/create-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
      body: JSON.stringify(newSubscription),
    })
      .then(response => response.json())
      .then(() => {
        // Refresh the subscription list after creating a new subscription
        fetch(process.env.REACT_APP_BACKEND_URI+'/subscriptions/all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the token for authorization
          },
        })
          .then(response => response.json())
          .then(data => setSubscriptions(data))
          .catch(error => {
            console.error('Error fetching subscriptions:', error);
          });

        // Clear the form
        setNewSubscription({
          type: '',
          description: '',
          price: '',
          noOfDays: '',
        });
      })
      .catch(error => {
        console.error('Error creating subscription:', error);
      });
  };

  // Function to handle subscription deletion
  const handleDeleteSubscription = (id) => {
    const token = localStorage.getItem('jwtToken');

    fetch(process.env.REACT_APP_BACKEND_URI+`/subscriptions/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`, // Include the token for authorization
      },
    })
      .then(response => response.json())
      .then(() => {
        // After deletion, refresh the subscription list
        setSubscriptions(subscriptions.filter(subscription => subscription.id !== id));
      })
      .catch(error => {
        console.error('Error deleting subscription:', error);
      });
  };

  return (
    <div>
      <h3>Subscription List</h3>
      <ul>
        {subscriptions.map(subscription => (
          <li key={subscription.id}>
            {subscription.description} - ${subscription.price}
            <button onClick={() => handleDeleteSubscription(subscription.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>Create New Subscription</h3>
      <form onSubmit={handleCreateSubscription}>
        <div>
          <label>Type:</label>
          <input
            type="text"
            value={newSubscription.type}
            onChange={(e) => setNewSubscription({ ...newSubscription, type: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={newSubscription.description}
            onChange={(e) => setNewSubscription({ ...newSubscription, description: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            step="0.01"
            value={newSubscription.price}
            onChange={(e) => setNewSubscription({ ...newSubscription, price: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Number of Days:</label>
          <input
            type="number"
            value={newSubscription.noOfDays}
            onChange={(e) => setNewSubscription({ ...newSubscription, noOfDays: e.target.value })}
            required
          />
        </div>
        <button type="submit">Create Subscription</button>
      </form>
    </div>
  );
};

export default AdminSubscriptions;
