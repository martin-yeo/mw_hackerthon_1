import { useState, useCallback } from 'react';
import { api } from '../api/client';

export const useAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAdminStats = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/stats');
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || '통계 데이터 조회에 실패했습니다.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getUsers = useCallback(async (filters) => {
    try {
      setLoading(true);
      const response = await api.get('/admin/users', { params: filters });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || '사용자 목록 조회에 실패했습니다.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUserStatus = useCallback(async (userId, status) => {
    try {
      setLoading(true);
      const response = await api.put(`/admin/users/${userId}/status`, { status });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || '사용자 상태 업데이트에 실패했습니다.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateReservationStatus = useCallback(async (reservationId, status, reason) => {
    try {
      setLoading(true);
      const response = await api.put(`/admin/reservations/${reservationId}/status`, {
        status,
        reason
      });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || '예약 상태 업데이트에 실패했습니다.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const exportUserData = useCallback(async (filters) => {
    try {
      setLoading(true);
      const response = await api.get('/admin/users/export', {
        params: filters,
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'users.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError(err.response?.data?.message || '데이터 내보내기에 실패했습니다.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getReservationStats = useCallback(async (period) => {
    try {
      setLoading(true);
      const response = await api.get('/admin/stats/reservations', {
        params: { period }
      });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || '예약 통계 조회에 실패했습니다.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    getAdminStats,
    getUsers,
    updateUserStatus,
    updateReservationStatus,
    exportUserData,
    getReservationStats
  };
}; 