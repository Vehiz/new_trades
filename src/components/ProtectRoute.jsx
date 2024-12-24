// import React from 'react';
import { Navigate} from 'react-router-dom';
import { useAuth } from './useAuth';
import Account from './Account';

const ProtectedRoute = () => {
  const { currentUser } = useAuth();

  return currentUser ? <Account /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
