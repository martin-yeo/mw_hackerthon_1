import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useReservation } from '../../hooks/useReservation';
import { useAuth } from '../../hooks/useAuth';
import { Loading } from '../../components/common/Loading';
import { Confirm } from '../../components/common/Confirm';
import { useToast } from '../../hooks/useToast';
import { formatDateTime, calculateDuration } from '../../utils/dateUtils';
import { RESERVATION_STATUS_KO } from '../../utils/constants';

export const ReservationDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getReservation, cancelReservation } = useReservation();
  const { showToast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [reservation, setReservation] = useState(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  useEffect(() => {
    fetchReservation();
  }, [id]);

  const fetchReservation = async () => {
    try {
      const data = await getReservation(id);
      setReservation(data);
    } catch (error) {
      showToast({
        type: 'error',
        message: '예약 정보를 불러오는데 실패했습니다.'
      });
      navigate('/reservations');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelReservation = async () => {
    try {
      await cancelReservation(id);
      showToast({
        type: 'success',
        message: '예약이 취소되었습니다.'
      });
      fetchReservation();
    } catch (error) {
      showToast({
        type: 'error',
        message: '예약 취소에 실패했습니다.'
      });
    } finally {
      setShowCancelConfirm(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!reservation) {
    return null;
  }

  const canCancel = reservation.status === 'pending' && 
                    reservation.userId === user?.id;

  const statusColor = {
    pending: 'warning',
    approved: 'success',
    rejected: 'error',
    cancelled: 'default'
  }[reservation.status];

  return (
    <div className="reservation-detail-container">
      <div className="page-header">
        <button 
          className="button text"
          onClick={() => navigate(-1)}
        >
          <i className="material-icons">arrow_back</i>
          돌아가기
        </button>
        <div className="header-actions">
          {canCancel && (
            <button 
              className="button danger"
              onClick={() => setShowCancelConfirm(true)}
            >
              예약 취소
            </button>
          )}
        </div>
      </div>

      <div className="detail-card">
        <div className="card-header">
          <h1>예약 상세 정보</h1>
          <span className={`status-badge ${statusColor}`}>
            {RESERVATION_STATUS_KO[reservation.status]}
          </span>
        </div>

        <div className="info-grid">
          <div className="info-section">
            <h2>예약 정보</h2>
            
            <div className="info-row">
              <div className="info-item">
                <label>예약 번호</label>
                <p>{reservation.reservationNumber}</p>
              </div>
              <div className="info-item">
                <label>예약 상태</label>
                <p className={`status ${statusColor}`}>
                  {RESERVATION_STATUS_KO[reservation.status]}
                </p>
              </div>
            </div>

            <div className="info-row">
              <div className="info-item">
                <label>예약 일시</label>
                <p>{formatDateTime(reservation.date, reservation.startTime)}</p>
              </div>
              <div className="info-item">
                <label>이용 시간</label>
                <p>{calculateDuration(reservation.startTime, reservation.endTime)}</p>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h2>좌석 정보</h2>
            
            <div className="info-row">
              <div className="info-item">
                <label>좌석 유형</label>
                <p>{reservation.seatType}</p>
              </div>
              <div className="info-item">
                <label>좌석 번호</label>
                <p>좌석 {reservation.seatNumber}</p>
              </div>
            </div>

            {reservation.seatType === '팀프로젝트석' && (
              <div className="info-row">
                <div className="info-item">
                  <label>팀 인원</label>
                  <p>{reservation.teamSize}명</p>
                </div>
                {reservation.teamMembers && (
                  <div className="info-item">
                    <label>팀원</label>
                    <p>{reservation.teamMembers.join(', ')}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="info-section">
            <h2>예약 목적</h2>
            <p className="purpose-text">
              {reservation.purpose}
              {reservation.customPurpose && (
                <>
                  <br />
                  {reservation.customPurpose}
                </>
              )}
            </p>
          </div>

          {reservation.status === 'rejected' && reservation.rejectionReason && (
            <div className="info-section">
              <h2>반려 사유</h2>
              <p className="rejection-reason">
                {reservation.rejectionReason}
              </p>
            </div>
          )}
        </div>

        {reservation.notes && (
          <div className="notes-section">
            <h2>관리자 메모</h2>
            <p>{reservation.notes}</p>
          </div>
        )}
      </div>

      <Confirm
        isOpen={showCancelConfirm}
        onClose={() => setShowCancelConfirm(false)}
        onConfirm={handleCancelReservation}
        title="예약 취소"
        message="정말 이 예약을 취소하시겠습니까? 이 작업은 되돌릴 수 없습니다."
        confirmText="예약 취소"
        type="danger"
      />
    </div>
  );
}; 