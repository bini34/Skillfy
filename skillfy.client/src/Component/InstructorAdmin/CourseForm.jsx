import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';


const categories = [
  { value: 'programming', label: 'Programming' },
  { value: 'design', label: 'Design' },
  { value: 'business', label: 'Business' },
  // Add more categories as needed
];

function CourseForm() {
  const [courseInfo, setCourseInfo] = useState({
    title: '',
    description: '',
    image: '',
    category: '',
    chapters: [],
    price: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCourseInfo({ ...courseInfo, [name]: value });
  };

  const handleAddChapter = () => {
    // Logic to add a new chapter to the chapters array
    const newChapter = {}; // Initialize with default chapter values
    setCourseInfo({ ...courseInfo, chapters: [...courseInfo.chapters, newChapter] });
  };

  return (
    <div className='courseForm'>
        <div>
            <h1>courseTitle</h1>
            <TextField
            name="title"
            label="Course Title"
            value={courseInfo.title}
            onChange={handleInputChange}
            fullWidth
        />
        </div>

      <TextField
        name="description"
        label="Course Description"
        value={courseInfo.description}
        onChange={handleInputChange}
        fullWidth
      />
      <TextField
        name="image"
        label="Course Image URL"
        value={courseInfo.image}
        onChange={handleInputChange}
        fullWidth
      />
      <TextField
        name="category"
        label="Course Category"
        select
        value={courseInfo.category}
        onChange={handleInputChange}
        fullWidth
      >
        {categories.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <Button variant="contained" color="primary" onClick={handleAddChapter}>
        Add Chapter
      </Button>
      <TextField
        name="price"
        label="Course Price"
        value={courseInfo.price}
        onChange={handleInputChange}
        fullWidth
      />
    </div>
  );
}

export default CourseForm;
