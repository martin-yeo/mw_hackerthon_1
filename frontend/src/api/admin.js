import { api } from './client';

export const adminAPI = {
  // 대시보드
  getDashboardStats: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },

  // 예약 관리
  getPendingReservations: async () => {
    const response = await api.get('/admin/reservations/pending');
    return response.data;
  },

  approveReservation: async (id) => {
    const response = await api.put(`/admin/reservations/${id}/approve`);
    return response.data;
  },

  rejectReservation: async (id, reason) => {
    const response = await api.put(`/admin/reservations/${id}/reject`, { reason });
    return response.data;
  },

  // 사용자 관리
  getUsers: async (params) => {
    const response = await api.get('/admin/users', { params });
    return response.data;
  },

  updateUserStatus: async (id, status) => {
    const response = await api.put(`/admin/users/${id}/status`, { status });
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
  },

  // 통계
  getStatistics: async (params) => {
    const response = await api.get('/admin/statistics', { params });
    return response.data;
  },

  exportData: async (type, params) => {
    const response = await api.get(`/admin/export/${type}`, {
      params,
      responseType: 'blob',
    });
    return response.data;
  },
}; 