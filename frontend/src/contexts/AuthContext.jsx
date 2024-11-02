import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { getToken, setToken, removeToken } from '../utils/localStorage';
import { Loading } from '../components/common/Loading';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  // 토큰 기반 인증 상태 확인
  const checkAuthStatus = async () => {
    const token = getToken();
    if (token) {
      try {
        const response = await api.get('/auth/me');
        setUser(response.data);
        // API 요청에 토큰 자동 포함
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        console.error('Auth check failed:', error);
        removeToken();
        delete api.defaults.headers.common['Authorization'];
      }
    }
    setLoading(false);
  };

  // 로그인 상태 변경 시 API 헤더 업데이트
  useEffect(() => {
    if (user) {
      const token = getToken();
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [user]);

  // 인증이 필요한 라우트 보호
  const requireAuth = (element) => {
    if (loading) {
      return <Loading />;
    }

    if (!user) {
      navigate('/auth/login', { 
        state: { from: window.location.pathname }
      });
      return null;
    }

    return element;
  };

  // 관리자 권한 확인
  const requireAdmin = (element) => {
    if (loading) {
      return <Loading />;
    }

    if (!user || user.role !== 'admin') {
      navigate('/');
      return null;
    }

    return element;
  };

  // 세션 만료 처리
  const handleSessionExpired = () => {
    setUser(null);
    removeToken();
    navigate('/auth/login', {
      state: { 
        from: window.location.pathname,
        message: '세션이 만료되었습니다. 다시 로그인해주세요.'
      }
    });
  };

  const value = {
    user,
    setUser,
    loading,
    requireAuth,
    requireAdmin,
    handleSessionExpired,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 