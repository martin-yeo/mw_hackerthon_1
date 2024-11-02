import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReservationCalendar } from '../../components/reservation/ReservationCalendar';
import { ReservationDetail } from '../../components/reservation/ReservationDetail';

export const Calendar = () => {
  const navigate = useNavigate();
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [viewType, setViewType] = useState('month');

  const handleEventClick = (event) => {
    setSelectedReservation(event.resource);
  };

  const viewOptions = [
    { value: 'month', label: '월간' },
    { value: 'week', label: '주간' },
    { value: 'day', label: '일간' }
  ];

  return (
    <div className="calendar-page">
      <div className="page-header">
        <h1>예약 캘린더</h1>
        <div className="header-actions">
          <div className="view-selector">
            {viewOptions.map(option => (
              <button
                key={option.value}
                className={`view-button ${viewType === option.value ? 'active' : ''}`}
                onClick={() => setViewType(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>

          <button 
            className="new-reservation-button"
            onClick={() => navigate('/reservations/new')}
          >
            <i className="material-icons">add</i>
            새 예약
          </button>
        </div>
      </div>

      <div className="calendar-container">
        <div className="legend">
          <div className="legend-item">
            <span className="color-box approved"></span>
            <span>승인됨</span>
          </div>
          <div className="legend-item">
            <span className="color-box pending"></span>
            <span>승인 대기</span>
          </div>
          <div className="legend-item">
            <span className="color-box rejected"></span>
            <span>거절됨</span>
          </div>
        </div>

        <ReservationCalendar
          view={viewType}
          onEventClick={handleEventClick}
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

      <style jsx>{`
        .color-box {
          width: 16px;
          height: 16px;
          display: inline-block;
          margin-right: 8px;
          border-radius: 4px;
        }
        .approved { background-color: #800020; }
        .pending { background-color: #FFA500; }
        .rejected { background-color: #DC3545; }
      `}</style>
    </div>
  );
}; 