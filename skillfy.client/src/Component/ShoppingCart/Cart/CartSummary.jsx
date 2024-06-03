import React from 'react';
import './CartSummary.css';

const CartSummary = ({ total }) => {
  return (
    <div className="cart-summary">
      <h3>Cart totals</h3>
      <div className="total-price">
        <span className="original-total">$149.97</span>
        <span className="discounted-total">${total}</span>
        <span className="discount">50% OFF</span>
      </div>
      <button className="checkout-button">Check Out</button>
      <div className="coupon">
        <input type="text" placeholder="Enter Coupon" />
        <button className="apply-button">Apply</button>
      </div>
    </div>
  );
};

export default CartSummary;
