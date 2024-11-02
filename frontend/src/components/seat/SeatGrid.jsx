import React from 'react';
import { SEAT_CONFIG } from '../../utils/constants';

export const SeatGrid = ({ type, onSelect }) => {
  const seats = {
    '1인연구석': {
      동쪽: ['동1', '동2', '동3', '동4', '동5', '동6'],
      서쪽: ['서1', '서2', '서3', '서4', '서5', '서6']
    },
    '창가석': ['창가1', '창가2', '창가3', '창가4', '창가5', '창가6'],
    '아이맥석': ['아이맥1', '아이맥2', '아이맥3'],
    '팀프로젝트석': ['테이블1', '테이블2', '테이블3', '테이블4', '테이블5', '테이블6', '테이블7', '테이블8']
  };

  return (
    <div className="seat-grid">
      {/* 좌석 그리드 렌더링 */}
    </div>
  );
}; 