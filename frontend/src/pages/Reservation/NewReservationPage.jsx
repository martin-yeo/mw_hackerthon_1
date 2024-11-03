import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { DatePicker } from '../../components/common/DatePicker';
import { TimePicker } from '../../components/common/TimePicker';
import { SeatType } from '../../components/seat/SeatType';
import { TeamSeatForm } from '../../components/seat/TeamSeatForm';
import { useReservation } from '../../hooks/useReservation';
import { AlertModal } from '../../components/notification/AlertModal';
import { validateReservation } from '../../utils/validation';

export const NewReservationPage = () => {
  const navigate = useNavigate();
  const { createReservation, getAvailableSeats } = useReservation();
  const [formData, setFormData] = useState({
    date: null,
    startTime: '',
    endTime: '',
    seatType: '',
    seatId: '',
    purpose: '',
    customPurpose: '',
    teamSize: 1,
    teamMembers: []
  });
  const [availableSeats, setAvailableSeats] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [reservationId, setReservationId] = useState(null);

  const PURPOSES = ['팀프로젝트', '개인학습', '조별학습', '회의', '기타'];

  useEffect(() => {
    if (formData.date && formData.startTime && formData.endTime && formData.seatType) {
      loadAvailableSeats();
    }
  }, [formData.date, formData.startTime, formData.endTime, formData.seatType]);

  const loadAvailableSeats = async () => {
    try {
      const seats = await getAvailableSeats({
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        seatType: formData.seatType
      });
      setAvailableSeats(seats);
    } catch (error) {
      console.error('좌석 조회 실패:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateReservation(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      const result = await createReservation(formData);
      setReservationId(result.id);
      setShowSuccessModal(true);
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || '예약 생성에 실패했습니다.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessConfirm = () => {
    navigate(`/reservations/${reservationId}`);
  };

  return (
    <div className="new-reservation-page">
      <Card className="reservation-card">
        <h1>새 예약</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>날짜 및 시간 선택</h2>
            <div className="date-time-picker">
              <DatePicker
                selected={formData.date}
                onChange={date => {
                  setFormData(prev => ({ ...prev, date }));
                  setErrors(prev => ({ ...prev, date: '' }));
                }}
                minDate={new Date()}
                error={errors.date}
              />
              <TimePicker
                startTime={formData.startTime}
                endTime={formData.endTime}
                onChange={({ start, end }) => {
                  setFormData(prev => ({
                    ...prev,
                    startTime: start,
                    endTime: end
                  }));
                  setErrors(prev => ({
                    ...prev,
                    startTime: '',
                    endTime: ''
                  }));
                }}
                error={errors.startTime || errors.endTime}
              />
            </div>
          </div>

          <div className="form-section">
            <h2>좌석 유형 선택</h2>
            <div className="seat-types">
              <SeatType
                type="individual"
                selected={formData.seatType === 'individual'}
                onClick={() => setFormData(prev => ({
                  ...prev,
                  seatType: 'individual',
                  teamSize: 1,
                  teamMembers: []
                }))}
              />
              <SeatType
                type="window"
                selected={formData.seatType === 'window'}
                onClick={() => setFormData(prev => ({
                  ...prev,
                  seatType: 'window',
                  teamSize: 1,
                  teamMembers: []
                }))}
              />
              <SeatType
                type="imac"
                selected={formData.seatType === 'imac'}
                onClick={() => setFormData(prev => ({
                  ...prev,
                  seatType: 'imac',
                  teamSize: 1,
                  teamMembers: []
                }))}
              />
              <SeatType
                type="team"
                selected={formData.seatType === 'team'}
                onClick={() => setFormData(prev => ({
                  ...prev,
                  seatType: 'team'
                }))}
              />
            </div>
            {errors.seatType && (
              <p className="error-message">{errors.seatType}</p>
            )}
          </div>

          {formData.seatType === 'team' && (
            <TeamSeatForm
              value={formData.teamMembers}
              onChange={members => setFormData(prev => ({
                ...prev,
                teamMembers: members,
                teamSize: members.length
              }))}
              error={errors.teamMembers}
            />
          )}

          <div className="form-section">
            <h2>예약 목적</h2>
            <select
              value={formData.purpose}
              onChange={e => {
                setFormData(prev => ({
                  ...prev,
                  purpose: e.target.value,
                  customPurpose: e.target.value === '기타' ? prev.customPurpose : ''
                }));
                setErrors(prev => ({ ...prev, purpose: '' }));
              }}
              className={errors.purpose ? 'error' : ''}
            >
              <option value="">예약 목적을 선택하세요</option>
              {PURPOSES.map(purpose => (
                <option key={purpose} value={purpose}>{purpose}</option>
              ))}
            </select>
            {errors.purpose && (
              <p className="error-message">{errors.purpose}</p>
            )}

            {formData.purpose === '기타' && (
              <textarea
                value={formData.customPurpose}
                onChange={e => {
                  setFormData(prev => ({
                    ...prev,
                    customPurpose: e.target.value
                  }));
                  setErrors(prev => ({ ...prev, customPurpose: '' }));
                }}
                placeholder="예약 목적을 자세히 적어주세요"
                className={errors.customPurpose ? 'error' : ''}
              />
            )}
            {errors.customPurpose && (
              <p className="error-message">{errors.customPurpose}</p>
            )}
          </div>

          {errors.submit && (
            <p className="error-message">{errors.submit}</p>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            fullWidth
          >
            {isLoading ? '예약 처리 중...' : '예약하기'}
          </Button>
        </form>
      </Card>

      <AlertModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="예약 완료"
        message="좌석 예약이 성공적으로 완료되었습니다."
        type="success"
        confirmText="예약 확인하기"
        onConfirm={handleSuccessConfirm}
      />

      <style jsx>{`
        .new-reservation-page {
          padding: 2rem;
          min-height: calc(100vh - var(--header-height));
          background-color: var(--background);
        }

        .reservation-card {
          max-width: 800px;
          margin: 0 auto;
        }

        h1 {
          margin: 0 0 2rem 0;
          color: var(--text-primary);
          text-align: center;
        }

        .form-section {
          margin-bottom: 2rem;
        }

        .form-section h2 {
          margin: 0 0 1rem 0;
          color: var(--text-primary);
          font-size: 1.25rem;
        }

        .date-time-picker {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .seat-types {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 1rem;
        }

        select, textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          background-color: white;
          font-size: 1rem;
        }

        select.error, textarea.error {
          border-color: var(--error);
        }

        textarea {
          min-height: 100px;
          margin-top: 1rem;
          resize: vertical;
        }

        .error-message {
          color: var(--error);
          font-size: 0.875rem;
          margin: 0.5rem 0 0 0;
        }

        @media (max-width: 768px) {
          .new-reservation-page {
            padding: 1rem;
          }

          .date-time-picker {
            grid-template-columns: 1fr;
          }

          .seat-types {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}; 