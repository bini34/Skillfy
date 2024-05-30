import React from 'react';
import CartItem from './CartItem';
import './ShoppingCart.css';

const ShoppingCart = () => {
  return (
    <div className="shopping-cart">
      <div className="cart-container">
        <h2 className="cart-title">Shopping Cart</h2>
        <div className="cart-items">
          <CartItem />
          <CartItem />
          <CartItem />
        </div>
        <div className="cart-totals">
          <div className="totals-row">
            <span className="totals-title">Cart totals</span>
            <span className="totals-value">$49.65</span>
          </div>
          <div className="coupon-row">
            <input
              type="text"
              className="coupon-input"
              placeholder="Enter Coupon"
            />
            <button className="apply-button">Apply</button>
          </div>
          <button className="checkout-button">Check Out</button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
