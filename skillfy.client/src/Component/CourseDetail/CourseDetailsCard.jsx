import React, {useState} from 'react';
import './CourseDetailsCard.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import authService from '../../Services/authService';

const CourseDetailsCard = ({ courseId, price }) => {
  const [checkout_url, setcheckout_url] = useState('');
  const user = authService.getCurrentUser();
  console.log('User:', user)
  const navigate = useNavigate();

  const sendToCart = () => {
    navigate('/cart');
  };

  const buyNow = async () => {
    console.log('Buy now clicked', user.id, courseId, price);
    try {
      const response = await axios.post('https://localhost:7182/api/payment/Initialize', {
        courseId: courseId,
        userId: user.id,  // Assuming the user object has an id property
        price: price
      });
      console.log("checkout url from response",response.data.data.data.checkout_url)
      //  setcheckout_url(response.data.data.data.checkout_url);
       console.log("checkouturl",checkout_url)
      // if(checkout_url)
      //  {
        //  window.location.href = response.data.data.data.checkout_url;
      // }
    } catch (error) {
      console.error('Error sending buy course data:', error);
    }
  };
  const sendcheckouturl = () =>{
    if(checkout_url)
      {
        
      }
      else{
        console.log("checkout url null")
      }

  }

  return (
    <div className="course-details-card">
      <div className="price-section">
        <span className="current-price">${price}</span>
    
        <button onClick={sendToCart} className="AddtoCart-now-button">Add to Cart</button>

        <button onClick={buyNow} className="buy-now-button">Buy Now</button>
      </div>
      <div className="course-includes">
        <h3>This course includes</h3>
        <ul>
          <li><span role="img" aria-label="book">📚</span> Language - English</li>
          <li><span role="img" aria-label="computer">💻</span> Use on desktop, tablet & mobile</li>
          <li><span role="img" aria-label="infinity">♾️</span> Full lifetime access</li>
          <li><span role="img" aria-label="certificate">📜</span> Certificate of Completion</li>
        </ul>
      </div>
      <div className="team-access">
        <p>Training 5 or more people?</p>
        <p>Get your team access to 3,500+ top courses anytime, <a href="#">Contact our sale</a></p>
      </div>
      <div className="share-course">
        <p>Share this course</p>
        <div className="social-icons">
          <span role="img" aria-label="facebook">📘</span>
          <span role="img" aria-label="instagram">📸</span>
          <span role="img" aria-label="whatsapp">📲</span>
          <span role="img" aria-label="twitter">🐦</span>
          <span role="img" aria-label="linkedin">🔗</span>
          <span role="img" aria-label="youtube">▶️</span>
          <span role="img" aria-label="reddit">👽</span>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsCard;
