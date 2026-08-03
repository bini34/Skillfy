import { useState } from 'react';
import './Signin.css';
import SigninSocialMedia from './SignInSocialMedia';
import img from '../../assets/image/signinImg.png';
import authService from '../../Services/authService';
import useAuthStore from '../../store/authStore';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../ui/Input.jsx';
import PasswordInput from '../ui/PasswordInput.jsx';
import Button from '../ui/Button.jsx';
import { toast } from '../../lib/toast.js';

function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
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
            toast.success('Login successful!');

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
            toast.error(msg);
        } finally {
            setLoading(false);
        }
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

                <form onSubmit={handleLogin} noValidate>
                    <div className="mb-4">
                        <Input
                            id="email"
                            label="Email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <PasswordInput
                            id="password"
                            label="Password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Link to="/auth/forgot-password" className="forgot-password-link">Forgot Password?</Link>
                    <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        loading={loading}
                        className="mt-4"
                    >
                        Start now!
                    </Button>
                </form>

                <div className="divider-or">
                    <span>OR</span>
                </div>
                <SigninSocialMedia />
            </div>
        </div>
    );
}

export default Signin;
