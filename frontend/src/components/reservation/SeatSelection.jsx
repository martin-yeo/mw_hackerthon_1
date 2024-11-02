import React, { useState, useEffect } from 'react';
import { SeatMap } from './SeatMap';
import { useReservation } from '../../hooks/useReservation';

export const SeatSelection = ({ onSelect, selectedDate, selectedTime }) => {
  const [selectedType, setSelectedType] = useState('');
  const [reservedSeats, setReservedSeats] = useState([]);
  const { checkSeatAvailability } = useReservation();

  const seatTypes = [
    { id: '1인연구석', label: '1인 연구석 (동/서쪽 12석)' },
    { id: '창가석', label: '창가석 (6석)' },
    { id: '아이맥석', label: '아이맥석 (3석)' },
    { id: '팀프로젝트석', label: '팀프로젝트석 (8테이블)' }
  ];

  useEffect(() => {
    const loadReservedSeats = async () => {
      if (selectedDate && selectedTime && selectedType) {
        const reserved = await checkSeatAvailability(
          selectedType,
          selectedDate,
          selectedTime
        );
        setReservedSeats(reserved);
      }
    };

    loadReservedSeats();
  }, [selectedDate, selectedTime, selectedType]);

  return (
    <div className="seat-selection">
      <div className="seat-type-selector">
        {seatTypes.map(type => (
          <button
            key={type.id}
            className={`type-button ${selectedType === type.id ? 'selected' : ''}`}
            onClick={() => setSelectedType(type.id)}
          >
            {type.label}
          </button>
        ))}
      </div>

      {selectedType && (
        <SeatMap
          selectedType={selectedType}
          onSeatSelect={onSelect}
          reservedSeats={reservedSeats}
        />
      )}
    </div>
  );
}; 