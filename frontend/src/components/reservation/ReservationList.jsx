import React, { useState, useEffect } from 'react';
import { useReservation } from '../../hooks/useReservation';
import { formatDate, formatTime } from '../../utils/dateUtils';

export const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getMyReservations, cancelReservation } = useReservation();
  const [cancelReason, setCancelReason] = useState('');
  const [selectedReservation, setSelectedReservation] = useState(null);

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    try {
      const data = await getMyReservations();
      setReservations(data);
    } catch (error) {
      console.error('예약 목록 로딩 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = (reservation) => {
    setSelectedReservation(reservation);
  };

  const handleCancelConfirm = async () => {
    try {
      await cancelReservation(selectedReservation.id, cancelReason);
      await loadReservations();
      setSelectedReservation(null);
      setCancelReason('');
    } catch (error) {
      console.error('예약 취소 실패:', error);
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { text: '승인 대기', class: 'badge-warning' },
      approved: { text: '승인됨', class: 'badge-success' },
      rejected: { text: '거절됨', class: 'badge-danger' },
      cancelled: { text: '취소됨', class: 'badge-secondary' }
    };
    return statusMap[status] || { text: status, class: 'badge-primary' };
  };

  if (loading) return <div className="loading">로딩 중...</div>;

  return (
    <div className="reservation-list">
      <h2>나의 예약 목록</h2>
      
      {reservations.length === 0 ? (
        <div className="no-reservations">예약 내역이 없습니다.</div>
      ) : (
        <div className="reservations-grid">
          {reservations.map(reservation => (
            <div key={reservation.id} className="reservation-card">
              <div className="card-header">
                <span className={`status-badge ${getStatusBadge(reservation.status).class}`}>
                  {getStatusBadge(reservation.status).text}
                </span>
                <span className="date">{formatDate(reservation.date)}</span>
              </div>
              
              <div className="card-body">
                <div className="seat-info">
                  <i className="material-icons">chair</i>
                  <span>{reservation.seatInfo}</span>
                </div>
                <div className="time-info">
                  <i className="material-icons">schedule</i>
                  <span>{formatTime(reservation.startTime)} - {formatTime(reservation.endTime)}</span>
                </div>
                <div className="purpose-info">
                  <i className="material-icons">info</i>
                  <span>{reservation.purpose}</span>
                </div>
              </div>

              {reservation.status === 'approved' && (
                <button 
                  className="cancel-button"
                  onClick={() => handleCancelClick(reservation)}
                >
                  예약 취소
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {selectedReservation && (
        <div className="modal">
          <div className="modal-content">
            <h3>예약 취소</h3>
            <textarea
              placeholder="취소 사유를 입력해주세요"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              required
            />
            <div className="modal-actions">
              <button onClick={handleCancelConfirm} className="confirm-button">
                확인
              </button>
              <button 
                onClick={() => setSelectedReservation(null)} 
                className="cancel-button"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 