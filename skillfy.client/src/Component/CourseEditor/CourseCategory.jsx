import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import API_ENDPOINTS from './config';

export default function CourseCategory() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(API_ENDPOINTS.CATEGORIES)
            .then(response => {
                setCategories(response.data.map(category => ({ label: category.name })));
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

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
                    renderInput={(params) => <TextField {...params} label="Category" />}
                />
            </div>
        </div>
    );
}
