import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import SignupSocialMedia from './SignupSocialMedia';
import img from '../../assets/image/signinImg.png';
import authService from '../../Services/authService'
import { Link } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const validatePassword = (password) => {
    const minLength = /.{8,}/;
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;
    const hasNumber = /[0-9]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    return (
      minLength.test(password) &&
      hasUpperCase.test(password) &&
      hasLowerCase.test(password) &&
      hasNumber.test(password) &&
      hasSpecialChar.test(password)
    );
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const nameParts = fullName.trim().split(' ');
    if (nameParts.length !== 2) {
      setNameError('Please enter exactly two words: first name and last name');
      return;
    }
    const [firstName, lastName] = nameParts;

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }


    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character');
      return;
    }

  
    authService({ firstName, lastName, email, password }).then(
      (data) => {
        setMessage('User registered successfully!');
      },
      (error) => {
        setMessage('Error occurred during registration.');
      }
    );
  };

  return (
    <div className="signup-container">
      <div className="side-banner">
        <div className="banner-content">
          <img src={img} alt="" />
          <h1>Turn your ambition into a success story</h1>
          <p>Choose from over 100,000 online videos.</p>
        </div>
      </div>
      <div className="signup-form">
        <div className='signin'>
          <p>Don’t have an account? </p>
          <Link to="/api/account/signin" className='signin-link'>Sign In</Link>
        </div>
        <div>
          <h1>Create your free account</h1>
          <p>See how the world's best user experiences are created</p>
        </div>
        <form onSubmit={handleRegister}>
          <TextField 
            id="full-name" 
            label="Full Name" 
            variant="outlined" 
            value={fullName} 
            onChange={(e) => {
              setFullName(e.target.value);
              setNameError('');
            }} 
            error={!!nameError}
            helperText={nameError || 'Enter your first name and last name'}
          />
          <TextField 
            id="email" 
            label="Email address" 
            variant="outlined" 
            type="email" 
            value={email} 
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError('');
            }} 
            error={!!emailError}
            helperText={emailError || 'Enter a valid email address'}
          />
          <TextField 
            id="password" 
            label="Password" 
            variant="outlined" 
            type="password" 
            value={password} 
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError('');
            }} 
            error={!!passwordError}
            helperText={passwordError || 'At least 8 characters, include uppercase, lowercase, number, and special character'}
          />
          <TextField 
            id="confirm-password" 
            label="Confirm Password" 
            variant="outlined" 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setPasswordError('');
            }} 
            error={!!passwordError}
            helperText={passwordError || 'Re-enter your password'}
          />
          <Button type="submit" variant="contained">Create your account</Button>
        </form>
        <Divider>OR</Divider>
        <SignupSocialMedia />
      </div>
    </div>
  );
};

export default Signup;
