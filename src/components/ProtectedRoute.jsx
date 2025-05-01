import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRole } from '../context/RoleContext';

const ProtectedRoute = ({ element, allowedRoles = [] }) => {
  const { user } = useAuth();
  const { role } = useRole();
  
  // If user is not authenticated, redirect to sign-in page
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  
  // If allowedRoles is empty or the user's role is in the allowed roles, render the element
  if (allowedRoles.length === 0 || allowedRoles.includes(role)) {
    return element;
  }
  
  // If user doesn't have the required role, redirect to an appropriate dashboard
  if (role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  } else if (role === 'doctor') {
    return <Navigate to="/doctor/dashboard" replace />;
  } else if (role === 'patient') {
    return <Navigate to="/patient/dashboard" replace />;
  }
  
  // Default fallback
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;