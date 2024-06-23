import React from 'react';
import './MainContent.css'
import MuxPlayer from "@mux/mux-player-react"; 
import CourseOverview from '../CourseDetail/CourseOverview';
import CourseReviews from '../CourseDetail/CourseReviews';

const MainContent = () => {
  return (
    <div className="main-content">
      <div className="video-section-header">
        <div className="video-section-header-lessontitle">
          <h1>Introduction about xd</h1>
          <p>30 Min</p>
        </div>
        <div className="button">
          <button>Next Lesson</button>
        </div>
      </div>
      <div className="video-section-main">
        <MuxPlayer
          playbackId="fqOgC00yLXZ3qg5K5MMV5vHUpLDxUNmX1GaA9dcXlznU"
          metadata={{
            video_id: "video-id-54321",
            video_title: "Test video title",
            viewer_user_id: "user-id-007",
          }}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="courseview-details">
        <div className="course-detailS-overview">
            <section className="course-description_container">
                <h1>Course Description</h1>
                <p>See-through delicate embroidered organza blue lining luxury acetate-mix stretch pleat detailing. Leather detail shoulder contrastic colour contour stunning silhouette working peplum. Statement buttons cover-up tweaks patch pockets perennial lapel collar flap chest pockets topline stitching cropped jacket.</p>
            </section>
            <section className="target-audience">
                <h1>Who this course is for</h1>
                <p>Anyone interested in learning about business (only practical concepts that you can use and no boring theory + we won’t cover business topics that are common sense.</p>
            </section>
            <section className="certification_container">
                <h1>Certification</h1>
                <p>Effortless comfortable full leather lining eye-catching unique detail to the toe low ‘cut-away’ sides clean and sleek. Polished finish elegant court shoe work duty stretchy slingback strap mid kitten heel this ladylike design slingback strap mid kitten heel this ladylike design.</p>
            </section>
        </div>
        <div className="course-detailS-reviews">
        <CourseReviews/>
        </div>
      </div>


    </div>
  );
};

export default MainContent;
