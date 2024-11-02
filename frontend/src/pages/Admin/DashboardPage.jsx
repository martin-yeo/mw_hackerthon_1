import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../hooks/useAdmin';
import { Loading } from '../../components/common/Loading';
import { 
  LineChart, 
  BarChart, 
  PieChart 
} from '../../components/charts';
import { formatDate, formatNumber } from '../../utils/dateUtils';

export const DashboardPage = () => {
  const { getStats, getDailyStats } = useAdmin();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalReservations: 0,
    activeReservations: 0,
    totalUsers: 0,
    activeUsers: 0,
    seatUtilization: 0,
    popularSeats: [],
    reservationsByStatus: {},
    reservationsByType: {}
  });
  const [dailyStats, setDailyStats] = useState([]);
  const [dateRange, setDateRange] = useState('week'); // week, month, year

  useEffect(() => {
    fetchStats();
    fetchDailyStats();
  }, [dateRange]);

  const fetchStats = async () => {
    try {
      const data = await getStats();
      setStats(data);
    } catch (error) {
      console.error('통계 데이터 로딩 실패:', error);
    }
  };

  const fetchDailyStats = async () => {
    try {
      const data = await getDailyStats(dateRange);
      setDailyStats(data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="dashboard-container">
      <div className="page-header">
        <h1>대시보드</h1>
        <div className="date-range-selector">
          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="week">최근 7일</option>
            <option value="month">최근 30일</option>
            <option value="year">최근 1년</option>
          </select>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>전체 예약</h3>
          <div className="stat-value">{formatNumber(stats.totalReservations)}</div>
          <div className="stat-change positive">
            <i className="material-icons">trending_up</i>
            +{stats.reservationGrowth}%
          </div>
        </div>

        <div className="stat-card">
          <h3>활성 사용자</h3>
          <div className="stat-value">{formatNumber(stats.activeUsers)}</div>
          <div className="stat-change positive">
            <i className="material-icons">group</i>
            +{stats.userGrowth}%
          </div>
        </div>

        <div className="stat-card">
          <h3>좌석 이용률</h3>
          <div className="stat-value">{stats.seatUtilization}%</div>
          <div className="stat-change neutral">
            <i className="material-icons">event_seat</i>
            전체 좌석
          </div>
        </div>

        <div className="stat-card">
          <h3>현재 사용 중</h3>
          <div className="stat-value">{stats.activeReservations}</div>
          <div className="stat-change">
            <i className="material-icons">access_time</i>
            실시간
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>일별 예약 현황</h3>
          <LineChart
            data={dailyStats.map(stat => ({
              date: formatDate(stat.date),
              value: stat.reservations
            }))}
            xKey="date"
            yKey="value"
            color="#4CAF50"
          />
        </div>

        <div className="chart-card">
          <h3>좌석 유형별 예약</h3>
          <PieChart
            data={Object.entries(stats.reservationsByType).map(([type, count]) => ({
              name: type,
              value: count
            }))}
          />
        </div>

        <div className="chart-card">
          <h3>시간대별 예약</h3>
          <BarChart
            data={stats.reservationsByHour}
            xKey="hour"
            yKey="count"
            color="#2196F3"
          />
        </div>

        <div className="chart-card">
          <h3>인기 좌석 TOP 5</h3>
          <div className="popular-seats">
            {stats.popularSeats.map((seat, index) => (
              <div key={seat.id} className="popular-seat-item">
                <span className="rank">{index + 1}</span>
                <span className="seat-info">
                  좌석 {seat.number} ({seat.type})
                </span>
                <span className="usage">{seat.usageCount}회</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="status-summary">
        <h3>예약 상태별 현황</h3>
        <div className="status-grid">
          {Object.entries(stats.reservationsByStatus).map(([status, count]) => (
            <div key={status} className={`status-card ${status.toLowerCase()}`}>
              <h4>{status}</h4>
              <div className="count">{count}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 