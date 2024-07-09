import React, { useState } from 'react';
import './MainContent.css';
import MuxPlayer from '@mux/mux-player-react';
import CourseReviews from '../CourseDetail/CourseReviews';
import RatingForm from './RatingForm'; // Make sure to import the RatingForm component

const MainContent = ({ CurrentLessonData }) => {
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [formShown, setFormShown] = useState(false);

  const handleRateButtonClick = () => {
    if (!formShown) {
      setShowRatingForm(true);
      setFormShown(true);
    }
  };

  return (
    <div className="main-content">
      <div className="video-section-header">
        <div className="video-section-header-lessontitle">
          <h1>{CurrentLessonData.lessonTitle}</h1>
        </div>
        <div className="button">
          <button onClick={handleRateButtonClick}>Rate This Lesson</button>
          <button>Next Lesson</button>
        </div>
      </div>
      <div className="video-section-main">
        <MuxPlayer
          playbackId={CurrentLessonData.lessonUrl}
          metadata={{
            video_id: 'video-id-54321',
            video_title: 'Test video title',
            viewer_user_id: 'user-id-007',
          }}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="courseview-details">
        <div className="course-detailS-overview">
          <section className="course-description_container">
            <h1>Course Description</h1>
            <p>
              See-through delicate embroidered organza blue lining luxury acetate-mix stretch pleat detailing. Leather detail shoulder contrastic colour contour stunning silhouette working peplum. Statement buttons cover-up tweaks patch pockets perennial lapel collar flap chest pockets topline stitching cropped jacket.
            </p>
          </section>
        </div>
        <div className="course-detailS-reviews">
          <CourseReviews />
        </div>
      </div>
      {showRatingForm && (
        <div className="rating-form-modal">
          <RatingForm />
          <button className="close-button" onClick={() => setShowRatingForm(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default MainContent;
