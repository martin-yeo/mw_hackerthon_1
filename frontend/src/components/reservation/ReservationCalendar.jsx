import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/ko';
import { useReservation } from '../../hooks/useReservation';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('ko');
const localizer = momentLocalizer(moment);

export const ReservationCalendar = () => {
  const [events, setEvents] = useState([]);
  const { getReservations } = useReservation();

  useEffect(() => {
    const loadReservations = async () => {
      const reservations = await getReservations();
      const formattedEvents = reservations.map(reservation => ({
        id: reservation.id,
        title: `${reservation.seatInfo} - ${reservation.userName}`,
        start: new Date(`${reservation.date}T${reservation.startTime}`),
        end: new Date(`${reservation.date}T${reservation.endTime}`),
        resource: reservation
      }));
      setEvents(formattedEvents);
    };

    loadReservations();
  }, []);

  const eventStyleGetter = (event) => {
    const style = {
      backgroundColor: '#800020', // 버건디 컬러
      borderRadius: '5px',
      color: 'white',
      border: 'none'
    };
    return { style };
  };

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        eventPropGetter={eventStyleGetter}
        messages={{
          next: "다음",
          previous: "이전",
          today: "오늘",
          month: "월",
          week: "주",
          day: "일",
          agenda: "일정"
        }}
        views={['month', 'week', 'day']}
      />
    </div>
  );
}; 