import React, {useEffect, useState} from 'react'
import Avatar from '@mui/material/Avatar';
import authService from '../../Services/authService';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';


export default function InstractorAdminHeader() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
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
      setIsAuthenticated(false);
      setUser(null);
    };
  
  return (
    <>
     <Avatar alt={"Avater"} src="/static/images/avatar/1.jpg" />
    </>
  )
}
