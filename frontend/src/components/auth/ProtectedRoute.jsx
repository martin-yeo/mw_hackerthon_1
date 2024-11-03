import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Loading } from '../common/Loading';

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    // 로그인 후 원래 가려던 페이지로 리다이렉트하기 위해 현재 위치를 state로 전달
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
}; 