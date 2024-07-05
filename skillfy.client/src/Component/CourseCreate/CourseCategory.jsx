import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';

export default function CourseCategory({ handleDetailChange }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const StyledAutocomplete = styled(Autocomplete)({
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'black',
    },
    '& .MuiOutlinedInput-root:hover .MuiAutocomplete-input': {
      color: 'white',
    },
  });

  const categories = [
    { label: 'Design' },
    { label: 'Development' },
    { label: 'It & Software' },
    { label: 'Business' },
    { label: 'Marketing' },
    { label: 'Photography' },
    { label: 'Health & care' },
    { label: 'Technology' }
  ];

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
