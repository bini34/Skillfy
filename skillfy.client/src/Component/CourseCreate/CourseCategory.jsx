import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';

export default function CourseCategory({ handleDetailChange, courseDetailsfromlesson }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const StyledAutocomplete = styled(Autocomplete)({
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'black',
    },
    '& .MuiOutlinedInput-root:hover .MuiAutocomplete-input': {
      color: 'white',
    },
  });

  useEffect(() => {
    axios.get("https://localhost:7182/api/catagory/allnames")
      .then(response => {
        if (response.data && Array.isArray(response.data.$values)) {
          setCategories(response.data.$values.map((category, index) => ({ label: category, index })));
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
    if (courseDetailsfromlesson && courseDetailsfromlesson.category != null) {
      const categoryIndex = courseDetailsfromlesson.category - 1;
      const category = categories.find(cat => cat.index === categoryIndex);
      if (category) {
        setSelectedCategory(category);
      }
    }
  }, [courseDetailsfromlesson, categories]);

  useEffect(() => {
    if (selectedCategory) {
      handleDetailChange('category', selectedCategory.label);
    }
  }, [selectedCategory, handleDetailChange]);

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={categories}
      getOptionLabel={(option) => `${option.label}`}
      value={selectedCategory}
      onChange={(event, newValue) => setSelectedCategory(newValue)}
      renderInput={(params) => <TextField {...params} placeholder="Select a category" />}
    />
  );
}
