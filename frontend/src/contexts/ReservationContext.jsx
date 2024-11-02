import React, { createContext, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { useToast } from '../hooks/useToast';
import { useAuth } from '../hooks/useAuth';
import { RESERVATION_STATUS } from '../utils/constants';

export const ReservationContext = createContext(null);

export const ReservationProvider = ({ children }) => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { user } = useAuth();
  
  const [currentReservation, setCurrentReservation] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    cancelled: 0
  });

  // 실시간 예약 상태 업데이트 (웹소켓 연결)
  useEffect(() => {
    if (user) {
      const ws = new WebSocket(process.env.REACT_APP_WS_URL);
      
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        
        if (data.type === 'RESERVATION_UPDATE') {
          handleReservationUpdate(data.reservation);
        }
      };

      return () => {
        ws.close();
      };
    }
  }, [user]);

  // 예약 상태 변경 처리
  const handleReservationUpdate = useCallback((updatedReservation) => {
    setReservations(prev => 
      prev.map(reservation => 
        reservation.id === updatedReservation.id ? updatedReservation : reservation
      )
    );

    if (currentReservation?.id === updatedReservation.id) {
      setCurrentReservation(updatedReservation);
    }

    // 상태 변경에 따른 알림
    const statusMessages = {
      [RESERVATION_STATUS.APPROVED]: '예약이 승인되었습니다.',
      [RESERVATION_STATUS.REJECTED]: '예약이 거절되었습니다.',
      [RESERVATION_STATUS.CANCELLED]: '예약이 취소되었습니다.'
    };

    if (statusMessages[updatedReservation.status]) {
      showToast({
        type: updatedReservation.status === RESERVATION_STATUS.APPROVED ? 'success' : 'info',
        message: statusMessages[updatedReservation.status]
      });
    }
  }, [currentReservation, showToast]);

  // 통계 업데이트
  const updateStats = useCallback((newReservation, oldStatus) => {
    setStats(prev => {
      const updated = { ...prev };
      if (oldStatus) {
        updated[oldStatus.toLowerCase()] -= 1;
      }
      updated[newReservation.status.toLowerCase()] += 1;
      updated.total = Object.values(updated).reduce((sum, val) => sum + val, 0) - updated.total;
      return updated;
    });
  }, []);

  // 예약 생성
  const createReservation = useCallback(async (reservationData) => {
    setLoading(true);
    try {
      const response = await api.post('/reservations', reservationData);
      const newReservation = response.data;
      
      setReservations(prev => [...prev, newReservation]);
      updateStats(newReservation);
      
      showToast({
        type: 'success',
        message: '예약이 성공적으로 생성되었습니다.'
      });
      
      return newReservation;
    } catch (error) {
      showToast({
        type: 'error',
        message: error.response?.data?.message || '예약 생성에 실패했습니다.'
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [showToast, updateStats]);

  // 예약 취소
  const cancelReservation = useCallback(async (reservationId) => {
    setLoading(true);
    try {
      const response = await api.post(`/reservations/${reservationId}/cancel`);
      const updatedReservation = response.data;
      
      handleReservationUpdate(updatedReservation);
      
      showToast({
        type: 'success',
        message: '예약이 취소되었습니다.'
      });
      
      return updatedReservation;
    } catch (error) {
      showToast({
        type: 'error',
        message: error.response?.data?.message || '예약 취소에 실패했습니다.'
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [handleReservationUpdate, showToast]);

  // 예약 가능 여부 확인
  const checkAvailability = useCallback(async (params) => {
    try {
      const response = await api.get('/reservations/availability', { params });
      return response.data;
    } catch (error) {
      showToast({
        type: 'error',
        message: '좌석 조회에 실패했습니다.'
      });
      throw error;
    }
  }, [showToast]);

  const value = {
    currentReservation,
    setCurrentReservation,
    reservations,
    setReservations,
    loading,
    stats,
    createReservation,
    cancelReservation,
    checkAvailability,
    handleReservationUpdate
  };

  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  );
}; 