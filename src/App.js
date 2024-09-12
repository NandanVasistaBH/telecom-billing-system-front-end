import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TelecomBillingSystem from './Components/TelecomBillingSystem';
import CustomerLogin from './pages/CustomerLogin';
import ForgotPassword from './Components/ForgotPassword';
import Register from './pages/Register';
import FlashcardsList from './Components/FlashcardsList';
import RechargeForm from './pages/RechargeForm';
import 'bootstrap/dist/css/bootstrap.min.css';

import CustomerDashboard from './pages/CustomerDashboard';
import SubscriptionPage from './pages/SubscriptionPage';
import PaymentMethodPage from './pages/PaymentMethodPage';
import PrepaidRecharge from './pages/PrepaidRecharge';
import PostpaidRecharge from './pages/PostpaidRecharge';
import ContactUs from './Components/ContactUs';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import SupplierRegister from './pages/SupplierRegister';
import SupplierLogin from './pages/SupplierLogin';
import SupplierDashboard from './pages/SupplierDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <TelecomBillingSystem />
                {/* <ImageCarousel></ImageCarousel> */}
              </>
            }
          />
          <Route path="/login" element={<CustomerLogin />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recharge" element={<RechargeForm />} />
          <Route path="/flashcards" element={<FlashcardsList />} />{" "}
          <Route path="/CustomerDashboard" element={<CustomerDashboard />} />
          <Route path="/subscriptionpage" element={<SubscriptionPage />} />
          <Route path="/payment" element={<PaymentMethodPage />} />
          <Route path="/prepaid" element={<PrepaidRecharge />} />
          <Route path="/postpaid" element={<PostpaidRecharge />} />
          <Route path="/contactus" element={<ContactUs/>} />
          <Route path="/adminlogin" element={<AdminLogin/>}/>
          <Route path="/admindashboard" element={<AdminDashboard/>}/>
          <Route path="/supplierregister" element={<SupplierRegister/>}/>
          <Route path="/supplierlogin" element={<SupplierLogin/>}/>
          <Route path="/supplierdashboard" element ={<SupplierDashboard/>}/>
        </Routes>
      </div>
    </Router>
  );
}
 
export default App;
