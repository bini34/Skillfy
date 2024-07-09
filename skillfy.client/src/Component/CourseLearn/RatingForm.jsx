import React from 'react';
import { Button, Typography, TextField } from '@mui/material';
import Rating from '@mui/material/Rating';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './RatingForm.css';

const RatingForm = () => {
  return (
    <div className="rating-form">
      <Button startIcon={<ArrowBackIcon />} className="back-button">
        Back
      </Button>
      <Typography variant="h5" component="h2">
        Why did you leave this rating?
      </Typography>
      <Typography variant="body1" className="rating-text">
        Amazing, above expectations!
      </Typography>
      <Rating name="no-value" value={null} className="stars" />
      <TextField
        className="feedback-text"
        variant="outlined"
        multiline
        rows={4}
        placeholder="Tell us about your own personal experience taking this course. Was it a good match for you?"
        fullWidth
      />
      <Button variant="contained" color="primary" className="save-button">
        Save and Continue
      </Button>
    </div>
  );
};

export default RatingForm;
