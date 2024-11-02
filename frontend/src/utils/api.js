import axios from 'axios';
import { API_ENDPOINTS, ERROR_MESSAGES } from './constants';

const BASE_URL = process.env.REACT_APP_API_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 토큰 만료 시 갱신 처리
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await api.post(API_ENDPOINTS.AUTH.REFRESH, {
          refreshToken
        });

        const { token } = response.data;
        localStorage.setItem('token', token);

        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        // 토큰 갱신 실패 시 로그아웃 처리
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // 에러 메시지 처리
    const errorMessage = getErrorMessage(error);
    error.message = errorMessage;

    return Promise.reject(error);
  }
);

const getErrorMessage = (error) => {
  if (!error.response) {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }

  switch (error.response.status) {
    case 400:
      return error.response.data.message || ERROR_MESSAGES.VALIDATION_ERROR;
    case 401:
      return ERROR_MESSAGES.UNAUTHORIZED;
    case 403:
      return ERROR_MESSAGES.FORBIDDEN;
    case 404:
      return ERROR_MESSAGES.NOT_FOUND;
    case 409:
      return error.response.data.message || ERROR_MESSAGES.DUPLICATE_RESERVATION;
    case 500:
      return ERROR_MESSAGES.SERVER_ERROR;
    default:
      return error.response.data.message || ERROR_MESSAGES.SERVER_ERROR;
  }
};

// API 요청 함수들
export const authAPI = {
  login: (credentials) => api.post(API_ENDPOINTS.AUTH.LOGIN, credentials),
  register: (userData) => api.post(API_ENDPOINTS.AUTH.REGISTER, userData),
  logout: () => api.post(API_ENDPOINTS.AUTH.LOGOUT),
  getMe: () => api.get(API_ENDPOINTS.AUTH.ME)
};

export const reservationAPI = {
  getList: (params) => api.get(API_ENDPOINTS.RESERVATIONS.LIST, { params }),
  create: (data) => api.post(API_ENDPOINTS.RESERVATIONS.CREATE, data),
  cancel: (id, reason) => api.post(API_ENDPOINTS.RESERVATIONS.CANCEL(id), { reason }),
  getDetail: (id) => api.get(API_ENDPOINTS.RESERVATIONS.DETAIL(id)),
  checkAvailability: (params) => api.get(API_ENDPOINTS.RESERVATIONS.CHECK, { params })
};

export const adminAPI = {
  getUsers: (params) => api.get(API_ENDPOINTS.ADMIN.USERS, { params }),
  getStats: () => api.get(API_ENDPOINTS.ADMIN.STATS),
  approveReservation: (id) => api.post(API_ENDPOINTS.ADMIN.APPROVE(id)),
  rejectReservation: (id, reason) => api.post(API_ENDPOINTS.ADMIN.REJECT(id), { reason })
}; 