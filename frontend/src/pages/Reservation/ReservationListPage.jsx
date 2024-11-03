import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { DatePicker } from '../../components/common/DatePicker';
import { ReservationList } from '../../components/reservation/ReservationList';

export const ReservationListPage = () => {
  const [filters, setFilters] = useState({
    search: '',
    startDate: null,
    endDate: null,
    status: ''
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="reservation-list-page">
      <div className="page-header">
        <h1>내 예약 목록</h1>
        <Button
          as={Link}
          to="/reservations/new"
          variant="primary"
        >
          <i className="material-icons">add</i>
          새 예약
        </Button>
      </div>

      <Card className="filters-card">
        <div className="filters">
          <div className="search-box">
            <Input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="좌석번호, 예약목적으로 검색..."
              icon="search"
            />
          </div>

          <div className="filter-group">
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="">전체 상태</option>
              <option value="pending">대기중</option>
              <option value="approved">승인됨</option>
              <option value="rejected">거절됨</option>
              <option value="cancelled">취소됨</option>
            </select>
          </div>

          <div className="filter-group">
            <DatePicker
              selected={filters.startDate}
              onChange={(date) => handleFilterChange({
                target: { name: 'startDate', value: date }
              })}
              placeholderText="시작일"
            />
          </div>

          <div className="filter-group">
            <DatePicker
              selected={filters.endDate}
              onChange={(date) => handleFilterChange({
                target: { name: 'endDate', value: date }
              })}
              placeholderText="종료일"
              minDate={filters.startDate}
            />
          </div>
        </div>
      </Card>

      <ReservationList filters={filters} />

      <style jsx>{`
        .reservation-list-page {
          padding: 2rem;
          min-height: calc(100vh - var(--header-height));
          background-color: var(--background);
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .page-header h1 {
          margin: 0;
          color: var(--text-primary);
        }

        .filters-card {
          margin-bottom: 2rem;
        }

        .filters {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 1rem;
          align-items: center;
        }

        .filter-group select {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          background-color: white;
          font-size: 1rem;
        }

        @media (max-width: 1024px) {
          .filters {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 768px) {
          .reservation-list-page {
            padding: 1rem;
          }

          .page-header {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .filters {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}; 