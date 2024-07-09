import React, { useState } from 'react';
import axios from 'axios';
import authService from '../../Services/authService';
import './instructorProfileUpdate.css';

export default function InstructorProfileUpdate() {
    const [bio, setBio] = useState('');
    const [image, setImage] = useState(null);
    const [bankAccount, setBankAccount] = useState('');
    const [userId, setUserId] = useState('');

    const user = authService.getCurrentUser();
    if (user){
    setUserId(user.id);
    }

    const handleBioChange = (e) => {
        setBio(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleBankAccountChange = (e) => {
        setBankAccount(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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
        } catch (error) {
            console.error('Error uploading data:', error);
        }
    };

    return (
        <div className='instructorProfileUpdateContainer'>
            <h1>Profile Update</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="image">Profile Picture</label>
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
                    />
                </div>
                <div>
                    <label htmlFor="bankAccount">Bank Account</label>
                    <input 
                        type="text" 
                        id="bankAccount" 
                        value={bankAccount} 
                        onChange={handleBankAccountChange} 
                    />
                </div>
                <button className='submitBtn' type='submit'>Update</button>
            </form>
        </div>
    );
}
