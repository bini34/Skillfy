import React from 'react'
import './Categories.css'
import img from '../../assets/image/bussiness.jpg'
// import design from '../../assets/image/design.jpg'
// import development from '../../assets/image/development.jpg'
// import health from '../../assets/image/health.jpg'
// import it from '../../assets/image/it.jpg'
// import marketing from '../../assets/image/marketing.jpg'
// import photography from '../../assets/image/photography.jpg'
// import technology from '../../assets/image/technology.jpg'

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
