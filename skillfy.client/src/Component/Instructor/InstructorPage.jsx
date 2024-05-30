import React from 'react';
import './InstructorPage.css';

const courses = [
  { title: 'Cinematic Techniques', price: '$93.00', status: 'Published' },
  { title: 'Introduction to Filming', price: '$85.00', status: 'Published' },
  { title: 'Structural Design Principles', price: '$48.00', status: 'Published' },
  { title: 'Engineering Basics', price: '$49.00', status: 'Published' },
  { title: 'Tax Accounting Basics', price: '$88.00', status: 'Published' },
  { title: 'Financial Reporting', price: '$92.00', status: 'Published' },
  { title: 'Nature Photography Basics', price: '$53.00', status: 'Published' },
  { title: 'Capturing the Moment', price: '$96.00', status: 'Published' },
];

const InstructorPage = () => {
  return (
    <div className="instructor-page">
      <aside className="sidebar">
        <div className="logo">Logoipsum</div>
        <nav>
          <ul>
            <li className="active">Courses</li>
            <li>Analytics</li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <header className="header">
          <div className="search-bar">
            <input type="text" placeholder="Filter courses..." />
          </div>
          <button className="new-course-button">New course</button>
        </header>
        <table className="courses-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index}>
                <td>{course.title}</td>
                <td>{course.price}</td>
                <td>
                  <span className="status-label">{course.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default InstructorPage;
