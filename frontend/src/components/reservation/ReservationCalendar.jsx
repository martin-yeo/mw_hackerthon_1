import React, { useEffect } from 'react';
import { useCalendar } from '../../hooks/useCalendar';
import { Loading } from '../common/Loading';

export const ReservationCalendar = () => {
  const { events, loading, error, fetchEvents } = useCalendar();

  useEffect(() => {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);
    
    fetchEvents(startDate, endDate);
  }, []);

  if (loading) return <Loading />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="calendar-container">
      {/* 캘린더 렌더링 로직 */}
      {events.map(event => (
        <div key={event.id} className="calendar-event">
          <h3>{event.summary}</h3>
          <p>{new Date(event.start.dateTime).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}; 