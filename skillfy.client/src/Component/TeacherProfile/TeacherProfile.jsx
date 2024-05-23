import React from 'react';
import './TeacherProfile.css';

const TeacherProfile = () => {
  return (
    <div className="teacher-profile">
      <header className="header">
        <nav className="breadcrumb">
          <a href="/">Home</a> / <a href="/teachers">Teachers</a> / <span>Teacher Profile</span>
        </nav>
        <div className="profile-header">
          <div className="profile-picture">
            <img src="https://via.placeholder.com/100" alt="Profile" />
          </div>
          <div className="profile-details">
            <h2>Paul Walker <span className="badge">Top Teacher</span></h2>
            <p>Creative coder & designer</p>
            <div className="profile-stats">
              <span>3,874 Followers</span>
              <span>22 Following</span>
              <span>4.7 Rating</span>
            </div>
          </div>
          <button className="enroll-button">Enroll Now</button>
        </div>
      </header>

      <div className="profile-content">
        <aside className="sidebar">
          <ul className="tabs">
            <li className="active">About</li>
            <li>Course</li>
            <li>Notes</li>
            <li>Project</li>
            <li>Podcast</li>
            <li>Book</li>
            <li>Review</li>
          </ul>
          <div className="teacher-info">
            <h3>Teacher info</h3>
            <p><strong>Skill Set:</strong> I love sharing my knowledge and experience...</p>
            <p><strong>Exp.:</strong> Thammasat 2018 - Present</p>
            <p><strong>Education:</strong> Kanpur university 2002 - 2004</p>
            <p><strong>Awards:</strong> <span role="img" aria-label="awards">🏆🏅</span></p>
            <p><strong>Other:</strong> Coach and mentor...</p>
            <div className="social-links">
              <button className="social-button">Facebook</button>
              <button className="social-button">LinkedIn</button>
              <button className="social-button">Twitter</button>
            </div>
          </div>
        </aside>

        <main className="details">
          <section>
            <h3>About Paul Walker</h3>
            <p>Effortless comfortable full leather lining eye-catching...</p>
          </section>
          <section>
            <h3>Adobe Certified Instructor & Adobe Certified Expert</h3>
            <p>Effortless comfortable full leather lining eye-catching...</p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default TeacherProfile;
