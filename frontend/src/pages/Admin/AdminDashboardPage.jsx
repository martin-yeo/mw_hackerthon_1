import React, { useState, useEffect } from 'react';
import { Card } from '../../components/common/Card';
import { Loading } from '../../components/common/Loading';
import { StatCard } from '../../components/admin/StatCard';
import { ReservationChart } from '../../components/admin/ReservationChart';
import { SeatUsageChart } from '../../components/admin/SeatUsageChart';
import { useAdmin } from '../../hooks/useAdmin';
import { formatDate } from '../../utils/dateUtils';

export const AdminDashboardPage = () => {
  const { getDashboardStats } = useAdmin();
  const [stats, setStats] = useState({
    totalReservations: 0,
    pendingReservations: 0,
    todayReservations: 0,
    activeUsers: 0,
    seatUsage: [],
    reservationTrends: [],
    popularTimeSlots: [],
    recentReservations: []
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week'); // week, month, year

  useEffect(() => {
    loadDashboardStats();
  }, [timeRange]);

  const loadDashboardStats = async () => {
    try {
      const data = await getDashboardStats(timeRange);
      setStats(data);
    } catch (error) {
      console.error('대시보드 통계 로딩 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>관리자 대시보드</h1>
        <div className="time-range-selector">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="week">최근 1주일</option>
            <option value="month">최근 1개월</option>
            <option value="year">최근 1년</option>
          </select>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          title="전체 예약"
          value={stats.totalReservations}
          icon="event"
          trend={stats.reservationTrend}
        />
        <StatCard
          title="대기중인 예약"
          value={stats.pendingReservations}
          icon="pending"
          color="warning"
        />
        <StatCard
          title="오늘의 예약"
          value={stats.todayReservations}
          icon="today"
          color="success"
        />
        <StatCard
          title="활성 사용자"
          value={stats.activeUsers}
          icon="people"
          color="info"
        />
      </div>

      <div className="charts-grid">
        <Card className="chart-card">
          <h2>예약 추이</h2>
          <ReservationChart
            data={stats.reservationTrends}
            timeRange={timeRange}
          />
        </Card>

        <Card className="chart-card">
          <h2>좌석 유형별 사용률</h2>
          <SeatUsageChart data={stats.seatUsage} />
        </Card>
      </div>

      <div className="bottom-grid">
        <Card className="popular-times">
          <h2>인기 시간대</h2>
          <div className="time-slots">
            {stats.popularTimeSlots.map((slot, index) => (
              <div key={index} className="time-slot">
                <div className="time">{slot.time}</div>
                <div className="usage-bar">
                  <div
                    className="bar"
                    style={{ width: `${slot.usage}%` }}
                  />
                </div>
                <div className="percentage">{slot.usage}%</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="recent-reservations">
          <h2>최근 예약</h2>
          <div className="reservation-list">
            {stats.recentReservations.map(reservation => (
              <div key={reservation.id} className="reservation-item">
                <div className="user-info">
                  <span className="name">{reservation.user.name}</span>
                  <span className="student-id">{reservation.user.studentId}</span>
                </div>
                <div className="reservation-details">
                  <span className="seat">{reservation.seat.name}</span>
                  <span className="time">
                    {formatDate(new Date(reservation.date))}
                  </span>
                </div>
                <span className={`status ${reservation.status}`}>
                  {reservation.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <style jsx>{`
        .admin-dashboard {
          padding: 2rem;
          min-height: calc(100vh - var(--header-height));
          background-color: var(--background);
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .dashboard-header h1 {
          margin: 0;
          color: var(--text-primary);
        }

        .time-range-selector select {
          padding: 0.5rem 1rem;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          background-color: white;
          font-size: 1rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .charts-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .chart-card {
          padding: 1.5rem;
        }

        .chart-card h2 {
          margin: 0 0 1.5rem 0;
          color: var(--text-primary);
        }

        .bottom-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .popular-times,
        .recent-reservations {
          padding: 1.5rem;
        }

        .popular-times h2,
        .recent-reservations h2 {
          margin: 0 0 1.5rem 0;
          color: var(--text-primary);
        }

        .time-slots {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .time-slot {
          display: grid;
          grid-template-columns: 100px 1fr 50px;
          align-items: center;
          gap: 1rem;
        }

        .time {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .usage-bar {
          height: 8px;
          background-color: var(--background);
          border-radius: 4px;
          overflow: hidden;
        }

        .bar {
          height: 100%;
          background-color: var(--burgundy-red);
          border-radius: 4px;
        }

        .percentage {
          color: var(--text-secondary);
          font-size: 0.875rem;
          text-align: right;
        }

        .reservation-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .reservation-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background-color: var(--background);
          border-radius: 8px;
        }

        .user-info,
        .reservation-details {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .name {
          color: var(--text-primary);
          font-weight: 500;
        }

        .student-id,
        .seat,
        .time {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .status {
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          text-transform: uppercase;
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

        @media (max-width: 1200px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .charts-grid,
          .bottom-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .admin-dashboard {
            padding: 1rem;
          }

          .dashboard-header {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .time-slot {
            grid-template-columns: 80px 1fr 40px;
          }
        }
      `}</style>
    </div>
  );
}; 