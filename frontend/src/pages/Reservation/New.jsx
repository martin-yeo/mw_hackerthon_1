import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReservation } from '../../hooks/useReservation';
import { SeatSelection } from '../../components/reservation/SeatSelection';
import { DatePicker } from '../../components/common/DatePicker';
import { TimePicker } from '../../components/common/TimePicker';

export const New = () => {
  const navigate = useNavigate();
  const { createReservation } = useReservation();
  const [formData, setFormData] = useState({
    date: null,
    startTime: '',
    endTime: '',
    seatType: '',
    seatId: '',
    purpose: '',
    customPurpose: '',
    teamSize: 1
  });

  const purposes = ['팀프로젝트', '개인학습', '조별학습', '회의', '기타'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createReservation(formData);
      navigate('/reservations');
    } catch (error) {
      console.error('예약 생성 실패:', error);
    }
  };

  const handleSeatSelect = (seatId) => {
    setFormData(prev => ({
      ...prev,
      seatId
    }));
  };

  return (
    <div className="new-reservation">
      <h1>새 예약</h1>
      
      <form onSubmit={handleSubmit} className="reservation-form">
        <div className="form-section">
          <h2>날짜 및 시간 선택</h2>
          <div className="date-time-picker">
            <DatePicker
              selected={formData.date}
              onChange={date => setFormData({...formData, date})}
              minDate={new Date()}
            />
            <TimePicker
              startTime={formData.startTime}
              endTime={formData.endTime}
              onChange={({start, end}) => 
                setFormData({...formData, startTime: start, endTime: end})}
            />
          </div>
        </div>

        <div className="form-section">
          <h2>좌석 선택</h2>
          <SeatSelection
            onSelect={handleSeatSelect}
            selectedDate={formData.date}
            selectedTime={formData.startTime}
          />
        </div>

        <div className="form-section">
          <h2>예약 목적</h2>
          <select
            value={formData.purpose}
            onChange={(e) => setFormData({...formData, purpose: e.target.value})}
            required
          >
            <option value="">선택해주세요</option>
            {purposes.map(purpose => (
              <option key={purpose} value={purpose}>{purpose}</option>
            ))}
          </select>
          
          {formData.purpose === '기타' && (
            <textarea
              placeholder="예약 목적을 입력해주세요"
              value={formData.customPurpose}
              onChange={(e) => setFormData({...formData, customPurpose: e.target.value})}
              required
            />
          )}
        </div>

        {formData.seatType === '팀프로젝트석' && (
          <div className="form-section">
            <h2>팀 인원</h2>
            <input
              type="number"
              min="1"
              max="6"
              value={formData.teamSize}
              onChange={(e) => setFormData({...formData, teamSize: parseInt(e.target.value)})}
            />
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="submit-button">예약하기</button>
          <button 
            type="button" 
            className="cancel-button"
            onClick={() => navigate('/reservations')}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}; 