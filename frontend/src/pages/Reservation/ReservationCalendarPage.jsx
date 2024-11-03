import React, { useState, useEffect } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Calendar } from '../../components/common/Calendar';
import { Loading } from '../../components/common/Loading';
import { useReservation } from '../../hooks/useReservation';
import { useCalendar } from '../../hooks/useCalendar';
import { formatDate } from '../../utils/dateUtils';

export const ReservationCalendarPage = () => {
  const { getReservationsByDate } = useReservation();
  const { currentDate, setCurrentDate, view, setView } = useCalendar();
  const [reservations, setReservations] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadReservations();
  }, [currentDate, view]);

  const loadReservations = async () => {
    setLoading(true);
    try {
      const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      
      const response = await getReservationsByDate(startDate, endDate);
      setReservations(response);
    } catch (error) {
      console.error('예약 목록 로딩 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const getReservationsForDate = (date) => {
    return reservations.filter(reservation => 
      formatDate(new Date(reservation.date)) === formatDate(date)
    );
  };

  if (loading && !reservations.length) {
    return <Loading />;
  }

  return (
    <div className="reservation-calendar-page">
      <div className="calendar-container">
        <Card className="calendar-card">
          <div className="calendar-header">
            <h1>예약 캘린더</h1>
            <div className="view-controls">
              <Button
                variant={view === 'month' ? 'primary' : 'text'}
                onClick={() => setView('month')}
              >
                월간
              </Button>
              <Button
                variant={view === 'week' ? 'primary' : 'text'}
                onClick={() => setView('week')}
              >
                주간
              </Button>
            </div>
          </div>

          <Calendar
            value={currentDate}
            onChange={setCurrentDate}
            onDateSelect={handleDateSelect}
            view={view}
            events={reservations.map(reservation => ({
              id: reservation.id,
              title: `${reservation.seat.name} - ${reservation.user.name}`,
              start: new Date(`${reservation.date}T${reservation.startTime}`),
              end: new Date(`${reservation.date}T${reservation.endTime}`),
              status: reservation.status
            }))}
          />
        </Card>
      </div>

      {selectedDate && (
        <Card className="daily-schedule">
          <div className="schedule-header">
            <h2>{formatDate(selectedDate)} 예약 현황</h2>
          </div>

          <div className="schedule-list">
            {getReservationsForDate(selectedDate).length === 0 ? (
              <div className="empty-schedule">
                <i className="material-icons">event_busy</i>
                <p>예약된 일정이 없습니다.</p>
              </div>
            ) : (
              getReservationsForDate(selectedDate).map(reservation => (
                <div 
                  key={reservation.id} 
                  className={`schedule-item ${reservation.status}`}
                >
                  <div className="time-slot">
                    {reservation.startTime} - {reservation.endTime}
                  </div>
                  <div className="reservation-info">
                    <h3>{reservation.seat.name}</h3>
                    <p>
                      <span className="user">{reservation.user.name}</span>
                      <span className="purpose">{reservation.purpose}</span>
                    </p>
                  </div>
                  <span className={`status-badge ${reservation.status}`}>
                    {reservation.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </Card>
      )}

      <style jsx>{`
        .reservation-calendar-page {
          padding: 2rem;
          min-height: calc(100vh - var(--header-height));
          background-color: var(--background);
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
        }

        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .calendar-header h1 {
          margin: 0;
          color: var(--text-primary);
        }

        .view-controls {
          display: flex;
          gap: 0.5rem;
        }

        .daily-schedule {
          height: fit-content;
          position: sticky;
          top: calc(var(--header-height) + 2rem);
        }

        .schedule-header {
          margin-bottom: 1.5rem;
        }

        .schedule-header h2 {
          margin: 0;
          color: var(--text-primary);
        }

        .empty-schedule {
          text-align: center;
          padding: 3rem 0;
          color: var(--text-secondary);
        }

        .empty-schedule i {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .empty-schedule p {
          margin: 0;
        }

        .schedule-item {
          display: flex;
          align-items: flex-start;
          padding: 1rem;
          border-left: 4px solid var(--border-color);
          margin-bottom: 1rem;
        }

        .schedule-item.pending {
          border-left-color: var(--warning);
        }

        .schedule-item.approved {
          border-left-color: var(--success);
        }

        .schedule-item.rejected {
          border-left-color: var(--error);
        }

        .schedule-item.cancelled {
          border-left-color: var(--text-secondary);
        }

        .time-slot {
          flex: 0 0 120px;
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .reservation-info {
          flex: 1;
        }

        .reservation-info h3 {
          margin: 0 0 0.5rem 0;
          color: var(--text-primary);
        }

        .reservation-info p {
          margin: 0;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .user {
          margin-right: 1rem;
        }

        .status-badge {
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          text-transform: uppercase;
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
          background-color: var(--gray-light);
          color: var(--text-secondary);
        }

        @media (max-width: 1200px) {
          .reservation-calendar-page {
            grid-template-columns: 1fr;
          }

          .daily-schedule {
            position: static;
          }
        }

        @media (max-width: 768px) {
          .reservation-calendar-page {
            padding: 1rem;
          }

          .calendar-header {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .time-slot {
            flex: 0 0 100px;
          }
        }
      `}</style>
    </div>
  );
}; 