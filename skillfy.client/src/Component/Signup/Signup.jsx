import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import SignupSocialMedia from './SignupSocialMedia';
import img from '../../assets/image/signinImg.png';
import authService from '../../Services/authService';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [role, setRole] = useState('student'); // State for role (instructor/student)
  const navigate = useNavigate();

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

  const toggleRole = () => {
    setRole(role === 'student' ? 'instructor' : 'student');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);

    const nameParts = fullName.trim().split(' ');
    if (nameParts.length !== 2) {
      setNameError('Please enter exactly two words: first name and last name');
      setLoading(false);
      return;
    }
    const [firstName, lastName] = nameParts;

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character');
      setLoading(false);
      return;
    }

    authService.register(firstName, lastName, email, role, password).then(
      (response) => {
        setSnackbar({ open: true, message: 'Registration successful!', severity: 'success' });
        setLoading(false);

        const user = authService.getCurrentUser();
        const role = user.role.$values[0];
        if (role === 'admin') {
          navigate(`/admin/dashboard/`);
        } else if (role === 'Instructor') {
          navigate(`/instructor/courses/`);
        } else if (role === 'student') {
          navigate(`/`);
        }
      },
      (error) => {
        setSnackbar({ open: true, message: 'Error occurred during registration.', severity: 'error' });
        setLoading(false);
      }
    );
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="signup-container">
      <div className="side-banner">
        <div className="logo">
          <Link to="/" className="logo">Skillfy</Link>
        </div>
        <div className="banner-content">
          <img src={img} alt="" />
          <h1>Turn your ambition into a success story</h1>
          <p>Choose from over 100,000 online videos.</p>
        </div>
      </div>
      <div className="signup-form">
        <div className='signin'>
          <p>Don’t have an account? </p>
          <Link to="/auth/account/signin" className='signin-link'>Sign In</Link>
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
            sx={{ marginBottom: '0', marginTop: '0', padding:'0' }}
            error={!!nameError}
            helperText={nameError || 'Enter your first name and last name'}
            fullWidth
            margin="normal"
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
            sx={{ marginBottom: '0', marginTop: '0' }}
            error={!!emailError}
            helperText={emailError || 'Enter a valid email address'}
            fullWidth
            margin="normal"
          />
          <TextField 
            id="password" 
            label="Password" 
            variant="outlined" 
            type={showPassword ? 'text' : 'password'} 
            value={password} 
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError('');
            }} 
            sx={{ marginBottom: '0', marginTop: '0' }}

            error={!!passwordError}
            helperText={passwordError || 'At least 8 characters, include uppercase, lowercase, number, and special character'}
            fullWidth
            margin="normal"
          />
          <TextField 
            id="confirm-password" 
            label="Confirm Password" 
            variant="outlined" 
            type={showConfirmPassword ? 'text' : 'password'} 
            value={confirmPassword} 
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setPasswordError('');
            }} 
            sx={{ marginBottom: '0', marginTop: '0' }}

            error={!!passwordError}
            helperText={passwordError || 'Re-enter your password'}
            fullWidth
            margin="normal"
          />
          <FormControlLabel 
            control={<Switch checked={role === 'instructor'} onChange={toggleRole} />} // Check if the role is 'instructor' to set the switch state
            label={role === 'instructor' ? 'Become an instructor' : 'Become a student'} // Dynamically change label
          />
          <p>{role === 'instructor' ? 'As an instructor, you can create and manage courses.' : 'As a student, you can enroll in courses.'}</p>
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} style={{ marginTop: '16px' }}>
            {loading ? <CircularProgress size={24} /> : 'Create your account'}
          </Button>
        </form>
        <Divider style={{ margin: '16px 0' }}>OR</Divider>
        <SignupSocialMedia />
      </div>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Signup;
