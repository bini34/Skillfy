import React from 'react'
import './Categories.css'
import bussiness from '../../assets/image/bussiness.jpg'
import designing from '../../assets/image/designing.jpg'
import development from '../../assets/image/development.jpg'
import health from '../../assets/image/health.jpg'
import it from '../../assets/image/it.jpg'
 import marketing from '../../assets/image/marketing.jpg'
import photography from '../../assets/image/photography.jpg'
import technology from '../../assets/image/technology.jpg'

export default function Categories() {
    const categories = [
        { name: 'Design', image: designing },
        { name: 'Development', image: development },
        { name: 'IT & Software', image: it },
        { name: 'Business', image: bussiness },
        { name: 'Marketing', image: marketing },
        { name: 'Photography', image: photography },
        { name: 'Health & care', image: health },
        { name: 'Technology', image: technology },
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
