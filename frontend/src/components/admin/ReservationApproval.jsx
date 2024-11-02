import React, { useState, useEffect } from 'react';
import { api } from '../../api/client';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Loading } from '../common/Loading';
import { useToast } from '../../hooks/useToast';

export const ReservationApproval = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const { showToast } = useToast();

  const fetchPendingReservations = async () => {
    try {
      const response = await api.get('/admin/reservations/pending');
      setReservations(response.data);
    } catch (error) {
      showToast({
        type: 'error',
        message: '예약 목록을 불러오는데 실패했습니다.'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingReservations();
  }, []);

  const handleApprove = async (reservationId) => {
    try {
      await api.put(`/admin/reservations/${reservationId}/approve`);
      showToast({
        type: 'success',
        message: '예약이 승인되었습니다.'
      });
      fetchPendingReservations();
    } catch (error) {
      showToast({
        type: 'error',
        message: '예약 승인에 실패했습니다.'
      });
    }
  };

  const handleReject = async () => {
    if (!selectedReservation) return;

    try {
      await api.put(`/admin/reservations/${selectedReservation.id}/reject`, {
        reason: rejectReason
      });
      showToast({
        type: 'success',
        message: '예약이 거절되었습니다.'
      });
      setShowRejectModal(false);
      setRejectReason('');
      setSelectedReservation(null);
      fetchPendingReservations();
    } catch (error) {
      showToast({
        type: 'error',
        message: '예약 거절에 실패했습니다.'
      });
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="reservation-approval">
      <h1>예약 승인 관리</h1>

      {reservations.length === 0 ? (
        <div className="no-reservations">
          승인 대기중인 예약이 없습니다.
        </div>
      ) : (
        <div className="reservations-list">
          {reservations.map(reservation => (
            <div key={reservation.id} className="reservation-card">
              <div className="reservation-info">
                <div className="user-info">
                  <h3>{reservation.user.name}</h3>
                  <p className="student-id">{reservation.user.studentId}</p>
                </div>
                
                <div className="reservation-details">
                  <p>
                    <i className="material-icons">event</i>
                    {new Date(reservation.date).toLocaleDateString()}
                  </p>
                  <p>
                    <i className="material-icons">schedule</i>
                    {reservation.startTime} - {reservation.endTime}
                  </p>
                  <p>
                    <i className="material-icons">chair</i>
                    {reservation.seatType} {reservation.seatNumber}
                  </p>
                  <p>
                    <i className="material-icons">description</i>
                    {reservation.purpose}
                  </p>
                </div>
              </div>

              <div className="action-buttons">
                <Button
                  variant="primary"
                  onClick={() => handleApprove(reservation.id)}
                >
                  승인
                </Button>
                <Button
                  variant="error"
                  onClick={() => {
                    setSelectedReservation(reservation);
                    setShowRejectModal(true);
                  }}
                >
                  거절
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={showRejectModal}
        onClose={() => {
          setShowRejectModal(false);
          setRejectReason('');
          setSelectedReservation(null);
        }}
        title="예약 거절"
        footer={
          <>
            <Button
              variant="text"
              onClick={() => {
                setShowRejectModal(false);
                setRejectReason('');
                setSelectedReservation(null);
              }}
            >
              취소
            </Button>
            <Button
              variant="error"
              onClick={handleReject}
              disabled={!rejectReason.trim()}
            >
              거절
            </Button>
          </>
        }
      >
        <div className="reject-form">
          <p>다음 예약을 거절하시겠습니까?</p>
          {selectedReservation && (
            <div className="selected-reservation-info">
              <p>예약자: {selectedReservation.user.name}</p>
              <p>좌석: {selectedReservation.seatType} {selectedReservation.seatNumber}</p>
              <p>시간: {selectedReservation.startTime} - {selectedReservation.endTime}</p>
            </div>
          )}
          <Input
            label="거절 사유"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            multiline
            rows={3}
            required
            placeholder="거절 사유를 입력해주세요"
          />
        </div>
      </Modal>

      <style jsx>{`
        .reservation-approval {
          padding: 2rem;
        }

        h1 {
          margin-bottom: 2rem;
          color: var(--text-primary);
        }

        .no-reservations {
          text-align: center;
          padding: 3rem;
          background: white;
          border-radius: 8px;
          color: var(--text-secondary);
        }

        .reservations-list {
          display: grid;
          gap: 1rem;
        }

        .reservation-card {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        .reservation-info {
          flex: 1;
        }

        .user-info {
          margin-bottom: 1rem;
        }

        .user-info h3 {
          margin: 0;
          color: var(--text-primary);
        }

        .student-id {
          color: var(--text-secondary);
          margin: 0.25rem 0;
        }

        .reservation-details {
          display: grid;
          gap: 0.5rem;
        }

        .reservation-details p {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 0;
          color: var(--text-secondary);
        }

        .reservation-details i {
          font-size: 1.25rem;
          color: var(--burgundy-red);
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .selected-reservation-info {
          background: var(--background-paper);
          padding: 1rem;
          border-radius: 4px;
          margin: 1rem 0;
        }

        .selected-reservation-info p {
          margin: 0.25rem 0;
          color: var(--text-secondary);
        }

        @media (max-width: 768px) {
          .reservation-approval {
            padding: 1rem;
          }

          .reservation-card {
            flex-direction: column;
            align-items: stretch;
          }

          .action-buttons {
            justify-content: flex-end;
            margin-top: 1rem;
          }
        }
      `}</style>
    </div>
  );
}; 