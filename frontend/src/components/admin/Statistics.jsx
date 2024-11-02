import React, { useState, useEffect } from 'react';
import { api } from '../../api/client';
import { Loading } from '../common/Loading';
import { DatePicker } from '../common/DatePicker';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const Statistics = () => {
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    endDate: new Date()
  });
  const [stats, setStats] = useState({
    dailyReservations: [],
    seatTypeUsage: [],
    timeSlotUsage: [],
    purposeDistribution: [],
    userStats: {
      totalUsers: 0,
      activeUsers: 0,
      newUsersThisMonth: 0
    }
  });

  useEffect(() => {
    fetchStatistics();
  }, [dateRange]);

  const fetchStatistics = async () => {
    try {
      const response = await api.get('/admin/statistics', {
        params: {
          startDate: dateRange.startDate.toISOString(),
          endDate: dateRange.endDate.toISOString()
        }
      });
      setStats(response.data);
    } catch (error) {
      console.error('통계 데이터 로딩 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const dailyReservationsData = {
    labels: stats.dailyReservations.map(item => item.date),
    datasets: [{
      label: '일별 예약 수',
      data: stats.dailyReservations.map(item => item.count),
      borderColor: 'rgba(144, 28, 28, 1)',
      backgroundColor: 'rgba(144, 28, 28, 0.1)',
      tension: 0.4
    }]
  };

  const seatTypeData = {
    labels: stats.seatTypeUsage.map(item => item.type),
    datasets: [{
      label: '좌석 유형별 사용량',
      data: stats.seatTypeUsage.map(item => item.count),
      backgroundColor: [
        'rgba(144, 28, 28, 0.8)',
        'rgba(144, 28, 28, 0.6)',
        'rgba(144, 28, 28, 0.4)',
        'rgba(144, 28, 28, 0.2)'
      ]
    }]
  };

  const timeSlotData = {
    labels: stats.timeSlotUsage.map(item => item.timeSlot),
    datasets: [{
      label: '시간대별 예약 수',
      data: stats.timeSlotUsage.map(item => item.count),
      backgroundColor: 'rgba(144, 28, 28, 0.6)'
    }]
  };

  if (loading) return <Loading />;

  return (
    <div className="statistics">
      <h1>통계 및 분석</h1>

      <div className="date-filter">
        <DatePicker
          selected={dateRange.startDate}
          onChange={date => setDateRange(prev => ({ ...prev, startDate: date }))}
          selectsStart
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          maxDate={new Date()}
          placeholderText="시작일"
        />
        <span>~</span>
        <DatePicker
          selected={dateRange.endDate}
          onChange={date => setDateRange(prev => ({ ...prev, endDate: date }))}
          selectsEnd
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          minDate={dateRange.startDate}
          maxDate={new Date()}
          placeholderText="종료일"
        />
      </div>

      <div className="stats-grid">
        <div className="stat-card user-stats">
          <h3>사용자 통계</h3>
          <div className="user-stats-grid">
            <div className="stat-item">
              <p className="stat-label">전체 사용자</p>
              <p className="stat-value">{stats.userStats.totalUsers}</p>
            </div>
            <div className="stat-item">
              <p className="stat-label">활성 사용자</p>
              <p className="stat-value">{stats.userStats.activeUsers}</p>
            </div>
            <div className="stat-item">
              <p className="stat-label">이번 달 신규</p>
              <p className="stat-value">{stats.userStats.newUsersThisMonth}</p>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <h3>일별 예약 추이</h3>
          <div className="chart-container">
            <Line 
              data={dailyReservationsData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: false }
                },
                scales: {
                  y: { beginAtZero: true }
                }
              }}
            />
          </div>
        </div>

        <div className="stat-card">
          <h3>좌석 유형별 사용량</h3>
          <div className="chart-container">
            <Pie 
              data={seatTypeData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'right' }
                }
              }}
            />
          </div>
        </div>

        <div className="stat-card">
          <h3>시간대별 예약 현황</h3>
          <div className="chart-container">
            <Bar 
              data={timeSlotData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' }
                },
                scales: {
                  y: { beginAtZero: true }
                }
              }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .statistics {
          padding: 2rem;
        }

        h1 {
          margin-bottom: 2rem;
          color: var(--text-primary);
        }

        .date-filter {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }

        .stat-card {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .user-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-top: 1rem;
        }

        .stat-item {
          text-align: center;
          padding: 1rem;
          background: var(--background-paper);
          border-radius: 8px;
        }

        .stat-label {
          margin: 0;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .stat-value {
          margin: 0.5rem 0 0;
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--burgundy-red);
        }

        h3 {
          margin: 0 0 1rem;
          color: var(--text-primary);
        }

        .chart-container {
          position: relative;
          height: 300px;
        }

        @media (max-width: 1200px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .statistics {
            padding: 1rem;
          }

          .date-filter {
            flex-direction: column;
            align-items: stretch;
          }

          .user-stats-grid {
            grid-template-columns: 1fr;
          }

          .chart-container {
            height: 250px;
          }
        }
      `}</style>
    </div>
  );
}; 