import React, { useState, useEffect } from 'react';
import './CourseDetails.css';
import EditIcon from '@mui/icons-material/Edit';

const CourseDetails = ({ setCourseDetails }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [title, setTitle] = useState('Advanced Web Development');
  const [description, setDescription] = useState('This is a course about development');
  const [tempTitle, setTempTitle] = useState(title);
  const [tempDescription, setTempDescription] = useState(description);

  useEffect(() => {
    setCourseDetails({ title, description });
  }, [title, description, setCourseDetails]);

  const handleTitleEdit = () => {
    if (isEditingTitle) {
      setTitle(tempTitle);
    }
    setIsEditingTitle(!isEditingTitle);
  };

  const handleDescriptionEdit = () => {
    if (isEditingDescription) {
      setDescription(tempDescription);
    }
    setIsEditingDescription(!isEditingDescription);
  };

  const cancelTitleEdit = () => {
    setTempTitle(title);
    setIsEditingTitle(false);
  };

  const cancelDescriptionEdit = () => {
    setTempDescription(description);
    setIsEditingDescription(false);
  };

  return (
    <div className="course-details">
      <div className="edit-section">
        <h3>Course title</h3>
        {isEditingTitle ? (
          <>
            <input
              type="text"
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
            />
            <div>
              <button onClick={handleTitleEdit}>Save</button>
              <button onClick={cancelTitleEdit}>Cancel</button>
            </div>
          </>
        ) : (
          <div className="view-section">
            <p>{title}</p>
            <button className="edit-btn" onClick={handleTitleEdit}><EditIcon fontSize="small"/>Edit</button>
          </div>
        )}
      </div>
      <div className="edit-section">
        <h3>Course description</h3>
        {isEditingDescription ? (
          <>
            <textarea
              value={tempDescription}
              onChange={(e) => setTempDescription(e.target.value)}
            />
            <div>
              <button onClick={handleDescriptionEdit}>Save</button>
              <button onClick={cancelDescriptionEdit}>Cancel</button>
            </div>
          </>
        ) : (
          <div className="view-section">
            <p>{description}</p>
            <button className="edit-btn" onClick={handleDescriptionEdit}><EditIcon fontSize="small"/>Edit</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
