import { useState } from 'react';
import SignupSocialMedia from './SignupSocialMedia';
import img from '../../assets/image/signinImg.png';
import authService from '../../Services/authService';
import useAuthStore from '../../store/authStore';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../ui/Input.jsx';
import PasswordInput from '../ui/PasswordInput.jsx';
import Button from '../ui/Button.jsx';
import { toast } from '../../lib/toast.js';
import './Signup.css';

const Signup = () => {
  const [fullName, setFullName]               = useState('');
  const [email, setEmail]                     = useState('');
  const [password, setPassword]               = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading]                 = useState(false);
  const [passwordError, setPasswordError]     = useState('');
  const [nameError, setNameError]             = useState('');
  const [emailError, setEmailError]           = useState('');
  const [role, setRole]                       = useState('student');
  const navigate = useNavigate();
  const setAuth  = useAuthStore((s) => s.setAuth);

  const validatePassword = (pwd) => {
    return (
      /.{8,}/.test(pwd) &&
      /[A-Z]/.test(pwd) &&
      /[a-z]/.test(pwd) &&
      /[0-9]/.test(pwd) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(pwd)
    );
  };

  const validateEmail = (mail) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);

  const toggleRole = () => setRole((r) => (r === 'student' ? 'instructor' : 'student'));

  const handleRegister = async (e) => {
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

    try {
      const response = await authService.register(firstName, lastName, email, role, password);
      const user = response?.data;
      if (user) {
        setAuth(user, user.token || null);
      }
      toast.success('Registration successful!');
      setTimeout(() => navigate('/'), 500);
    } catch (error) {
      const msg = typeof error === 'string' ? error : error?.message || 'Registration failed. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
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
          <p>Already have an account? </p>
          <Link to="/auth/account/signin" className='signin-link'>Sign In</Link>
        </div>
        <div>
          <h1>Create your free account</h1>
          <p>See how the world's best user experiences are created</p>
        </div>
        <form onSubmit={handleRegister} noValidate>
          <div className="mb-3">
            <Input
              id="full-name"
              label="Full Name"
              value={fullName}
              required
              description="Enter your first name and last name"
              error={nameError}
              onChange={(e) => { setFullName(e.target.value); setNameError(''); }}
            />
          </div>
          <div className="mb-3">
            <Input
              id="email"
              label="Email address"
              type="email"
              autoComplete="email"
              required
              description="Enter a valid email address"
              error={emailError}
              value={email}
              onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
            />
          </div>
          <div className="mb-3">
            <PasswordInput
              id="password"
              label="Password"
              autoComplete="new-password"
              required
              description="At least 8 characters, include uppercase, lowercase, number, and special character"
              error={passwordError}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }}
            />
          </div>
          <div className="mb-3">
            <PasswordInput
              id="confirm-password"
              label="Confirm Password"
              autoComplete="new-password"
              required
              description="Re-enter your password"
              error={passwordError && confirmPassword ? passwordError : undefined}
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); setPasswordError(''); }}
            />
          </div>

          <div className="role-toggle">
            <label className="role-toggle-label" htmlFor="role-switch">
              <input
                id="role-switch"
                type="checkbox"
                checked={role === 'instructor'}
                onChange={toggleRole}
                className="sr-only"
                role="switch"
                aria-checked={role === 'instructor'}
              />
              <span className={`toggle-track ${role === 'instructor' ? 'toggle-track--on' : ''}`} aria-hidden="true">
                <span className="toggle-thumb" />
              </span>
              <span className="toggle-label-text">
                {role === 'instructor' ? 'Become an instructor' : 'Become a student'}
              </span>
            </label>
            <p className="role-description">
              {role === 'instructor'
                ? 'As an instructor, you can create and manage courses.'
                : 'As a student, you can enroll in courses.'}
            </p>
          </div>

          <Button type="submit" variant="primary" fullWidth loading={loading} className="mt-4">
            Create your account
          </Button>
        </form>

        <div className="divider-or">
          <span>OR</span>
        </div>
        <SignupSocialMedia />
      </div>
    </div>
  );
};

export default Signup;
