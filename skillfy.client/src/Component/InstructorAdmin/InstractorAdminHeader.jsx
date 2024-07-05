import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import authService from '../../Services/authService';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';


export default function InstractorAdminHeader() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    useEffect(() => {
      const currentUser = authService.getCurrentUser();
      if (currentUser) {
        setIsAuthenticated(true);
        setUser(currentUser);
      }
    }, []);

  
    const handleLogout = () => {
      authService.logout();
      window.location.reload();
      setIsAuthenticated(false);
      setUser(null);
      navigate(`/`);
    };
  
  return (
    <>
    <button onClick={handleLogout}> <LogoutIcon /> </button>
     <Avatar alt={"Avater"} src="/static/images/avatar/1.jpg" />
    </>
  )
}
