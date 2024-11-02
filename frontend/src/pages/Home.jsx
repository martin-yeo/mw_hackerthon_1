import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useReservation } from '../hooks/useReservation';
import { ReservationCalendar } from '../components/reservation/ReservationCalendar';

export const Home = () => {
  const { user } = useAuth();
  const { getUpcomingReservation } = useReservation();
  const [nextReservation, setNextReservation] = useState(null);

  useEffect(() => {
    const loadNextReservation = async () => {
      if (user) {
        const reservation = await getUpcomingReservation();
        setNextReservation(reservation);
      }
    };
    loadNextReservation();
  }, [user]);

  return (
    <div className="home-page">
      <header className="welcome-section">
        <h1>FabLab 예약 시스템</h1>
        {user && <p>안녕하세요, {user.name}님!</p>}
      </header>

      {user && nextReservation && (
        <div className="next-reservation">
          <h2>다음 예약</h2>
          <div className="reservation-card">
            <div className="card-content">
              <p className="date">{nextReservation.date}</p>
              <p className="time">
                {nextReservation.startTime} - {nextReservation.endTime}
              </p>
              <p className="seat">{nextReservation.seatInfo}</p>
            </div>
          </div>
        </div>
      )}

      <div className="calendar-section">
        <h2>예약 현황</h2>
        <ReservationCalendar />
      </div>

      <div className="quick-actions">
        <button className="action-button">
          <i className="material-icons">add</i>
          새 예약
        </button>
        <button className="action-button">
          <i className="material-icons">list</i>
          예약 목록
        </button>
      </div>
    </div>
  );
}; 