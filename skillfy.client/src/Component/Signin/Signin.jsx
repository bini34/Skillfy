//import React from 'react';
import './Signin.css';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import SigninSocialMedia from './SigninSocialMedia';
import img from '../../assets/image/signinImg.png';
import { useState } from 'react';
import authService from '../../Services/authService';
import { Link, useNavigate } from 'react-router-dom';
import { RollerShadesClosedSharp } from '@mui/icons-material';

function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        authService.login(email, password).then(
            (Response) => {
                const user = authService.getCurrentUser();  
                console.log(user)

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
               setMessage('Error occurred during login.');
            }
        );
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
                    <p>Choose from over 100,000 online video.</p>
                </div>
            </div>
            <div className="login-form">
                <div className='registor'>
                    <p>Already have an Account? </p>
                    <Link to="/auth/account/register" className='regstora'>Registor</Link>
                </div>
                <div>
                    <h1>Hello! Welcome back.</h1>
                    <p>Log in with your data that you entered during your registration.</p>
                </div>

                <form onSubmit={handleLogin}>
                    <TextField id="outlined-basic" label="Email" variant="outlined" type="email" onChange={(e) => setEmail(e.target.value)} sx={{ height: '64px', '&:hover': { borderColor: 'black' } }} />
                    <TextField id="outlined-basic" label="Password" variant="outlined" type="password" onChange={(e) => setPassword(e.target.value)} />
                    <a href="#">Forget Password</a>
                    <Button type="submit" variant="contained">Start now!</Button>
                </form>
                <Divider>OR</Divider>

               <SigninSocialMedia />
            </div>
        </div>
    );
}

export default Signin;
