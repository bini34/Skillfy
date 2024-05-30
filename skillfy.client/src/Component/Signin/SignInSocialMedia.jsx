import Button from '@mui/material/Button';
import GoogleLogo from '../../assets/logo/google-logo.svg';
import MicrosoftLogo from '../../assets/logo/microsoft-logo.svg';
import AppleLogo from '../../assets/logo/apple-logo.svg';

import './SigninSocialMedia.css';


function SigninSocialMedia(){

    return(
        <div className='SocialMedia' >
            <Button className='SocialMedia-logo_button' variant="outlined" sx={{display:'flex', justifyContent: 'flex-start', color: 'rgba(0, 0, 0, 10)', borderColor: 'black'}} >
                <span className='social-logo-wrapper'>
                    <img className='SocialMedia-Logo' src={GoogleLogo} alt="GoogleLogo" />
                </span>
                <span>
                    Continue with Google
                </span>
            </Button>
            <Button className='SocialMedia-logo_button' variant="outlined" sx={{display:'flex', justifyContent: 'flex-start', color: 'rgba(0, 0, 0, 10)', borderColor: 'black'}} >
                <span className='social-logo-wrapper'>
                    <img className='SocialMedia-Logo' src={MicrosoftLogo} alt="MicrosoftLogo" />
                </span>
                <span>
                    Continue with Microsoft Account
                </span>
            </Button>
            <Button className='SocialMedia-logo_button' variant="outlined" sx={{display:'flex', justifyContent: 'flex-start', color: 'rgba(0, 0, 0, 10)', borderColor: 'black' }}>
                <span className='social-logo-wrapper'>
                    <img className='SocialMedia-Logo' src={AppleLogo} alt="MicrosoftLogo" />
                </span>
                <span>
                    Continue with Apple
                </span>
            </Button>
        </div>
    );
    
}
export default SigninSocialMedia;