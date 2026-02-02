// import React from 'react';
import { Navigate} from 'react-router-dom';
import { useAuth } from './useAuth';
import Account from './Account';
import PreLoader from './PreLoader';

const ProtectedRoute = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <PreLoader />;
  }

  return currentUser ? <Account /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
