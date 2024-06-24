// import React from 'react'
// import './MyCourseCard.css'

// export default function MyCourseCard() {
//     function sendtocourselearning(){
//         navigator
//     }

//   return (
//     <button onClick={sendtocourselearning} className="course-card-button">
//         <div className="course-card">
//         <img 
//             src={imageUrl}
//             alt={coursename} 
//             className="course-card-image" 
//             onError={handleImageError} 
//         />
//         <div className="course-card-info">
//             <div className="course-card-stats">
//             <span>⭐{rating} ({students})</span>
//             <span>{enrollmentcount}</span>
//             <span>{lessons} lessons</span>
//             </div>
//             <hr />
//             <h3 className="course-card-title">{coursename}</h3>
//             <div className="name-price">
//             <div className="course-card-instructor">
//                 <Avatar alt={teachername} src="/static/images/avatar/1.jpg" />
//                 <p className="course-card-instructor-name">{teachername}</p>
//             </div>
//             <div className="course-card-pricing">
//                 <span className="course-card-price">${price}</span>
//             </div>
//             </div>
//         </div>
//         </div>
//   </button>
//   )
// }

import React from 'react';
import Avatar from '@material-ui/core/Avatar'; // Importing Avatar component from Material-UI
import './MyCourseCard.css';

export default function MyCourseCard({
    imageUrl,
    coursename,
    rating,
    students,
    enrollmentcount,
    lessons,
    teachername,
    price,
    
}) {
    function sendtocourselearning(){
               navigator
        }
    return (
        <button onClick={sendtocourselearning} className="course-card-button">
            <div className="course-card">
                <img
                    src={imageUrl}
                    alt={coursename}
                    className="course-card-image"
                    onError={handleImageError}
                />
                <div className="course-card-info">
                    <div className="course-card-stats">
                        <span>⭐{rating} ({students})</span>
                        <span>{enrollmentcount}</span>
                        <span>{lessons} lessons</span>
                    </div>
                    <hr />
                    <h3 className="course-card-title">{coursename}</h3>
                    <div className="name-price">
                        <div className="course-card-instructor">
                            <Avatar alt={teachername} src="/static/images/avatar/1.jpg" />
                            <p className="course-card-instructor-name">{teachername}</p>
                        </div>
                        <div className="course-card-pricing">
                            <span className="course-card-price">${price}</span>
                        </div>
                    </div>
                </div>
            </div>
        </button>
    );
}
