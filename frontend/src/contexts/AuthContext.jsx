import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/authApi';
import { setAuthToken, removeAuthToken, getAuthToken } from '../utils/auth';
import { Loading } from '../components/common/Loading';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [loginBlockedUntil, setLoginBlockedUntil] = useState(null);
  const navigate = useNavigate();

  const checkAuthStatus = useCallback(async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await authApi.getCurrentUser();
      setUser(response.data);
    } catch (error) {
      console.error('인증 상태 확인 실패:', error);
      removeAuthToken();
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = async (email, password, rememberMe = false) => {
    if (loginBlockedUntil && new Date() < loginBlockedUntil) {
      const remainingTime = Math.ceil((loginBlockedUntil - new Date()) / 1000);
      throw new Error(`로그인이 일시적으로 제한되었습니다. ${remainingTime}초 후에 다시 시도해주세요.`);
    }

    try {
      const response = await authApi.login({ email, password });
      const { token, user: userData } = response.data;
      
      setAuthToken(token, rememberMe);
      setUser(userData);
      setLoginAttempts(0);
      setLoginBlockedUntil(null);
      
      navigate('/');
      return userData;
    } catch (error) {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      
      if (newAttempts >= 3) {
        const blockUntil = new Date(Date.now() + 30000); // 30초
        setLoginBlockedUntil(blockUntil);
        throw new Error('로그인 시도가 3회 실패하여 30초 동안 로그인이 제한됩니다.');
      }
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    register: async (userData) => {
      const response = await authApi.register(userData);
      const { token, user: newUser } = response.data;
      setAuthToken(token);
      setUser(newUser);
      navigate('/');
      return newUser;
    },
    logout: async () => {
      try {
        await authApi.logout();
      } catch (error) {
        console.error('로그아웃 실패:', error);
      } finally {
        removeAuthToken();
        setUser(null);
        navigate('/auth/login');
      }
    },
    loginWithProvider: async (provider) => {
      const response = await authApi.socialLogin(provider);
      const { token, user: userData } = response.data;
      setAuthToken(token);
      setUser(userData);
      navigate('/');
      return userData;
    },
    updateProfile: async (userData) => {
      const response = await authApi.updateProfile(userData);
      setUser(response.data);
      return response.data;
    },
    changePassword: async (currentPassword, newPassword) => {
      await authApi.changePassword(currentPassword, newPassword);
    },
    requestPasswordReset: async (email) => {
      await authApi.requestPasswordReset(email);
    },
    resetPassword: async (token, newPassword) => {
      await authApi.resetPassword(token, newPassword);
    },
    deleteAccount: async (password, reason) => {
      await authApi.deleteAccount(password, reason);
      removeAuthToken();
      setUser(null);
      navigate('/auth/login');
    },
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