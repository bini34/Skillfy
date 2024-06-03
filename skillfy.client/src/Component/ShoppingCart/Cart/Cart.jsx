import React from 'react';
import './Cart.css';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

const courses = [
  {
    title: 'Statistics Data Science and Business Analysis',
    instructor: 'Nicole Brown',
    discountedPrice: '49.65',
    originalPrice: '99.99',
    image: 'https://via.placeholder.com/80' // Replace with actual image URL
  },
  {
    title: 'Statistics Data Science and Business Analysis',
    instructor: 'Nicole Brown',
    discountedPrice: '49.65',
    originalPrice: '99.99',
    image: 'https://via.placeholder.com/80' // Replace with actual image URL
  },
  {
    title: 'Statistics Data Science and Business Analysis',
    instructor: 'Nicole Brown',
    discountedPrice: '49.65',
    originalPrice: '99.99',
    image: 'https://via.placeholder.com/80' // Replace with actual image URL
  }
];

const Cart = () => {
  const total = courses.reduce((acc, course) => acc + parseFloat(course.discountedPrice), 0).toFixed(2);

  return (
    <div className="App">
      <h1>Shopping Cart</h1>
      <div className="cart-container">
        <div className="cart-items">
          {courses.map((course, index) => (
            <CartItem key={index} course={course} />
          ))}
        </div>
        <CartSummary total={total} />
      </div>
    </div>
  );
};

export default Cart;
