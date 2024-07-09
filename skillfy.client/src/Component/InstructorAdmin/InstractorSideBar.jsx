import React from 'react';
import { Link } from 'react-router-dom';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined';
import './InstractorSideBar.css';

export default function InstractorSideBar() {
  return (
    <nav className='InstractorSideBar-nav'>
      
        <Link to="/courses" className='logo-button'>Skillfy</Link> 
     
        <ul>
            <li>
                <FormatListBulletedOutlinedIcon/>   
                <Link to="/courses">Courses</Link> 
            </li>
            <li>
                <SignalCellularAltOutlinedIcon/>
                <Link to="/analysis">Analysis</Link>
            </li>
        </ul>
    </nav>
  );
}
