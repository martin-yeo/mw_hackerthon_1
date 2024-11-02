import React, { useState } from 'react';
import { DatePicker } from '../common/DatePicker';

export const ReservationSearch = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    keyword: '',
    date: null,
    status: 'all',
    seatType: 'all',
    sortBy: 'date'
  });

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="이름, 학번, 연락처로 검색"
          value={filters.keyword}
          onChange={(e) => setFilters({...filters, keyword: e.target.value})}
        />
        
        <DatePicker
          selected={filters.date}
          onChange={(date) => setFilters({...filters, date})}
          placeholderText="날짜 선택"
        />
        
        <select
          value={filters.status}
          onChange={(e) => setFilters({...filters, status: e.target.value})}
        >
          <option value="all">전체 상태</option>
          <option value="pending">승인 대기</option>
          <option value="approved">승인됨</option>
          <option value="rejected">거절됨</option>
        </select>

        <select
          value={filters.sortBy}
          onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
        >
          <option value="date">예약 시간순</option>
          <option value="name">예약자 이름순</option>
          <option value="studentId">학번순</option>
        </select>

        <button type="submit" className="search-button">
          검색
        </button>
      </form>
    </div>
  );
}; 