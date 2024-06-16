import React, { useState, useEffect } from 'react';
import { FaPlusCircle, FaEdit } from 'react-icons/fa';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import './CourseImage.css';

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

const CourseImage = ({ handleDetailChange }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [image, setImage] = useState(null);
  const [backgroundImage, setBackgroundimage] =  useState(null)

  useEffect(() => {
    handleDetailChange('image', image);
  }, [image, handleDetailChange]);

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
      setBackgroundimage(URL.createObjectURL(file))
      setIsUploading(false);
    }
  };

  return (
    <div className="course-image-container">
      <div className="course-image-header">
        <h3>Course image</h3>
        {isUploading ? (
          <Button
            variant="outlined"
            className="cancel-button"
            onClick={handleCancelClick}
            style={{ color: 'red', borderColor: 'white' }}
          >
            Cancel
          </Button>
        ) : (
          <button
            className="add-image-button"
            onClick={handleButtonClick}
            style={{ color: 'black', borderColor: 'white' }}
          >
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

      {isUploading ? (
        <div className="uploading-container">
          <div className="upload-placeholder-icon">
            <FaPlusCircle />
          </div>
          <label className="upload-instructions" htmlFor="file-upload">
            Choose files or drag and drop
            <VisuallyHiddenInput
              id="file-upload"
              type="file"
              onChange={handleImageChange}
            />
          </label>
          <div className="upload-size">Image (4MB max)</div>
          <div className="aspect-ratio">16:9 aspect ratio recommended</div>
        </div>
      ) : (
        <div
          className={`course-image-box ${
            image ? 'course-image-background' : ''
          }`}
          style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none' }}
        >
          {!image && (
            <div className="course-image-placeholder">
              <FaPlusCircle />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseImage;
