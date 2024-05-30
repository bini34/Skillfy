import React from 'react'
import './Categories.css'
import img from '../../assets/image/young2.png'

export default function Categories() {
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
  return (
    <div className='categorie-section'>
        <div className='categorie-container'>
            <div className="categorie-header">
                <h1>Top categories</h1>
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
    </div>
  )
}
