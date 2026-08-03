import  { useState } from 'react';
import './Signin.css';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import SigninSocialMedia from './SignInSocialMedia';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import img from '../../assets/image/signinImg.png';
import authService from '../../Services/authService';
import useAuthStore from '../../store/authStore';
import { Link, useNavigate } from 'react-router-dom';

function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const setAuth = useAuthStore((s) => s.setAuth);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await authService.login(email, password);
            const user = response?.data;
            if (user) {
                setAuth(user, user.token || null);
            }
            const role = user?.role?.$values?.[0] || user?.role?.[0] || user?.role;
            setSnackbar({ open: true, message: 'Login successful!', severity: 'success' });

            setTimeout(() => {
                if (role === 'Admin' || role === 'admin') {
                    navigate('/admin/dashboard');
                } else if (role === 'Instructor') {
                    navigate('/instructor/courses/');
                } else {
                    navigate('/');
                }
            }, 500);
        } catch (error) {
            const msg = typeof error === 'string' ? error : error?.message || 'Login failed. Please check your credentials.';
            setSnackbar({ open: true, message: msg, severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
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
            <div className="login-form">
                <div className='registerbtn'>
                    <p>Don't have an account? </p>
                    <Link to="/auth/account/register" className=''>Register</Link>
                </div>
                <div>
                    <h1>Hello! Welcome back.</h1>
                    <p>Log in with the information you entered during your registration.</p>
                </div>

                <form onSubmit={handleLogin}>
                    <TextField 
                        id="email" 
                        label="Email" 
                        variant="outlined" 
                        type="email" 
                        fullWidth
                        margin="normal"
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <TextField 
                        id="password" 
                        label="Password" 
                        variant="outlined" 
                        type={showPassword ? 'text' : 'password'} 
                        fullWidth
                        margin="normal"
                        onChange={(e) => setPassword(e.target.value)} 
                        // InputProps={{
                        //     endAdornment: (
                        //         <InputAdornment position="end">
                        //             <IconButton
                        //                 aria-label="toggle password visibility"
                        //                 onClick={handleClickShowPassword}
                        //             >
                        //                 {showPassword ? <Visibility /> : <VisibilityOff />}
                        //             </IconButton>
                        //         </InputAdornment>
                        //     )
                        // }}
                    />
                    <Link to="/auth/forgot-password" className="forgot-password-link">Forgot Password?</Link>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        fullWidth
                        disabled={loading}
                        style={{ marginTop: '16px' }}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Start now!'}
                    </Button>
                </form>
                <Divider style={{ margin: '16px 0' }}>OR</Divider>
                <SigninSocialMedia />
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
}

export default Signin;
