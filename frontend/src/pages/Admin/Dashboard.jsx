import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../hooks/useAdmin';
import { Chart } from 'react-chartjs-2';
import { AdminStats } from '../../components/admin/AdminStats';
import { RecentReservations } from '../../components/admin/RecentReservations';

export const Dashboard = () => {
  const { getAdminStats, getRecentReservations } = useAdmin();
  const [stats, setStats] = useState({
    totalReservations: 0,
    pendingApprovals: 0,
    todayReservations: 0,
    weeklyStats: [],
    seatUtilization: {}
  });
  const [recentReservations, setRecentReservations] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [statsData, reservationsData] = await Promise.all([
        getAdminStats(),
        getRecentReservations()
      ]);
      setStats(statsData);
      setRecentReservations(reservationsData);
    } catch (error) {
      console.error('대시보드 데이터 로딩 실패:', error);
    }
  };

  const chartData = {
    labels: stats.weeklyStats.map(stat => stat.date),
    datasets: [
      {
        label: '일일 예약 수',
        data: stats.weeklyStats.map(stat => stat.count),
        borderColor: '#800020',
        backgroundColor: 'rgba(128, 0, 32, 0.1)',
        tension: 0.4
      }
    ]
  };

  const utilizationData = {
    labels: Object.keys(stats.seatUtilization),
    datasets: [
      {
        data: Object.values(stats.seatUtilization),
        backgroundColor: [
          '#800020',
          '#A0324E',
          '#C06479',
          '#E096A7'
        ]
      }
    ]
  };

  return (
    <div className="admin-dashboard">
      <h1>관리자 대시보드</h1>
      
      <AdminStats stats={stats} />

      <div className="dashboard-grid">
        <div className="chart-section">
          <h2>주간 예약 현황</h2>
          <div className="chart-container">
            <Chart type="line" data={chartData} />
          </div>
        </div>

        <div className="chart-section">
          <h2>좌석 유형별 사용률</h2>
          <div className="chart-container">
            <Chart type="doughnut" data={utilizationData} />
          </div>
        </div>
      </div>

      <div className="recent-section">
        <h2>최근 예약</h2>
        <RecentReservations 
          reservations={recentReservations}
          onRefresh={loadDashboardData}
        />
      </div>

      <div className="quick-actions">
        <button className="action-button">
          <i className="material-icons">pending_actions</i>
          승인 대기 ({stats.pendingApprovals})
        </button>
        <button className="action-button">
          <i className="material-icons">today</i>
          오늘 예약 ({stats.todayReservations})
        </button>
        <button className="action-button">
          <i className="material-icons">settings</i>
          설정
        </button>
      </div>
    </div>
  );
}; 