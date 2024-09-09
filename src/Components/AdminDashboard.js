import React from 'react';
//  import SubscriptionList from './SubscriptionList'; // Import the SubscriptionList component
 
import AdminSubscriptions from './AdminSubscriptions';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      {/* Links to the Subscription List component */}
      <div className="dashboard-content">
        <h3>Manage Subscriptions</h3>
        
        <AdminSubscriptions />
      </div>
    </div>
  );
};

export default AdminDashboard;