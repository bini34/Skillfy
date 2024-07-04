import React from 'react';
import { Navigate } from 'react-router-dom';
import  authService from '../Services/authService';
const PrivateRoute = ({ element, allowedRoles }) => {
    const user = authService.getCurrentUser();
    const role = user.role.$values[0];
  
    if (!allowedRoles.includes(role)) {
      return <Navigate to="/auth/account/signin" />;
    }
  
    return element;
  };
export default PrivateRoute;