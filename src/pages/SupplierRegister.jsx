import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const SupplierRegister = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [branchLoc, setBranchLoc] = useState("");
  const [branchManager, setBranchManager] = useState("");
  const [branchEmail, setBranchEmail] = useState("");
  const [branchPhoneNo, setBranchPhoneNo] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const registrationData = {
      user: {
        name: name,
        password: password,
        role: "SUPPLIER",
      },
      branchLoc: branchLoc,
      branchManager: branchManager,
      branchEmail: branchEmail,
      branchPhoneNo: branchPhoneNo,
    };

    try {
      const response = await fetch("http://localhost:10000/supplier/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      if (response.ok) {
        alert("Registration successful!");
        navigate("/supplierlogin");
      } else {
        const error = await response.json();
        alert(`Registration failed: ${error.message}`);
      }
    } catch (error) {
      console.error("Error occurred during registration:", error);
      alert("An error occurred during registration. Please try again later.");
    }
  };

  return (
    <div
      className="container d-flex align-items-center justify-content-center min-vh-100 "
      style={{ backgroundColor: "beige" ,width:"80%" }}
    >
      <div
        className="bg-white shadow rounded p-4 p-md-5"
        style={{
          maxWidth: "1200px",
          borderColor: "#0033A0",
          borderWidth: "1px",
          borderStyle: "solid",
          backgroundColor: "#FFFDD0",
        }}
      >
        <h2 className="text-center mb-4" style={{ color: "#E4002B" }}>
          Register
        </h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label
              htmlFor="name"
              className="form-label"
              style={{ color: "#0033A0" }}
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-control"
              style={{ borderColor: "#0033A0" }}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="password"
              className="form-label"
              style={{ color: "#0033A0" }}
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
              style={{ borderColor: "#0033A0" }}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="branchLoc"
              className="form-label"
              style={{ color: "#0033A0" }}
            >
              Branch Location:
            </label>
            <input
              type="text"
              id="branchLoc"
              value={branchLoc}
              onChange={(e) => setBranchLoc(e.target.value)}
              required
              className="form-control"
              style={{ borderColor: "#0033A0" }}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="branchManager"
              className="form-label"
              style={{ color: "#0033A0" }}
            >
              Branch Manager:
            </label>
            <input
              type="text"
              id="branchManager"
              value={branchManager}
              onChange={(e) => setBranchManager(e.target.value)}
              required
              className="form-control"
              style={{ borderColor: "#0033A0" }}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="branchEmail"
              className="form-label"
              style={{ color: "#0033A0" }}
            >
              Branch Email:
            </label>
            <input
              type="email"
              id="branchEmail"
              value={branchEmail}
              onChange={(e) => setBranchEmail(e.target.value)}
              required
              className="form-control"
              style={{ borderColor: "#0033A0" }}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="branchPhoneNo"
              className="form-label"
              style={{ color: "#0033A0" }}
            >
              Branch Phone Number:
            </label>
            <input
              type="tel"
              id="branchPhoneNo"
              value={branchPhoneNo}
              onChange={(e) => setBranchPhoneNo(e.target.value)}
              required
              className="form-control"
              style={{ borderColor: "#0033A0" }}
            />
          </div>
          <button
            type="submit"
            className="btn"
            style={{ backgroundColor: "#0d54ff", color: "white" }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default SupplierRegister;
