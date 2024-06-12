// import React, { useState } from 'react';
// import TextField from '@mui/material/TextField';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import EditIcon from '@mui/icons-material/Edit';

// const CourseChapter = () => {
//     const [isEditingTitle, setIsEditingTitle] = useState(false);
//     const [tempTitle, setTempTitle] = useState('');
//     const [title, setTitle] = useState('Chapter Title');
//     const [isEditingDescription, setIsEditingDescription] = useState(false);
//     const [tempDescription, setTempDescription] = useState('');
//     const [description, setDescription] = useState('Chapter Description');
//     const [value, setValue] = useState('');

//     const handleTitleEdit = () => {
//         if (isEditingTitle) {
//             setTitle(tempTitle);
//         }
//         setIsEditingTitle(!isEditingTitle);
//     };

//     const cancelTitleEdit = () => {
//         setTempTitle(title);
//         setIsEditingTitle(false);
//     };

//     const handleDescriptionEdit = () => {
//         if (isEditingDescription) {
//             setDescription(tempDescription);
//         }
//         setIsEditingDescription(!isEditingDescription);
//     };

//     const cancelDescriptionEdit = () => {
//         setTempDescription(description);
//         setIsEditingDescription(false);
//     };

//     return (
//         <div className='courseChapter'>
//             <div className='chapter-title'>
//                 <h3>Chapter Title</h3>
//                 {isEditingTitle ? (
//                     <>
//                         <TextField
//                             id="standard-basic"
//                             label="Standard"
//                             variant="standard"
//                             value={tempTitle}
//                             onChange={(e) => setTempTitle(e.target.value)}
//                         />
//                         <div>
//                             <button onClick={handleTitleEdit}>Save</button>
//                             <button onClick={cancelTitleEdit}>Cancel</button>
//                         </div>
//                     </>
//                 ) : (
//                     <div className="view-section">
//                         <p>{title}</p>
//                         <button className="edit-btn" onClick={handleTitleEdit}><EditIcon fontSize="small"/>Edit</button>
//                     </div>
//                 )}
//             </div>

//             <div className='chapter-discription'>
//                 <h3>Chapter Description</h3>
//                 {isEditingDescription ? (
//                     <>
//                         <ReactQuill value={value} onChange={setValue} />
//                         <div>
//                             <button onClick={handleDescriptionEdit}>Save</button>
//                             <button onClick={cancelDescriptionEdit}>Cancel</button>
//                         </div>
//                     </>
//                 ) : (
//                     <div className="view-section">
//                         <p>{description}</p>
//                         <button className="edit-btn" onClick={handleDescriptionEdit}><EditIcon fontSize="small"/>Edit</button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default CourseChapter;

import React, { useState, useEffect } from 'react';
import './CourseChapter.css';
import EditIcon from '@mui/icons-material/Edit';
import ReactQuill from 'react-quill';

const CourseChapter = () => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [title, setTitle] = useState('Advanced Web Development');
  const [description, setDescription] = useState('This is a course about development');
  const [tempTitle, setTempTitle] = useState(title);
  const [tempDescription, setTempDescription] = useState(description);

//   useEffect(() => {
//     setCourseDetails({ title, description });
//   }, [title, description, setCourseDetails]);

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
        <h1>Chapter Detail</h1>
      <div className="edit-section">
        <h3>Chapter Title</h3>
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
        <h3>Chapter Description</h3>
        {isEditingDescription ? (
          <>
            <ReactQuill value={tempDescription} onChange={(e) => setTempDescription(e.target.value)} />

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

export default CourseChapter;
