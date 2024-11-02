import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReservationList } from '../../components/reservation/ReservationList';
import { ReservationDetail } from '../../components/reservation/ReservationDetail';

export const List = () => {
  const navigate = useNavigate();
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const statusOptions = [
    { value: 'all', label: '전체' },
    { value: 'pending', label: '승인 대기' },
    { value: 'approved', label: '승인됨' },
    { value: 'rejected', label: '거절됨' },
    { value: 'cancelled', label: '취소됨' }
  ];

  return (
    <div className="reservation-list-page">
      <div className="page-header">
        <h1>예약 목록</h1>
        <div className="header-actions">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="status-filter"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          <button 
            className="new-reservation-button"
            onClick={() => navigate('/reservations/new')}
          >
            <i className="material-icons">add</i>
            새 예약
          </button>
        </div>
      </div>

      <div className="list-container">
        <ReservationList
          statusFilter={filterStatus}
          onReservationClick={setSelectedReservation}
        />
      </div>

      {selectedReservation && (
        <div className="modal">
          <ReservationDetail
            reservation={selectedReservation}
            onClose={() => setSelectedReservation(null)}
          />
        </div>
      )}
    </div>
  );
}; 