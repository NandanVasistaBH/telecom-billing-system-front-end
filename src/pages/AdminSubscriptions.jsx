import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const AdminSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [newSubscription, setNewSubscription] = useState({
    type: "",
    description: "",
    price: "",
    noOfDays: "",
  });

  useEffect(() => {
    const fetchSubscriptions = () => {
      const token = localStorage.getItem("jwtToken"); // Get the JWT token from storage
      if (token) {
        // Fetch all subscriptions
        fetch(process.env.REACT_APP_BACKEND_URI+"/subscriptions/all", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Include the token for authorization
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Error: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            setSubscriptions(data);
          })
          .catch((error) => {
            console.error("Error fetching subscriptions:", error);
          });
      } else {
        console.error("No JWT token found in localStorage.");
      }
    };

    fetchSubscriptions();
  }, []);

  // Function to handle subscription creation
  const handleCreateSubscription = (e) => {
    e.preventDefault(); // Prevent the default form submission

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      console.error("No JWT token found in localStorage.");
      return;
    }

    fetch(process.env.REACT_APP_BACKEND_URI+"/subscriptions/create-subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token for authorization
      },
      body: JSON.stringify(newSubscription),
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw new Error(`Error: ${response.status}`); // Handle non-200 status codes
        }
        return response;
      })
      .then(() => {
        // Refresh the subscription list after creating a new subscription
        fetch(process.env.REACT_APP_BACKEND_URI+"/subscriptions/all", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Include the token for authorization
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Error: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => setSubscriptions(data))
          .catch((error) => {
            console.error("Error fetching subscriptions:", error);
          });

        // Clear the form after successful submission
        setNewSubscription({
          type: "",
          description: "",
          price: "",
          noOfDays: "",
        });
      })
      .catch((error) => {
        console.error("Error creating subscription:", error); // Improved error logging
      });
  };

  // Function to handle subscription deletion
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
    <div className="container mt-4">
      <div className="row">
        {/* Subscription List */}
        <div className="col-md-6 mb-4">
          <h3 className="text-primary mb-3">Subscription List</h3>
          <ul className="list-group">
            {subscriptions.map((subscription) => (
              <li
                key={subscription.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <div className="fw-bold">{subscription.type}</div>
                  <div>{subscription.description}</div>
                  <div className="text-muted">₹{subscription.price}</div>
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteSubscription(subscription.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Create Subscription Form */}
        <div className="col-md-6">
          <h3 className="text-primary mb-3">Create New Subscription</h3>
          <form onSubmit={handleCreateSubscription}>
            <div className="mb-3">
              <label className="form-label">Type:</label>
              <select
                className="form-select"
                value={newSubscription.type}
                onChange={(e) =>
                  setNewSubscription({ ...newSubscription, type: e.target.value })
                }
                required
              >
                <option value="">Select Type</option>
                <option value="PREPAID">PREPAID</option>
                <option value="POSTPAID">POSTPAID</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Description:</label>
              <input
                type="text"
                className="form-control"
                value={newSubscription.description}
                onChange={(e) =>
                  setNewSubscription({ ...newSubscription, description: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Price:</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                value={newSubscription.price}
                onChange={(e) =>
                  setNewSubscription({ ...newSubscription, price: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Number of Days:</label>
              <input
                type="number"
                className="form-control"
                value={newSubscription.noOfDays}
                onChange={(e) =>
                  setNewSubscription({ ...newSubscription, noOfDays: e.target.value })
                }
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit Request
            </button>
          </form>
        </div>
      </div>
      </div>
  );
};

export default AdminSubscriptions;
