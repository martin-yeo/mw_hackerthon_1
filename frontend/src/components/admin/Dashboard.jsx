import React, { useState, useEffect } from 'react';
import { useReservation } from '../../hooks/useReservation';
import { ReservationList } from './ReservationList';
import { Statistics } from './Statistics';

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalReservations: 0,
    pendingApprovals: 0,
    todayReservations: 0,
    seatUtilization: {}
  });

  const { getStatistics, getPendingReservations } = useReservation();

  useEffect(() => {
    const loadDashboardData = async () => {
      const statistics = await getStatistics();
      const pendingReservations = await getPendingReservations();
      setStats({
        ...statistics,
        pendingApprovals: pendingReservations.length
      });
    };

    loadDashboardData();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>관리자 대시보드</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>전체 예약</h3>
          <p>{stats.totalReservations}</p>
        </div>
        <div className="stat-card">
          <h3>승인 대기</h3>
          <p>{stats.pendingApprovals}</p>
        </div>
        <div className="stat-card">
          <h3>오늘 예약</h3>
          <p>{stats.todayReservations}</p>
        </div>
      </div>
      <ReservationList />
      <Statistics data={stats.seatUtilization} />
    </div>
  );
}; 