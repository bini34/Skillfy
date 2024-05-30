import React from 'react';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import SignupSocialMedia from './SignupSocialMedia'
import './Signup.css'


const Signup = () => {
  return (
    <div className="register-container">
      <div className="register-left">
        <div className="register-left-content">
          <h1>Turn your ambition into a success story</h1>
          <p>Choose from over 100,000 online videos.</p>
        </div>
      </div>
      <div className="register-right">
        <form className="register-form">
          <h1>Create your free account</h1>
          <p>See how the world's best user experiences are created</p>
          <br />
          <TextField id="outlined-basic" label="Full Name" variant="outlined" />
          <TextField id="outlined-basic" label="Email address" variant="outlined" type="email"/>
          <TextField id="outlined-basic" label="Password" variant="outlined" type="password"/>
          <TextField id="outlined-basic" label="Confirm Password" variant="outlined" type="password"/>
          <br />
          <button className='submitBtn' type="submit">Create your account</button>


        </form>
        <Divider>OR</Divider> 
          <br />
          <SignupSocialMedia/>
      </div>
    </div>
  );
};

export default Signup;