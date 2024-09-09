// src/CustomerPage.js
import React, { useEffect, useState } from "react";
import TelecomBillingSystem from "./TelecomBillingSystem";
import MenuBarAfter from "./AfterLogin/MenuBarAfter";
import CurrentPlan from "./AfterLogin/CurrentPlan";
import "./CustomerDashboard.css"; // Importing a CSS file for styling

const CustomerDashboard = () => {
  const [userName, setUserName] = useState(""); // State for storing username
  const [invoiceHistory, setInvoiceHistory] = useState([]); // State for storing invoices

  useEffect(() => {
    const token = localStorage.getItem("jwtToken"); // Get the JWT token from storage

    if (token) {
      // Fetch user details from backend using token
      fetch("http://localhost:10000/customer/{name}", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserName(data.userName); // Set the username
          setInvoiceHistory(data.invoices); // Set the invoice history
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    }
  }, []);

  const handleDownloadInvoice = (invoiceId) => {
    // Download an invoice
    fetch(`http://localhost:5001/pdf/invoice/${invoiceId}`, {
      method: "GET"
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement("a");
        a.href = url;
        a.download = `invoice-${invoiceId}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch((error) => console.error("Error downloading invoice:", error));
  };

  return (
    <>
      <div className="nav-bar">
        <div className="logo">
          <img
            src="/telstraLogo1.jpeg"
            alt="Telstra Logo"
            className="telstralogo"
          />
          <span className="logo-text">TeleBillPro</span>
        </div>
      </div>

      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>WELCOME TO YOUR DASHBOARD</h1>
          <CurrentPlan />
          <p>Hello, {userName}!</p>
        </header>

        <section className="invoice-section">
          <h2>Your Invoice History</h2>
          {invoiceHistory.length > 0 ? (
            <div className="invoice-list">
              {invoiceHistory.map((invoice) => (
                <div className="invoice-card" key={invoice.id}>
                  <p>
                    <strong>Invoice ID:</strong> {invoice.id}
                  </p>
                  <p>
                    <strong>Date:</strong> {invoice.date}
                  </p>
                  <p>
                    <strong>Amount:</strong> ${invoice.amount}
                  </p>
                  <button
                    className="download-btn"
                    onClick={() => handleDownloadInvoice(invoice.id)}
                  >
                    Download Invoice
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No invoices found.</p>
          )}
        </section>
      </div>
    </>
  );
};

export default CustomerDashboard;
