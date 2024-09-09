import React from "react";
import AdminSubscriptions from "./AdminSubscriptions";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const AdminDashboard = () => {
  return (
    <div className="container-fluid d-flex flex-column min-vh-100 p-0">
      <h2 className="text-center mb-4">Admin Dashboard</h2>
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div
          className="card p-4 w-100"
          style={{ maxWidth: "1200px", backgroundColor: "#f5f5dc" }} // Beige color
        >
          <h3 className="text-primary mb-3">Manage Subscriptions</h3>
          <AdminSubscriptions />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
