import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Loading } from '../common/Loading';
import { useReservation } from '../../hooks/useReservation';
import { formatDate, formatTime } from '../../utils/dateUtils';

export const ReservationList = () => {
  const navigate = useNavigate();
  const { getMyReservations, cancelReservation, isLoading } = useReservation();
  const [reservations, setReservations] = useState([]);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [cancelReason, setCancelReason] = useState('');

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    try {
      const data = await getMyReservations();
      setReservations(data);
    } catch (error) {
      console.error('Failed to load reservations:', error);
    }
  };

  const handleCancelClick = (reservation) => {
    setSelectedReservation(reservation);
    setCancelModalOpen(true);
  };

  const handleCancelConfirm = async () => {
    try {
      await cancelReservation(selectedReservation.id, cancelReason);
      setCancelModalOpen(false);
      setSelectedReservation(null);
      setCancelReason('');
      loadReservations();
    } catch (error) {
      console.error('Failed to cancel reservation:', error);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending': return 'badge-warning';
      case 'approved': return 'badge-success';
      case 'rejected': return 'badge-error';
      case 'cancelled': return 'badge-secondary';
      default: return '';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return '승인 대기';
      case 'approved': return '승인됨';
      case 'rejected': return '거절됨';
      case 'cancelled': return '취소됨';
      default: return status;
    }
  };

  return (
    <div className="reservation-list">
      <div className="list-header">
        <h2>내 예약 목록</h2>
        <Button onClick={() => navigate('/reservations/new')}>
          새 예약
        </Button>
      </div>

      {isLoading ? (
        <Loading />
      ) : reservations.length > 0 ? (
        <div className="reservations-grid">
          {reservations.map(reservation => (
            <Card key={reservation.id} className="reservation-card">
              <div className="card-header">
                <span className={`status-badge ${getStatusBadgeClass(reservation.status)}`}>
                  {getStatusText(reservation.status)}
                </span>
                <span className="date">{formatDate(reservation.date)}</span>
              </div>

              <div className="card-body">
                <div className="info-row">
                  <i className="material-icons">access_time</i>
                  <span>
                    {formatTime(reservation.startTime)} - {formatTime(reservation.endTime)}
                  </span>
                </div>
                <div className="info-row">
                  <i className="material-icons">chair</i>
                  <span>{reservation.seat.name}</span>
                </div>
                <div className="info-row">
                  <i className="material-icons">info</i>
                  <span>{reservation.purpose}</span>
                </div>
              </div>

              {reservation.status === 'approved' && (
                <div className="card-actions">
                  <Button 
                    variant="danger"
                    onClick={() => handleCancelClick(reservation)}
                  >
                    예약 취소
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <Card className="empty-state">
          <i className="material-icons">event_busy</i>
          <p>예약 내역이 없습니다.</p>
          <Button onClick={() => navigate('/reservations/new')}>
            첫 예약하기
          </Button>
        </Card>
      )}

      {cancelModalOpen && (
        <div className="modal-overlay">
          <Card className="cancel-modal">
            <h3>예약 취소</h3>
            <p>정말로 이 예약을 취소하시겠습니까?</p>
            <textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="취소 사유를 입력해주세요"
              rows={4}
            />
            <div className="modal-actions">
              <Button 
                variant="secondary"
                onClick={() => {
                  setCancelModalOpen(false);
                  setSelectedReservation(null);
                  setCancelReason('');
                }}
              >
                취소
              </Button>
              <Button 
                variant="danger"
                onClick={handleCancelConfirm}
                disabled={!cancelReason.trim()}
              >
                확인
              </Button>
            </div>
          </Card>
        </div>
      )}

      <style jsx>{`
        .reservation-list {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .list-header h2 {
          margin: 0;
        }

        .reservations-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .reservation-card {
          display: flex;
          flex-direction: column;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .status-badge {
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .badge-warning {
          background-color: var(--warning-light);
          color: var(--warning);
        }

        .badge-success {
          background-color: var(--success-light);
          color: var(--success);
        }

        .badge-error {
          background-color: var(--error-light);
          color: var(--error);
        }

        .badge-secondary {
          background-color: var(--burgundy-gray);
          color: white;
        }

        .date {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .info-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .info-row i {
          color: var(--burgundy-gray);
          font-size: 1.25rem;
        }

        .card-actions {
          margin-top: auto;
          padding-top: 1rem;
        }

        .empty-state {
          text-align: center;
          padding: 3rem;
        }

        .empty-state i {
          font-size: 4rem;
          color: var(--text-secondary);
          margin-bottom: 1rem;
        }

        .empty-state p {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: var(--z-index-modal);
        }

        .cancel-modal {
          width: 90%;
          max-width: 500px;
        }

        .cancel-modal h3 {
          margin-top: 0;
        }

        .cancel-modal textarea {
          width: 100%;
          margin: 1rem 0;
          padding: 0.5rem;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          resize: vertical;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
        }

        @media (max-width: 768px) {
          .reservation-list {
            padding: 1rem;
          }

          .list-header {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}; 