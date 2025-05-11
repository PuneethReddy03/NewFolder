import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useBudgetContext } from '../../context/BudgetContext';

const ProtectedRoute = ({ children }) => {
  const { user, isInitialized } = useBudgetContext();
  const location = useLocation();

  // Wait until authentication is initialized
  if (!isInitialized) {
    return <div className="p-6 flex justify-center items-center">Loading...</div>;
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;