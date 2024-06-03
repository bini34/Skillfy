import React from 'react';
import './CartItem.css';

const CartItem = ({ course }) => {
  return (
    <div className="cart-item">
      <img src={course.image} alt={course.title} className="course-image" />
      <div className="course-info">
        <h2>{course.title}</h2>
        <p>by {course.instructor}</p>
        <div className="course-price">
          <span className="discounted-price">${course.discountedPrice}</span>
          <span className="original-price">${course.originalPrice}</span>
          <span className="discount">50% OFF</span>
        </div>
      </div>
      <button className="remove-button">❌</button>
    </div>
  );
};

export default CartItem;
