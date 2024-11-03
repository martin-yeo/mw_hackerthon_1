import { axiosInstance } from './axios';

export const authApi = {
  // 로그인
  login: (credentials) => {
    return axiosInstance.post('/auth/login', credentials);
  },

  // 회원가입
  register: (userData) => {
    return axiosInstance.post('/auth/register', userData);
  },

  // 로그아웃
  logout: () => {
    return axiosInstance.post('/auth/logout');
  },

  // 소셜 로그인
  socialLogin: (provider) => {
    return axiosInstance.get(`/auth/${provider}`);
  },

  // 현재 사용자 정보 조회
  getCurrentUser: () => {
    return axiosInstance.get('/auth/me');
  },

  // 비밀번호 재설정 요청
  requestPasswordReset: (email) => {
    return axiosInstance.post('/auth/forgot-password', { email });
  },

  // 비밀번호 재설정 토큰 검증
  verifyResetToken: (token) => {
    return axiosInstance.get(`/auth/reset-password/${token}`);
  },

  // 비밀번호 재설정
  resetPassword: (token, newPassword) => {
    return axiosInstance.post(`/auth/reset-password/${token}`, {
      password: newPassword
    });
  },

  // 프로필 업데이트
  updateProfile: (userData) => {
    return axiosInstance.put('/auth/profile', userData);
  },

  // 비밀번호 변경
  changePassword: (currentPassword, newPassword) => {
    return axiosInstance.put('/auth/password', {
      currentPassword,
      newPassword
    });
  },

  // 이메일 인증 요청
  requestEmailVerification: () => {
    return axiosInstance.post('/auth/verify-email');
  },

  // 이메일 인증 확인
  verifyEmail: (token) => {
    return axiosInstance.get(`/auth/verify-email/${token}`);
  },

  // 계정 삭제
  deleteAccount: (password) => {
    return axiosInstance.delete('/auth/account', {
      data: { password }
    });
  },

  // 리프레시 토큰으로 새 액세스 토큰 발급
  refreshToken: (refreshToken) => {
    return axiosInstance.post('/auth/refresh', { refreshToken });
  },

  // 소셜 계정 연동
  linkSocialAccount: (provider) => {
    return axiosInstance.post(`/auth/link/${provider}`);
  },

  // 소셜 계정 연동 해제
  unlinkSocialAccount: (provider) => {
    return axiosInstance.delete(`/auth/link/${provider}`);
  },

  // 연동된 소셜 계정 목록 조회
  getLinkedAccounts: () => {
    return axiosInstance.get('/auth/linked-accounts');
  }
}; 