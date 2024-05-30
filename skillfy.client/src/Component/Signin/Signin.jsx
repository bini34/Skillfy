// src/components/LoginPage.js
import React from 'react';
import './Signin.css';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import SigninSocialMedia from './SigninSocialMedia'
import img from '../../assets/image/signinImg.png'
function Signin() {
  return (
    <div className="login-container">
      <div className="side-banner">
        
        <div className="banner-content">
          <img src={img} alt="" />
          <h1>Turn your ambition into a success story</h1>
          <p>Choose from over 100,000 online video.</p>
        </div>
      </div>
      <div className="login-form">
        <div className='registor'>
          <p>Already have an Account? </p>
          <a href="" className='regstora'>Registor</a>
        </div>       
         <div>
        <h1>Hello! Welcome back.</h1>
        <p>Log in with your data that you entered during your registration.</p>
        </div>
        
        <form>
          <TextField id="outlined-basic" label="Email" variant="outlined" type="email" sx={{  height: '64px',  '&:hover': {borderColor: 'black' }}} />
          <TextField id="outlined-basic" label="Password" variant="outlined" type="password"/>
          <a href="#"> Forget Password</a>
          <Button variant="contained">Start now!</Button>

        </form>
        <Divider>OR</Divider> 

        <SigninSocialMedia/>
        <p>
          Don’t have an account? <a href="#">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Signin;
