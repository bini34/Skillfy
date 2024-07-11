import React, { useState, useEffect } from 'react';
import axios from 'axios';
import authService from '../../Services/authService';
import './instructorProfileUpdate.css';
import avator from '../../assets/image/Avator.png';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function InstructorProfileUpdate() {
    const [bio, setBio] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(avator);
    const [bankAccount, setBankAccount] = useState('');
    const [userId, setUserId] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user) {
            setUserId(user.id);
        }
    }, []);

    const handleBioChange = (e) => {
        setBio(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        // Create a preview of the image
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleBankAccountChange = (e) => {
        setBankAccount(e.target.value);
    };

    const validateForm = () => {
        if (!bio || !image || !bankAccount) {
            setSnackbarMessage('All fields are required.');
            setSnackbarSeverity('warning');
            setOpenSnackbar(true);
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const formData = new FormData();
        formData.append('profile', image);
        formData.append('bio', bio);
        formData.append('bankaccount', bankAccount);
        formData.append('userid', userId);

        try {
            const response = await axios.post('https://localhost:7182/api/teacher/uploadteacher', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Response:', response.data);
            setSnackbarMessage('Profile updated successfully');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
        } catch (error) {
            console.error('Error uploading data:', error);
            setSnackbarMessage('Error updating profile');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <div className='instructorProfileUpdateContainer'>
            <h1>Profile Update</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <img 
                        src={imagePreview} 
                        alt="Profile Preview" 
                        className="profilePreview" 
                    />
                    <input 
                        type="file" 
                        accept="image/*" 
                        id="image" 
                        onChange={handleImageChange} 
                    />
                </div>
                <div>
                    <label htmlFor="bio">Bio</label>
                    <textarea 
                        name="bio" 
                        id="bio" 
                        value={bio} 
                        onChange={handleBioChange} 
                        placeholder="Enter your bio here..." 
                    />
                </div>
                <div>
                    <label htmlFor="bankAccount">Bank Account</label>
                    <input 
                        type="text" 
                        id="bankAccount" 
                        value={bankAccount} 
                        onChange={handleBankAccountChange} 
                        placeholder="Enter your bank account number..." 
                    />
                </div>
                <button className='submitBtn' type='submit'>Update</button>
            </form>

            <Snackbar 
                open={openSnackbar} 
                autoHideDuration={6000} 
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MuiAlert 
                    onClose={handleCloseSnackbar} 
                    severity={snackbarSeverity} 
                    elevation={6} 
                    variant="filled"
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </div>
    );
}
