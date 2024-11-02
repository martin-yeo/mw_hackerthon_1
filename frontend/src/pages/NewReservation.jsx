import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { ReservationForm } from '../components/reservation/ReservationForm';
import { SeatType } from '../components/seat/SeatType';
import { useReservation } from '../../hooks/useReservation';
import { AlertModal } from '../components/notification/AlertModal';

export const NewReservation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') || 'individual';
  
  const [selectedType, setSelectedType] = useState(initialType);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [reservationId, setReservationId] = useState(null);
  const { createReservation, isLoading } = useReservation();

  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };

  const handleSubmit = async (formData) => {
    try {
      const result = await createReservation({
        ...formData,
        seatType: selectedType
      });
      setReservationId(result.id);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Failed to create reservation:', error);
    }
  };

  const handleSuccessConfirm = () => {
    navigate(`/reservations/${reservationId}`);
  };

  return (
    <div className="new-reservation-page">
      <div className="reservation-container">
        <section className="seat-types">
          <h2>좌석 유형 선택</h2>
          <div className="types-grid">
            <SeatType
              type="individual"
              selected={selectedType === 'individual'}
              onClick={() => handleTypeSelect('individual')}
            />
            <SeatType
              type="window"
              selected={selectedType === 'window'}
              onClick={() => handleTypeSelect('window')}
            />
            <SeatType
              type="imac"
              selected={selectedType === 'imac'}
              onClick={() => handleTypeSelect('imac')}
            />
            <SeatType
              type="team"
              selected={selectedType === 'team'}
              onClick={() => handleTypeSelect('team')}
            />
          </div>
        </section>

        <section className="reservation-form-section">
          <Card>
            <h2>예약 정보 입력</h2>
            <ReservationForm
              seatType={selectedType}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </Card>
        </section>
      </div>

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

        .reservation-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        .seat-types h2,
        .reservation-form-section h2 {
          margin: 0 0 1.5rem 0;
          color: var(--text-primary);
        }

        .types-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .reservation-form-section {
          background-color: white;
          border-radius: 12px;
          box-shadow: var(--shadow-sm);
        }

        @media (max-width: 768px) {
          .new-reservation-page {
            padding: 1rem;
          }

          .types-grid {
            grid-template-columns: 1fr;
          }

          .reservation-form-section {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}; 