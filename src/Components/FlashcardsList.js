// src/Components/FlashcardsList.js
import React from 'react';
import './FlashcardsList.css'; // Ensure this CSS file is linked
 
const flashcards = [
  { id: 1, title: 'Plan 1', data: '1GB/day', validity: '28 days' },
  { id: 2, title: 'Plan 2', data: '2GB/day', validity: '84 days' },
  { id: 3, title: 'Plan 3', data: '1.5GB/day', validity: '52 days' },
  { id: 4, title: 'Plan 4', data: '1GB/day', validity: '30 days' },
  { id: 5, title: 'Plan 5', data: '2.5GB/day', validity: '90 days' },
  { id: 6, title: 'Plan 6', data: '3GB/day', validity: '60 days' },
  { id: 7, title: 'Plan 7', data: '2GB/day', validity: '45 days' },
  { id: 8, title: 'Plan 8', data: '1.2GB/day', validity: '35 days' },
];
 
const FlashcardsList = () => {
  const handleRecharge = (id) => {
    // Handle the recharge action here
    console.log("Recharge clicked for plan id: ${id}");
    // Show modal or prompt user for mobile number
  };
 
  return (
    <div className="flashcards-list">
      {flashcards.map((card) => (
        <div key={card.id} className="flashcard">
          <h3 className="card-title">{card.title}</h3>
          <p className="card-data">Data: {card.data}</p>
          <p className="card-details">Validity: {card.validity}</p>
          <button className="recharge-button" onClick={() => handleRecharge(card.id)}>
            Recharge
          </button>
        </div>
      ))}
    </div>
  );
};
 
export default FlashcardsList;