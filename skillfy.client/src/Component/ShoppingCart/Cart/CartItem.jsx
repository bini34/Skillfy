import React from 'react';
import './CartItem.css';
import DeleteIcon from '@mui/icons-material/Delete';

const CartItem = ({ course }) => {
  return (
    <div className="cart-item">
      <img src={course.image} alt={course.title} className="course-image" />
      <div className="course-info">
        <h3>{course.title}</h3>
        <p>by {course.instructor}</p>
        <div className="course-price">
          <span className="discounted-price">${course.discountedPrice}</span>
        </div>
      </div>
      <button className="remove-button"><DeleteIcon/></button>
    </div>
  );
};

export default CartItem;
