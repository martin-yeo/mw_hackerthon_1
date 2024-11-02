import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReservation } from '../../hooks/useReservation';
import { useToast } from '../../hooks/useToast';
import { DatePicker } from '../../components/common/DatePicker';
import { TimePicker } from '../../components/common/TimePicker';
import { Loading } from '../../components/common/Loading';
import { SEAT_TYPES, RESERVATION_PURPOSES } from '../../utils/constants';
import { validateReservation } from '../../utils/validation';
import { formatDateTime } from '../../utils/dateUtils';

export const ReservationPage = () => {
  const navigate = useNavigate();
  const { createReservation, checkAvailability } = useReservation();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [selectedSeatType, setSelectedSeatType] = useState(null);
  const [availableSeats, setAvailableSeats] = useState([]);
  
  const [formData, setFormData] = useState({
    date: null,
    startTime: '',
    endTime: '',
    seatId: '',
    purpose: '',
    customPurpose: '',
    teamSize: 2,
    teamMembers: []
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (formData.date && formData.startTime && formData.endTime && selectedSeatType) {
      checkSeatAvailability();
    }
  }, [formData.date, formData.startTime, formData.endTime, selectedSeatType]);

  const checkSeatAvailability = async () => {
    try {
      const seats = await checkAvailability({
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        seatType: selectedSeatType
      });
      setAvailableSeats(seats);
    } catch (error) {
      showToast({
        type: 'error',
        message: '좌석 조회 중 오류가 발생했습니다.'
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateReservation(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const reservation = await createReservation(formData);
      showToast({
        type: 'success',
        message: '예약이 성공적으로 완료되었습니다.'
      });
      navigate(`/reservations/${reservation.id}`);
    } catch (error) {
      showToast({
        type: 'error',
        message: error.message || '예약 중 오류가 발생했습니다.'
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="reservation-container">
      <div className="reservation-header">
        <h1>좌석 예약</h1>
      </div>

      <form onSubmit={handleSubmit} className="reservation-form">
        <div className="form-section">
          <h2>예약 정보</h2>
          
          <div className="form-row">
            <div className="form-group">
              <label>날짜</label>
              <DatePicker
                selected={formData.date}
                onChange={(date) => setFormData({ ...formData, date })}
                minDate={new Date()}
                maxDate={new Date().setDate(new Date().getDate() + 14)}
              />
              {errors.date && <span className="error-message">{errors.date}</span>}
            </div>

            <div className="form-group">
              <label>시작 시간</label>
              <TimePicker
                value={formData.startTime}
                onChange={(time) => setFormData({ ...formData, startTime: time })}
              />
              {errors.startTime && <span className="error-message">{errors.startTime}</span>}
            </div>

            <div className="form-group">
              <label>종료 시간</label>
              <TimePicker
                value={formData.endTime}
                onChange={(time) => setFormData({ ...formData, endTime: time })}
                minTime={formData.startTime}
              />
              {errors.endTime && <span className="error-message">{errors.endTime}</span>}
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>좌석 선택</h2>
          
          <div className="seat-types">
            {Object.entries(SEAT_TYPES).map(([key, value]) => (
              <div
                key={key}
                className={`seat-type ${selectedSeatType === key ? 'selected' : ''}`}
                onClick={() => setSelectedSeatType(key)}
              >
                <h3>{value}</h3>
                <p className="seat-info">
                  {/* 좌석 타입별 설명 */}
                </p>
              </div>
            ))}
          </div>

          {selectedSeatType && availableSeats.length > 0 && (
            <div className="seat-map">
              {/* 좌석 배치도 */}
            </div>
          )}
        </div>

        <div className="form-section">
          <h2>예약 목적</h2>
          
          <div className="form-group">
            <select
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
            >
              <option value="">예약 목적을 선택하세요</option>
              {RESERVATION_PURPOSES.map(purpose => (
                <option key={purpose} value={purpose}>{purpose}</option>
              ))}
            </select>
            {errors.purpose && <span className="error-message">{errors.purpose}</span>}
          </div>

          {formData.purpose === '기타' && (
            <div className="form-group">
              <textarea
                value={formData.customPurpose}
                onChange={(e) => setFormData({ ...formData, customPurpose: e.target.value })}
                placeholder="예약 목적을 자세히 적어주세요"
              />
              {errors.customPurpose && (
                <span className="error-message">{errors.customPurpose}</span>
              )}
            </div>
          )}
        </div>

        {selectedSeatType === 'TEAM' && (
          <div className="form-section">
            <h2>팀 정보</h2>
            
            <div className="form-group">
              <label>팀 인원</label>
              <input
                type="number"
                min="2"
                max="6"
                value={formData.teamSize}
                onChange={(e) => setFormData({ ...formData, teamSize: parseInt(e.target.value) })}
              />
              {errors.teamSize && <span className="error-message">{errors.teamSize}</span>}
            </div>
          </div>
        )}

        <div className="form-actions">
          <button type="button" className="button cancel" onClick={() => navigate(-1)}>
            취소
          </button>
          <button type="submit" className="button submit">
            예약하기
          </button>
        </div>
      </form>
    </div>
  );
}; 