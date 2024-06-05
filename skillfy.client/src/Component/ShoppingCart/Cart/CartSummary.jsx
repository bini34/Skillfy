import React from 'react';
import './CartSummary.css';

const CartSummary = ({ total }) => {
  return (
    <div className="cart-summary">
      <h3>Cart totals</h3>
      <div className="total-price">
        <span className="discounted-total">${total}</span>
      </div>
      <button className="checkout-button">Check Out</button>
 
    </div>
  );
};

export default CartSummary;
