import { useState, useCallback, useContext } from 'react';
import { ReservationContext } from '../contexts/ReservationContext';
import { api } from '../utils/api';
import { useToast } from './useToast';

export const useReservation = () => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error('useReservation must be used within a ReservationProvider');
  }

  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getReservations = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/reservations', { params });
      return {
        data: response.data.reservations,
        totalPages: response.data.totalPages,
        totalCount: response.data.totalCount
      };
    } catch (error) {
      setError(error.response?.data?.message || '예약 목록을 불러오는데 실패했습니다.');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const getReservation = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/reservations/${id}`);
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || '예약 정보를 불러오는데 실패했습니다.');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const createReservation = useCallback(async (reservationData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post('/reservations', reservationData);
      showToast({
        type: 'success',
        message: '예약이 성공적으로 생성되었습니다.'
      });
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || '예약 생성에 실패했습니다.');
      showToast({
        type: 'error',
        message: error.response?.data?.message || '예약 생성에 실패했습니다.'
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const updateReservation = useCallback(async (id, updateData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.put(`/reservations/${id}`, updateData);
      showToast({
        type: 'success',
        message: '예약이 성공적으로 수정되었습니다.'
      });
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || '예약 수정에 실패했습니다.');
      showToast({
        type: 'error',
        message: error.response?.data?.message || '예약 수정에 실패했습니다.'
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const cancelReservation = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      await api.post(`/reservations/${id}/cancel`);
      showToast({
        type: 'success',
        message: '예약이 취소되었습니다.'
      });
    } catch (error) {
      setError(error.response?.data?.message || '예약 취소에 실패했습니다.');
      showToast({
        type: 'error',
        message: error.response?.data?.message || '예약 취소에 실패했습니다.'
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const checkAvailability = useCallback(async (params) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/reservations/availability', { params });
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || '좌석 조회에 실패했습니다.');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const getReservationStats = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/reservations/stats', { params });
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || '통계 정보를 불러오는데 실패했습니다.');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const validateReservation = useCallback(async (reservationData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post('/reservations/validate', reservationData);
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || '예약 유효성 검사에 실패했습니다.');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    getReservations,
    getReservation,
    createReservation,
    updateReservation,
    cancelReservation,
    checkAvailability,
    getReservationStats,
    validateReservation
  };
}; 