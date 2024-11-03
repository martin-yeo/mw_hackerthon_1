import axios from 'axios';
import { getAuthToken, getRefreshToken, setAuthToken, removeAuthToken } from '../utils/auth';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// axios 인스턴스 생성
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 토큰 만료 에러 && 재시도하지 않은 요청
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 리프레시 토큰으로 새 액세스 토큰 발급
        const refreshToken = getRefreshToken();
        const response = await axios.post(`${BASE_URL}/auth/refresh`, {
          refreshToken
        });

        const { accessToken } = response.data;
        setAuthToken(accessToken);

        // 새 토큰으로 원래 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰도 만료된 경우
        removeAuthToken();
        window.location.href = '/auth/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
); 