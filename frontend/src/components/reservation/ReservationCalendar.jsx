import React, { useState, useEffect } from 'react';
import { useReservation } from '../../hooks/useReservation';
import { Card } from '../common/Card';
import { Loading } from '../common/Loading';
import { formatDate, getMonthDates, isSameDay } from '../../utils/dateUtils';

export const ReservationCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarDates, setCalendarDates] = useState([]);
  const { getReservations, isLoading } = useReservation();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const dates = getMonthDates(
      currentDate.getFullYear(),
      currentDate.getMonth()
    );
    setCalendarDates(dates);
  }, [currentDate]);

  useEffect(() => {
    if (selectedDate) {
      loadReservations(selectedDate);
    }
  }, [selectedDate]);

  const loadReservations = async (date) => {
    try {
      const data = await getReservations({ date: date.toISOString().split('T')[0] });
      setReservations(data);
    } catch (error) {
      console.error('Failed to load reservations:', error);
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>
          <i className="material-icons">chevron_left</i>
        </button>
        <h2>
          {currentDate.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long'
          })}
        </h2>
        <button onClick={handleNextMonth}>
          <i className="material-icons">chevron_right</i>
        </button>
      </div>

      <div className="calendar-grid">
        {['일', '월', '화', '수', '목', '금', '토'].map(day => (
          <div key={day} className="calendar-day-header">
            {day}
          </div>
        ))}
        
        {calendarDates.map((dateObj, index) => (
          <div
            key={index}
            className={`calendar-date ${
              !dateObj.isCurrentMonth ? 'other-month' : ''
            } ${
              selectedDate && isSameDay(dateObj.date, selectedDate)
                ? 'selected'
                : ''
            }`}
            onClick={() => handleDateClick(dateObj.date)}
          >
            <span>{dateObj.date.getDate()}</span>
          </div>
        ))}
      </div>

      {selectedDate && (
        <Card className="reservations-list">
          <h3>{formatDate(selectedDate)} 예약 현황</h3>
          {isLoading ? (
            <Loading />
          ) : reservations.length > 0 ? (
            <ul>
              {reservations.map(reservation => (
                <li key={reservation.id}>
                  <span className="time">
                    {reservation.startTime} - {reservation.endTime}
                  </span>
                  <span className="seat">{reservation.seat.name}</span>
                  <span className={`status ${reservation.status}`}>
                    {reservation.status}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-reservations">예약이 없습니다.</p>
          )}
        </Card>
      )}

      <style jsx>{`
        .calendar-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .calendar-header button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
        }

        .calendar-header h2 {
          margin: 0;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 1px;
          background-color: var(--border-color);
          border: 1px solid var(--border-color);
        }

        .calendar-day-header {
          background-color: var(--background-paper);
          padding: 0.5rem;
          text-align: center;
          font-weight: 500;
        }

        .calendar-date {
          background-color: var(--background-paper);
          padding: 1rem;
          text-align: center;
          cursor: pointer;
          min-height: 80px;
        }

        .calendar-date:hover {
          background-color: var(--background-hover);
        }

        .calendar-date.other-month {
          color: var(--text-secondary);
        }

        .calendar-date.selected {
          background-color: var(--burgundy-red);
          color: white;
        }

        .reservations-list {
          margin-top: 2rem;
        }

        .reservations-list h3 {
          margin-top: 0;
          margin-bottom: 1rem;
        }

        .reservations-list ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .reservations-list li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 0;
          border-bottom: 1px solid var(--border-color);
        }

        .reservations-list li:last-child {
          border-bottom: none;
        }

        .time {
          font-weight: 500;
        }

        .seat {
          color: var(--text-secondary);
        }

        .status {
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.875rem;
        }

        .status.pending {
          background-color: var(--warning-light);
          color: var(--warning);
        }

        .status.approved {
          background-color: var(--success-light);
          color: var(--success);
        }

        .status.rejected {
          background-color: var(--error-light);
          color: var(--error);
        }

        .no-reservations {
          text-align: center;
          color: var(--text-secondary);
          margin: 2rem 0;
        }

        @media (max-width: 768px) {
          .calendar-date {
            padding: 0.5rem;
            min-height: 60px;
          }
        }
      `}</style>
    </div>
  );
}; 