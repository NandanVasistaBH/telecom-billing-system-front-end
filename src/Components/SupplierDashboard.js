import React, { useState } from 'react';
import './SupplierDashboard.css'; // Import the CSS file

const SupplierDashboard = () => {
  const [supplierId, setSupplierId] = useState('');
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);

  const fetchCustomers = async () => {
    try {
      const response = await fetch(`http://localhost:10000/supplier/list-of-customers?supplierId=${supplierId}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("jwtToken"),
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setCustomers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (supplierId) {
      fetchCustomers();
    }
  };

  return (
    <div className="supplier-dashboard p-8 bg-cream min-h-screen">
      <div className="nav-bar flex items-center justify-between bg-blue-800 p-4 text-white shadow-md">
        <div className="logo flex items-center">
          <img
            src="/telstraLogo1.jpeg"
            alt="Telstra Logo"
            className="telstralogo w-14 h-14 mr-3"
          />
          <span className="logo-text text-3xl font-bold">TeleBillPro</span>
        </div>
      </div>
      <div className="container mt-8 mx-auto max-w-4xl">
        <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-lg">
          <label htmlFor="supplierId" className="block text-lg font-semibold text-gray-800 mb-3">
            Enter Supplier ID:
          </label>
          <input
            type="number"
            id="supplierId"
            value={supplierId}
            onChange={(e) => setSupplierId(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-blue font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Get Customers
          </button>
        </form>
        {error && <p className="text-red-600 font-semibold">{error}</p>}
        {customers.length > 0 && (
          <div className="customer-list bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Customer List</h2>
            <ul className="list-disc pl-5 space-y-4">
              {customers.map(customer => (
                <li key={customer.id} className="p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
                  <p className="font-semibold text-gray-800">{customer.name}</p>
                  <p className="text-gray-600">Email: {customer.custEmail}</p>
                  <p className="text-gray-600">Phone: {customer.custPhoneNo}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierDashboard;
