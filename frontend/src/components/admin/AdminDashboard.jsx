import React, { useState, useEffect } from 'react';
import { api } from '../../api/client';
import { Card } from '../common/Card';
import { Loading } from '../common/Loading';
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalReservations: 0,
    pendingReservations: 0,
    todayReservations: 0,
    activeUsers: 0
  });
  const [recentReservations, setRecentReservations] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, recentRes, chartRes] = await Promise.all([
          api.get('/admin/stats'),
          api.get('/admin/reservations/recent'),
          api.get('/admin/stats/chart')
        ]);

        setStats(statsRes.data);
        setRecentReservations(recentRes.data);
        setChartData({
          labels: chartRes.data.labels,
          datasets: [{
            label: '일별 예약 현황',
            data: chartRes.data.data,
            backgroundColor: 'rgba(144, 28, 28, 0.5)',
            borderColor: 'rgba(144, 28, 28, 1)',
            borderWidth: 1
          }]
        });
      } catch (error) {
        console.error('Dashboard data fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="admin-dashboard">
      <h1>관리자 대시보드</h1>

      <div className="stats-grid">
        <Card>
          <h3>전체 예약</h3>
          <p className="stat-number">{stats.totalReservations}</p>
        </Card>
        <Card>
          <h3>대기중 예약</h3>
          <p className="stat-number">{stats.pendingReservations}</p>
        </Card>
        <Card>
          <h3>오늘 예약</h3>
          <p className="stat-number">{stats.todayReservations}</p>
        </Card>
        <Card>
          <h3>활성 사용자</h3>
          <p className="stat-number">{stats.activeUsers}</p>
        </Card>
      </div>

      <div className="chart-container">
        <Chart type="bar" data={chartData} />
      </div>
    </div>
  );
}; 