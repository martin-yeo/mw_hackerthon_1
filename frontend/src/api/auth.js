import { api } from './client';

export const authAPI = {
  login: async (identifier, password) => {
    const response = await api.post('/auth/local', {
      identifier,
      password,
    });
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/local/register', userData);
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', {
      email,
    });
    return response.data;
  },

  resetPassword: async (code, password, passwordConfirmation) => {
    const response = await api.post('/auth/reset-password', {
      code,
      password,
      passwordConfirmation,
    });
    return response.data;
  },

  changePassword: async (currentPassword, newPassword) => {
    const response = await api.put('/auth/change-password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  },

  getMe: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },

  updateProfile: async (id, data) => {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  },

  deleteAccount: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  // 소셜 로그인
  socialLogin: async (provider) => {
    window.location.href = `${process.env.REACT_APP_API_URL}/api/connect/${provider}`;
  },
}; 