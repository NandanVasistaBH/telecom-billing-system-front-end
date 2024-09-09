import React from 'react';
import { Earth, BookText, Rss} from 'lucide-react';
import './TeleBillProFeatures.css';


const TeleBillProFeatures = () => {
  return (
    <section className="j-container">
      <h1>Here's why India prefers TeleBillPro</h1>
      <div className="features-container">
        <div className="feature">
          <Earth size={48} color='Blue'/>
          <h3>Fast Internet</h3>
          <p>Experience the internet at lightning speed with no latency.</p>
        </div>
        <div className="feature">
          <BookText size={48} color='Blue'/>
          <h3>Plans for All</h3>
          <p>Explore plans with unlimited voice calls, data, SMS, and a host of benefits.</p>
        </div>
        <div className="feature">
          <Rss size={48}color='Blue' />
          <h3>PAN India Coverage</h3>
          <p>Enjoy HD-quality voice calls and faster data speeds anywhere in India.</p>
        </div>
      </div>
    </section>
  );
};

export default TeleBillProFeatures;