/// src/Components/TelecomBillingSystem.js
import React, { useState } from 'react';
import { User, Building2, Shield, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import './TelecomBillingSystem.css';
import RechargeForm from './RechargeForm';
import FlashcardsList from './FlashcardsList';
import RechargeModal from './RechargeModal';
import Customer from './Customer';
import ImageCarousel from './ImageCarousel';
import AboutUs from './AboutUs';
import AdminLogin from './AdminLogin';
import SupplierRegister from '../pages/SupplierRegister';
const TelecomBillingSystem = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedDropdownOption, setSelectedDropdownOption] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
 
  const [prepaidopen,setPrepaidopen]=useState(false);
  const userRoles = [
    { id: 'customer', name: 'Customer', icon: User },
    { id: 'supplier', name: 'Supplier', icon: Building2 },
    { id: 'admin', name: 'Admin', icon: Shield },
  ];
 
  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };
 
  const handleDropdownClick = (option) => {
    setPrepaidopen(!prepaidopen)
    setSelectedDropdownOption(option);
    setOpenDropdown(null);
    if (option === 'prepaid-recharge' || option === 'postpaid-recharge') {
      setModalOpen(true);
    }
  };
 
  const handleRecharge = (mobileNumber) => {
    // Handle the recharge process
    console.log(`Recharge initiated for number: ${mobileNumber}`);
    // You can add additional logic for processing the recharge
  };
 
  return (
    <div className="telecom-billing-system">
      <div className="role-selector">
        <div className="flex justify-around border-b border-gray-400">
          {userRoles.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`role-button ${selectedRole === role.id ? 'active' : ''}`}
            >
              <role.icon className="icon" size={20} />
              {role.name}
            </button>
          ))}
        </div>
      </div>
 
      <div className="nav-bar">
        <div className="logo">
          <img src="/telstraLogo1.jpeg" alt="Telstra Logo" className="telstralogo" />
          <span className="logo-text">TeleBillPro</span>
        </div>
        <div className="nav-options">
          {selectedRole === 'customer' && (
            <>

              {/* <div className="dropdown">
                 <button
                  onClick={() => toggleDropdown('prepaid')}
                  className="dropdown-button"
                >
                  Prepaid <ChevronDown className="icon" size={20} />
                </button>
                {openDropdown === 'prepaid' && (
                  <div className="dropdown-content">
                    <button onClick={() =>{ handleDropdownClick('prepaid-plans');
                    
        
                    }
                    }>Prepaid Plans</button>
                    <button onClick={() => handleDropdownClick('prepaid-recharge')}>Recharge</button>
                  </div>
                )}
              </div> 
              <div className="dropdown">
                <button
                  onClick={() => toggleDropdown('postpaid')}
                  className="dropdown-button"
                >
                  Postpaid <ChevronDown className="icon" size={20} />
                </button>
                {openDropdown === 'postpaid' && (
                  <div className="dropdown-content">
                    <button onClick={() => handleDropdownClick('postpaid-plans')}>Postpaid Plans</button>
                    <button onClick={() => handleDropdownClick('postpaid-recharge')}>Bill Payment</button>
                  </div>
                )}
              </div> */}
              <div className="dropdown">
                <button
                  onClick={() => toggleDropdown('account')}
                  className="dropdown-button"
                >
                  Account <ChevronDown className="icon" size={20} />
                </button>
                {openDropdown === 'account' && (
                  <div className="dropdown-content">
                    <Link to="/register">Customer Registration</Link>
                    <Link to="/login">Customer Login</Link>
                  </div>
                )}
              </div>
             
            </>
      
          )}
          {selectedRole === 'supplier' && (
            <>
              
              <div className="dropdown">
                <button
                  onClick={() => toggleDropdown('account')}
                  className="dropdown-button"
                >
                  Account <ChevronDown className="icon" size={20} />
                </button>
                {openDropdown === 'account' && (
                  <div className="dropdown-content">
                    <Link to="/supplierregister">Supplier Register</Link>
                    <Link to="/supplierlogin">Supplier Login</Link>
                  </div>
                )}
              </div>
            </>
          )}
          {selectedRole === 'admin' && (
            <>
              {/* <button className="nav-button">User Management</button>
              <button className="nav-button">System Settings</button> */}
              <div className="dropdown">
                <button
                  onClick={() => toggleDropdown('account')}
                  className="dropdown-button"
                >
                  Account <ChevronDown className="icon" size={20} />
                </button>
                {openDropdown === 'account' && (
                  <div className="dropdown-content">
                    <Link to="/AdminLogin">Admin Login</Link>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

        
      
      <div className="main-content">
          {selectedRole !== 'customer' && selectedRole !== 'supplier' && selectedRole !== 'admin' &&(
            <div className="content">
          
            <ImageCarousel></ImageCarousel>
            <AboutUs></AboutUs>
          </div>
        )} 
         {selectedRole === 'customer' && (
          
          <div className="content">
            <Customer></Customer>
          </div>
        )} 
 
         {selectedRole === 'customer' && selectedDropdownOption === 'prepaid-recharge' && (
          <RechargeForm />
        )}
        {selectedRole === 'customer' && selectedDropdownOption === 'prepaid-plans' && (
          <div className="content">
            <FlashcardsList />
            <h2>Prepaid Plans</h2>
            <p>Browse through various prepaid plans available.</p>
          </div>
        )}
        {selectedRole === 'customer' && selectedDropdownOption === 'postpaid-recharge' && (
          <RechargeForm />
        )}
        {selectedRole === 'customer' && selectedDropdownOption === 'postpaid-plans' && (
          <div className="content">
            <h2>Postpaid Plans</h2>
            <p>Browse through various postpaid plans available.</p>
          </div>
        )}
        {selectedRole === 'customer' && selectedDropdownOption === 'recharge' && (
          <RechargeForm />
        )}
         {selectedRole === 'admin'  && (
          <AdminLogin />
        )}
         {selectedRole === 'supplier'  && (
          <SupplierRegister />
        )}
        {!selectedRole && (
          <div className="content center">
            
          </div>
        )} 
      </div>
 
       <RechargeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onRecharge={handleRecharge}
      /> 
    </div>
  );
};
 
export default TelecomBillingSystem;
 
 
