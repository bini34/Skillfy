import React from 'react'
import Header from '../Component/Header/Header';
import Footer from '../Component/Footer/Footer';
import CartItem from '../Component/ShoppingCart/Cart/CartItem';
import CartSummary from '../Component/ShoppingCart/Cart/CartSummary';
import './CartPage.css'


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

export default function Cart() {
    const total = courses.reduce((acc, course) => acc + parseFloat(course.discountedPrice), 0).toFixed(2);

  return (
    <>
    <Header color={"black"}/>
    <div className="ShopingCartMainContainer">
      <div className="ShopingCartContainer">
        <div className='cart-container-header'>
        <h1>Shopping Cart</h1>
        </div>
        <div className="cart-container">
          <div className="cart-items">
            {courses.map((course, index) => (
              <CartItem key={index} course={course} />
            ))}
          </div>
          <CartSummary total={total} />
        </div>
      </div>
    </div>
 
    <Footer/>
    </>
  )
}
