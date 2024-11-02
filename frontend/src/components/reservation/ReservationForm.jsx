import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '../common/DatePicker';
import { Select } from '../common/Select';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { TextArea } from '../common/TextArea';
import { SeatSelection } from './SeatSelection';
import { useReservation } from '../../hooks/useReservation';
import { validateReservationTime, validateReservationPurpose } from '../../utils/validation';
import { RESERVATION_PURPOSES } from '../../utils/constants';
import { formatTime } from '../../utils/dateUtils';

export const ReservationForm = () => {
  const navigate = useNavigate();
  const { createReservation } = useReservation();
  const [formData, setFormData] = useState({
    date: new Date(),
    startTime: '09:00',
    endTime: '10:00',
    purpose: '',
    otherPurpose: '',
    seatId: '',
    teamSize: 1
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      date
    }));
  };

  const handleSeatSelect = (seatId) => {
    setFormData(prev => ({
      ...prev,
      seatId
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.date) {
      newErrors.date = '날짜를 선택해주세요.';
    }

    if (!validateReservationTime(formData.startTime, formData.endTime)) {
      newErrors.time = '올바른 예약 시간을 선택해주세요. (최대 3시간)';
    }

    if (!validateReservationPurpose(formData.purpose, formData.otherPurpose)) {
      newErrors.purpose = '예약 목적을 선택해주세요.';
    }

    if (!formData.seatId) {
      newErrors.seat = '좌석을 선택해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await createReservation({
        ...formData,
        date: formData.date.toISOString().split('T')[0]
      });
      navigate('/reservations');
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || '예약에 실패했습니다.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reservation-form">
      <div className="form-group">
        <label>예약 날짜</label>
        <DatePicker
          selected={formData.date}
          onChange={handleDateChange}
          minDate={new Date()}
          placeholderText="날짜 선택"
          error={errors.date}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>시작 시간</label>
          <Select
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            error={errors.time}
          >
            {Array.from({ length: 13 }, (_, i) => i + 9).map(hour => (
              <option key={hour} value={`${hour}:00`}>
                {formatTime(`${hour}:00`)}
              </option>
            ))}
          </Select>
        </div>

        <div className="form-group">
          <label>종료 시간</label>
          <Select
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            error={errors.time}
          >
            {Array.from({ length: 13 }, (_, i) => i + 10).map(hour => (
              <option key={hour} value={`${hour}:00`}>
                {formatTime(`${hour}:00`)}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="form-group">
        <label>예약 목적</label>
        <Select
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          error={errors.purpose}
        >
          <option value="">선택해주세요</option>
          {RESERVATION_PURPOSES.map(purpose => (
            <option key={purpose} value={purpose}>
              {purpose}
            </option>
          ))}
        </Select>
      </div>

      {formData.purpose === '기타' && (
        <div className="form-group">
          <TextArea
            name="otherPurpose"
            value={formData.otherPurpose}
            onChange={handleChange}
            placeholder="기타 예약 목적을 입력해주세요"
            error={errors.purpose}
            rows={3}
          />
        </div>
      )}

      <div className="form-group">
        <label>좌석 선택</label>
        <SeatSelection
          date={formData.date}
          startTime={formData.startTime}
          endTime={formData.endTime}
          selectedSeat={formData.seatId}
          onSelect={handleSeatSelect}
          error={errors.seat}
        />
      </div>

      {errors.submit && (
        <div className="error-message">{errors.submit}</div>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        fullWidth
      >
        {isLoading ? '예약 중...' : '예약하기'}
      </Button>

      <style jsx>{`
        .reservation-form {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .error-message {
          color: var(--error);
          font-size: 0.875rem;
          margin-bottom: 1rem;
          text-align: center;
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </form>
  );
}; 