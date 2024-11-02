import React from 'react';
import { useReservation } from '../../hooks/useReservation';
import { formatDate, formatTime } from '../../utils/dateUtils';

export const ReservationDetail = ({ reservation, onClose }) => {
  const { status, date, startTime, endTime, seatInfo, purpose, userName, studentId } = reservation;

  const getStatusColor = (status) => {
    const colors = {
      pending: '#FFA500',   // 주황색
      approved: '#28A745',  // 초록색
      rejected: '#DC3545',  // 빨간색
      cancelled: '#6C757D'  // 회색
    };
    return colors[status] || '#000000';
  };

  return (
    <div className="reservation-detail">
      <div className="detail-header">
        <h3>예약 상세 정보</h3>
        <button onClick={onClose} className="close-button">
          <i className="material-icons">close</i>
        </button>
      </div>

      <div className="detail-content">
        <div className="status-section">
          <span 
            className="status-badge"
            style={{ backgroundColor: getStatusColor(status) }}
          >
            {status === 'pending' && '승인 대기'}
            {status === 'approved' && '승인됨'}
            {status === 'rejected' && '거절됨'}
            {status === 'cancelled' && '취소됨'}
          </span>
        </div>

        <div className="info-section">
          <div className="info-item">
            <i className="material-icons">event</i>
            <span>예약 일자: {formatDate(date)}</span>
          </div>
          
          <div className="info-item">
            <i className="material-icons">schedule</i>
            <span>예약 시간: {formatTime(startTime)} - {formatTime(endTime)}</span>
          </div>

          <div className="info-item">
            <i className="material-icons">chair</i>
            <span>좌석 정보: {seatInfo}</span>
          </div>

          <div className="info-item">
            <i className="material-icons">person</i>
            <span>예약자: {userName} ({studentId})</span>
          </div>

          <div className="info-item">
            <i className="material-icons">info</i>
            <span>예약 목적: {purpose}</span>
          </div>
        </div>

        {reservation.rejectReason && (
          <div className="reason-section">
            <h4>거절 사유</h4>
            <p>{reservation.rejectReason}</p>
          </div>
        )}

        {reservation.cancelReason && (
          <div className="reason-section">
            <h4>취소 사유</h4>
            <p>{reservation.cancelReason}</p>
          </div>
        )}
      </div>
    </div>
  );
}; 