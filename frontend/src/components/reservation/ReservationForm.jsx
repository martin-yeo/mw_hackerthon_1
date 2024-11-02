import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { validateReservation } from '../../utils/validation';

export const ReservationForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    studentId: user?.studentId || '',
    phone: user?.phone || '',
    date: '',
    startTime: '',
    endTime: '',
    purpose: '',
    customPurpose: '',
    seatType: '',
    seatNumber: '',
    teamSize: 1
  });

  const purposes = ['팀프로젝트', '개인학습', '조별학습', '회의', '기타'];
  const seatTypes = ['1인연구석', '창가석', '아이맥석', '팀프로젝트석'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 예약 처리 로직
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 폼 필드들 */}
    </form>
  );
}; 