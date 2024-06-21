import React from 'react';
import './CartItem.css';
// import DeleteIcon from '@mui/icons-material/Delete';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import Avatar from '@mui/material/Avatar';

const CartItem = ({ course }) => {
  return (
    <div className="cart-item">
      <img src={course.image} alt={course.title} className="cart-course-image" />
      <div className="course-info">
        <h3>{course.title}</h3>
        <div className="cartCoueseInstructor">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 24, height: 24 }} variant="square" />
        <p> {course.instructor}</p>
        </div>
      </div>
      <div className="course-price">
          <span className="discounted-price">${course.discountedPrice}</span>
      </div>
      <button className="remove-button"><CancelPresentationIcon/></button>
    </div>
  );
};

export default CartItem;
