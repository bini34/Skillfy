import React, { useState } from 'react';
import './InstructorProfilePage.css';

export default function InstructorPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = (event) => {
    setProfileImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      firstName,
      lastName,
      bio,
      profileImage
    });
  };

  return (
    <div className='instructor-container'>
      <div className="instructor-main-container">
        <div className="instructor-mainContainer-header">
          <h1>Update your Profile</h1>
        </div>
        <div className="instructor-mainContainer-main">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="profileImage">Profile Image</label>
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                onChange={handleImageUpload}
                required
              />
              {profileImage && (
                <div className="image-preview">
                  <img src={profileImage} alt="Profile Preview" />
                </div>
              )}
            </div>
            <button type="submit">Update Profile</button>
          </form>
        </div>
      </div>
    </div>
  );
}
