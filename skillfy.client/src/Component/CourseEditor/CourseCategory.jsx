import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function CourseCategory({ setCourseCategory }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    axios.get("https://localhost:7182/api/catagory/allnames")
      .then(response => {
        if (response.data && Array.isArray(response.data.$values)) {
          setCategories(response.data.$values.map(category => ({ label: category })));
        } else {
          console.error('Response data does not contain an array in $values:', response.data);
          throw new Error('Expected an array in $values but got a different type');
        }
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setCourseCategory(selectedCategory.label);
    }
  }, [selectedCategory, setCourseCategory]);

  return (
    <div>
      <div className="CourseCategory-header">
        <h1>Course Category</h1>
      </div>
      <div>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={categories}
          sx={{ width: 300 }}
          onChange={(event, newValue) => setSelectedCategory(newValue)}
          renderInput={(params) => <TextField {...params} label="Category" />}
        />
      </div>
    </div>
  );
}
