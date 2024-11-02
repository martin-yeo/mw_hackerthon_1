import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Loading } from '../common/Loading';
import { useReservation } from '../../hooks/useReservation';
import { formatDate, formatTime } from '../../utils/dateUtils';

export const ReservationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getReservationById, cancelReservation, isLoading } = useReservation();
  const [reservation, setReservation] = useState(null);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  useEffect(() => {
    loadReservation();
  }, [id]);

  const loadReservation = async () => {
    try {
      const data = await getReservationById(id);
      setReservation(data);
    } catch (error) {
      console.error('Failed to load reservation:', error);
      navigate('/reservations');
    }
  };

  const handleCancelClick = () => {
    setCancelModalOpen(true);
  };

  const handleCancelConfirm = async () => {
    try {
      await cancelReservation(id, cancelReason);
      setCancelModalOpen(false);
      loadReservation();
    } catch (error) {
      console.error('Failed to cancel reservation:', error);
    }
  };

  if (isLoading || !reservation) {
    return <Loading />;
  }

  return (
    <div className="reservation-detail">
      <Card>
        <div className="detail-header">
          <h2>예약 상세 정보</h2>
          <div className={`status-badge ${reservation.status}`}>
            {reservation.status === 'pending' && '승인 대기'}
            {reservation.status === 'approved' && '승인됨'}
            {reservation.status === 'rejected' && '거절됨'}
            {reservation.status === 'cancelled' && '취소됨'}
          </div>
        </div>

        <div className="detail-content">
          <div className="info-group">
            <h3>예약 정보</h3>
            <div className="info-row">
              <label>예약 날짜</label>
              <span>{formatDate(reservation.date)}</span>
            </div>
            <div className="info-row">
              <label>예약 시간</label>
              <span>{formatTime(reservation.startTime)} - {formatTime(reservation.endTime)}</span>
            </div>
            <div className="info-row">
              <label>좌석</label>
              <span>{reservation.seat.name}</span>
            </div>
            <div className="info-row">
              <label>예약 목적</label>
              <span>{reservation.purpose}</span>
            </div>
          </div>

          <div className="info-group">
            <h3>예약자 정보</h3>
            <div className="info-row">
              <label>이름</label>
              <span>{reservation.user.name}</span>
            </div>
            <div className="info-row">
              <label>학번</label>
              <span>{reservation.user.studentId}</span>
            </div>
            <div className="info-row">
              <label>연락처</label>
              <span>{reservation.user.phone}</span>
            </div>
          </div>

          {reservation.status === 'rejected' && (
            <div className="info-group">
              <h3>거절 사유</h3>
              <p className="reason">{reservation.rejectReason}</p>
            </div>
          )}

          {reservation.status === 'cancelled' && (
            <div className="info-group">
              <h3>취소 사유</h3>
              <p className="reason">{reservation.cancelReason}</p>
            </div>
          )}
        </div>

        <div className="detail-actions">
          <Button 
            variant="secondary"
            onClick={() => navigate('/reservations')}
          >
            목록으로
          </Button>
          {reservation.status === 'approved' && (
            <Button 
              variant="danger"
              onClick={handleCancelClick}
            >
              예약 취소
            </Button>
          )}
        </div>
      </Card>

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
        .reservation-detail {
          max-width: 800px;
          margin: 2rem auto;
          padding: 0 1rem;
        }

        .detail-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .detail-header h2 {
          margin: 0;
        }

        .status-badge {
          padding: 0.5rem 1rem;
          border-radius: 4px;
          font-weight: 500;
        }

        .status-badge.pending {
          background-color: var(--warning-light);
          color: var(--warning);
        }

        .status-badge.approved {
          background-color: var(--success-light);
          color: var(--success);
        }

        .status-badge.rejected {
          background-color: var(--error-light);
          color: var(--error);
        }

        .status-badge.cancelled {
          background-color: var(--burgundy-gray);
          color: white;
        }

        .detail-content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .info-group h3 {
          margin: 0 0 1rem 0;
          color: var(--burgundy-red);
        }

        .info-row {
          display: flex;
          margin-bottom: 0.5rem;
        }

        .info-row label {
          width: 120px;
          color: var(--text-secondary);
        }

        .reason {
          background-color: var(--background);
          padding: 1rem;
          border-radius: 4px;
          margin: 0;
        }

        .detail-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 2rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
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
          .info-row {
            flex-direction: column;
          }

          .info-row label {
            width: auto;
            margin-bottom: 0.25rem;
          }
        }
      `}</style>
    </div>
  );
}; 