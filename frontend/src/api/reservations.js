import { api } from './client';

export const reservationAPI = {
  getAll: async (params) => {
    const response = await api.get('/reservations', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/reservations/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/reservations', { data });
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/reservations/${id}`, { data });
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/reservations/${id}`);
    return response.data;
  },

  cancel: async (id, reason) => {
    const response = await api.put(`/reservations/${id}/cancel`, { reason });
    return response.data;
  },

  checkAvailability: async (seatId, date, startTime, endTime) => {
    const response = await api.get(`/seats/${seatId}/availability`, {
      params: { date, startTime, endTime },
    });
    return response.data;
  },

  getMyReservations: async () => {
    const response = await api.get('/reservations/me');
    return response.data;
  },

  getUpcoming: async () => {
    const response = await api.get('/reservations/upcoming');
    return response.data;
  },
}; 