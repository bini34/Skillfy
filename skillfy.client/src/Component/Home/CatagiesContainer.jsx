import React from 'react';
import './catagiesContainer.css';
import img from '../../assets/image/young2.png'

const categories = [
  { name: 'Design', image: img },
  { name: 'Development', image: img },
  { name: 'IT & Software', image: img },
  { name: 'Business', image: img },
  { name: 'Marketing', image: img },
  { name: 'Photography', image: img },
  { name: 'Health & care', image: img },
  { name: 'Technology', image: img },
];

const TopCategories = () => {
  return (
    <div className="top-categories-container">
      <div className="header">
        <h2>Top categories</h2>
        <button className="see-all-btn">See all Categories</button>
      </div>
      <div className="categories-grid">
        {categories.map((category, index) => (
          <div key={index} className="category-card">
            <img src={category.image} alt={category.name} className="category-image" />
            <p>{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCategories;
