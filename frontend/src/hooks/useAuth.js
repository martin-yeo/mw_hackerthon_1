import { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../utils/api';
import { setToken, removeToken, getToken } from '../utils/localStorage';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { user, setUser } = context;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = getToken();
    if (token) {
      try {
        const response = await api.get('/auth/me');
        setUser(response.data);
      } catch (error) {
        removeToken();
        setUser(null);
      }
    }
    setLoading(false);
  };

  const login = async (email, password, rememberMe = false) => {
    try {
      setError(null);
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      if (rememberMe) {
        setToken(token);
      }
      
      setUser(user);
      return user;
    } catch (error) {
      setError(error.response?.data?.message || '로그인에 실패했습니다.');
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || '회원가입에 실패했습니다.');
      throw error;
    }
  };

  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      removeToken();
      setUser(null);
    }
  }, [setUser]);

  const resetPassword = async (email) => {
    try {
      setError(null);
      await api.post('/auth/reset-password', { email });
    } catch (error) {
      setError(error.response?.data?.message || '비밀번호 재설정 요청에 실패했습니다.');
      throw error;
    }
  };

  const updatePassword = async (currentPassword, newPassword) => {
    try {
      setError(null);
      await api.put('/auth/password', { currentPassword, newPassword });
    } catch (error) {
      setError(error.response?.data?.message || '비밀번호 변경에 실패했습니다.');
      throw error;
    }
  };

  const updateProfile = async (profileData) => {
    try {
      setError(null);
      const response = await api.put('/auth/profile', profileData);
      setUser(response.data);
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || '프로필 업데이트에 실패했습니다.');
      throw error;
    }
  };

  const verifyEmail = async (token) => {
    try {
      setError(null);
      const response = await api.post('/auth/verify-email', { token });
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || '이메일 인증에 실패했습니다.');
      throw error;
    }
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    resetPassword,
    updatePassword,
    updateProfile,
    verifyEmail,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };
}; 