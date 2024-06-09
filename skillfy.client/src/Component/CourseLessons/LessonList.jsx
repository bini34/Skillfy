import React from 'react';

function LessonList({ lessons }) {
  return (
    <div className='courselesson-list'>
      {lessons.length === 0 ? (
        <p>No lessons added yet.</p>
      ) : (
        <ul>
          {lessons.map((lesson, index) => (
            <li key={index}>
              <h3>{lesson.title}</h3>
              <a href={lesson.video} target="_blank" rel="noopener noreferrer">
                Watch Video
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LessonList;
