import React from 'react';
import './Flashcard.css';
 
const Flashcard = ({ title, validity, data, amount, onRecharge }) => {
  return (
    <div className="flashcard">
      <div className="flashcard-header">
        <h3 className="flashcard-title">{title}</h3>
      </div>
      <div className="flashcard-body">
        <p className="flashcard-detail">Validity: <span className="flashcard-value">{validity}</span></p>
        <p className="flashcard-detail">Data: <span className="flashcard-value">{data}</span></p>
        <p className="flashcard-detail">Amount: <span className="flashcard-value">{amount}</span></p>
      </div>
      <button className="recharge-button" onClick={onRecharge}>Recharge</button>
    </div>
  );
};
 
export default Flashcard;