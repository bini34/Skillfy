import { useState } from 'react';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './RatingForm.css';

const RatingForm = ({ onClose, courseId }) => {
  const [rating, setRating] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!rating) return;
    setLoading(true);
    try {
      await fetch(`https://localhost:7182/api/course/rating`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ courseId, rating, comment: feedback }),
      });
      if (onClose) onClose();
    } catch {
      // silently close on error for now
      if (onClose) onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rating-form">
      <Typography variant="h5" component="h2">
        Why did you leave this rating?
      </Typography>
      <Typography variant="body1" className="rating-text">
        Amazing, above expectations!
      </Typography>
      <Rating
        name="course-rating"
        value={rating}
        onChange={(_, newValue) => setRating(newValue)}
        className="stars"
      />
      <TextField
        className="feedback-text"
        variant="outlined"
        multiline
        rows={4}
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Tell us about your own personal experience taking this course. Was it a good match for you?"
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        className="save-button"
        onClick={handleSave}
        disabled={loading || !rating}
      >
        {loading ? 'Saving...' : 'Save and Continue'}
      </Button>
    </div>
  );
};

export default RatingForm;
