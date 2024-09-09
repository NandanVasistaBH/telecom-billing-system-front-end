import React from 'react';
import image1 from './images/image1.jpg';
import image2 from './images/image2.jpg';
import maheshbabu from './images/maheshbabu.jpg';
import arjun from './images/arjun.png';

export default function ThreeGrid() {
  return (
    <div style={{ minHeight: '80vh', backgroundColor: 'beige', color: 'black', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '1200px', width: '100%' }}>
        {/* Title for the component */}
        <h2 style={{ textAlign: 'center', marginBottom: '30px' ,marginTop: '20px' }}>Our Customer Experience</h2>
        
        {/* Flexbox for centering cards */}
        <div className="row d-flex justify-content-center" style={{ gap: '10px' }}>
          <div className="col-sm-auto">
            <div className="card" style={{ width: '24rem', backgroundColor: 'white', color: 'black' }}>
              <img className="card-img-top" src={maheshbabu} alt="Card image cap" />
              <div className="card-body">
                <p className="card-text">
                  The service plans are flexible and competitively priced, making it easy to find one that fits my needs perfectly. The app is incredibly user-friendly, and managing my account has never been easier. It's impressive how quickly TelebillPro has built such a reliable and customer-focused service.
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-auto">
            <div className="card" style={{ width: '24rem', backgroundColor: 'white', color: 'black' }}>
              <img className="card-img-top" src={arjun} alt="Card image cap" />
              <div className="card-body">
                <p className="card-text">
                  Switching to TelebillPro has been one of the best decisions I've made for my communication needs. What sets TelebillPro apart is its transparent billing and wide range of plans tailored to different usage patterns. The app’s intuitive design allows for easy navigation. Highly recommended !!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
