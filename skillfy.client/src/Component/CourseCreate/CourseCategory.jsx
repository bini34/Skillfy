
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';

export default function CourseCategory({ handleDetailChange }) {
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
      handleDetailChange('category', selectedCategory.label);
    }
  }, [selectedCategory, handleDetailChange]);

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={categories}
      onChange={(event, newValue) => setSelectedCategory(newValue)}
      renderInput={(params) => <TextField {...params} placeholder="Select a category" />}
    />
  );
}
