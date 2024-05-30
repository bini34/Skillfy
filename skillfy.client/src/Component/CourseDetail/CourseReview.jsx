import React from 'react';
import './CourseReview.css';

const CourseReview = () => {
  return (
    <div className="course-review">
      <div className="tabs">
        <button className="tab-button active">Overview</button>
        <button className="tab-button">Curriculum</button>
        <button className="tab-button">Instructor</button>
        <button className="tab-button">Reviews</button>
      </div>
      <div className="content">
        <h2>Course Description</h2>
        <p>
          See-through delicate embroidered organza blue lining luxury acetate-mix stretch pleat detailing.
          Leather detail shoulder constrastic colour contour stunning silhouette working peplum. Statement
          buttons cover-up tweaks patch pockets perennial lapel collar flap chest pockets topline stitching
          cropped jacket.
        </p>
        <h2>Certification</h2>
        <p>
          Effortless comfortable full leather lining eye-catching unique detail to the toe low ‘cut-away’ sides
          clean and sleek. Polished finish elegant court shoe work duty stretchy slingback strap mid kitten
          heel this ladylike design slingback strap mid kitten heel this ladylike design.
        </p>
        <h2>Who this course is for</h2>
        <p>
          Anyone interested in learning about business (only practical concepts that you can use and no
          boring theory + we won’t cover business topics that are common sense).
        </p>
      </div>
    </div>
  );
}

export default CourseReview;
