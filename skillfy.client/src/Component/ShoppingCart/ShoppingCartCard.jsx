// src/ShoppingCartCard.js
import React from 'react';
import './ShoppingCartCard.css';

const ShoppingCartCard = () => {
  return (
    <div className="shopping-cart-card">
      <div className="card-content">
        <img 
          src="https://via.placeholder.com/150" 
          alt="Course Thumbnail" 
          className="thumbnail"
        />
        <div className="details">
          <h3>Statistics Data Science and Business Analysis</h3>
          <p className="author">Nicole Brown</p>
          <div className="pricing">
            <span className="price">$49.65</span>
            <span className="discount">$99.30 - 50% Off</span>
          </div>
        </div>
        <button className="delete-button">&times;</button>
      </div>
    </div>
  );
}

export default ShoppingCartCard;
