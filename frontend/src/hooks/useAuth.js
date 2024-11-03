import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/authApi';
import { setAuthToken, removeAuthToken, getAuthToken } from '../utils/auth';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadUser = useCallback(async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await authApi.getCurrentUser();
      setUser(response.data);
    } catch (error) {
      console.error('사용자 정보 로딩 실패:', error);
      removeAuthToken();
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = async (email, password, rememberMe = false) => {
    try {
      const response = await authApi.login({ email, password });
      const { token, user: userData } = response.data;
      
      setAuthToken(token, rememberMe);
      setUser(userData);
      
      navigate('/');
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authApi.register(userData);
      const { token, user: newUser } = response.data;
      
      setAuthToken(token);
      setUser(newUser);
      
      navigate('/');
      return newUser;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('로그아웃 실패:', error);
    } finally {
      removeAuthToken();
      setUser(null);
      navigate('/auth/login');
    }
  };

  const loginWithProvider = async (provider) => {
    try {
      const response = await authApi.socialLogin(provider);
      const { token, user: userData } = response.data;
      
      setAuthToken(token);
      setUser(userData);
      
      navigate('/');
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const requestPasswordReset = async (email) => {
    try {
      await authApi.requestPasswordReset(email);
    } catch (error) {
      throw error;
    }
  };

  const verifyResetToken = async (token) => {
    try {
      await authApi.verifyResetToken(token);
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      await authApi.resetPassword(token, newPassword);
    } catch (error) {
      throw error;
    }
  };

  const updateProfile = async (userData) => {
    try {
      const response = await authApi.updateProfile(userData);
      setUser(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      await authApi.changePassword(currentPassword, newPassword);
    } catch (error) {
      throw error;
    }
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    loginWithProvider,
    requestPasswordReset,
    verifyResetToken,
    resetPassword,
    updateProfile,
    changePassword
  };
}; 