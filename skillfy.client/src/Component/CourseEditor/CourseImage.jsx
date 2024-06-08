import React, { useState, useEffect } from 'react';
import { FaPlusCircle, FaEdit } from 'react-icons/fa';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

import './CourseImage.css';

const CourseImage = ({ setCourseImage }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    setCourseImage(image);
  }, [image, setCourseImage]);

  const handleButtonClick = () => {
    setIsUploading(true);
  };

  const handleCancelClick = () => {
    setIsUploading(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setIsUploading(false);
    }
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  return (
    <div className="course-image-container">
      <div className="course-image-title">Course image</div>
      {isUploading ? (
        <div className="uploading-container">
          <div className="upload-placeholder-icon">
            <FaPlusCircle />
          </div>
          <div className="upload-instructions">Choose files or drag and drop</div>
          <div className="upload-size">Image (4MB max)</div>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            className="upload-button"
          >
            Upload file
            <VisuallyHiddenInput type="file" onChange={handleImageChange} />
          </Button>
          <div className="aspect-ratio">16:9 aspect ratio recommended</div>
          <Button
            variant="outlined"
            className="cancel-button"
            onClick={handleCancelClick}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <div className="course-image-box">
          {image ? (
            <img src={URL.createObjectURL(image)} alt="Course" className="course-image" />
          ) : (
            <div className="course-image-placeholder">
              <FaPlusCircle />
            </div>
          )}
        </div>
      )}
      {!isUploading && (
        <button className="add-image-button" onClick={handleButtonClick}>
          {image ? (
            <>
              <FaEdit className="add-image-icon" />
              Edit image
            </>
          ) : (
            <>
              <FaPlusCircle className="add-image-icon" />
              Add an image
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default CourseImage;
