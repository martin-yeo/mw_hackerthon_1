import React, { useState, useEffect } from 'react';
import { SeatMap } from './SeatMap';
import { Select } from '../common/Select';
import { Input } from '../common/Input';
import { Loading } from '../common/Loading';
import { useReservation } from '../../hooks/useReservation';
import { SEAT_TYPES } from '../../utils/constants';

export const SeatSelection = ({
  date,
  startTime,
  endTime,
  selectedSeat,
  onSelect,
  error
}) => {
  const { checkSeatAvailability, isLoading } = useReservation();
  const [availableSeats, setAvailableSeats] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const [teamSize, setTeamSize] = useState(1);

  useEffect(() => {
    if (date && startTime && endTime) {
      loadAvailableSeats();
    }
  }, [date, startTime, endTime, selectedType, teamSize]);

  const loadAvailableSeats = async () => {
    try {
      const data = await checkSeatAvailability({
        date: date.toISOString().split('T')[0],
        startTime,
        endTime,
        seatType: selectedType,
        teamSize: selectedType === 'team' ? teamSize : 1
      });
      setAvailableSeats(data);
    } catch (error) {
      console.error('Failed to load available seats:', error);
    }
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setSelectedType(newType);
    if (newType !== 'team') {
      setTeamSize(1);
    }
    onSelect(''); // 좌석 선택 초기화
  };

  const handleTeamSizeChange = (e) => {
    setTeamSize(Number(e.target.value));
    onSelect(''); // 좌석 선택 초기화
  };

  return (
    <div className="seat-selection">
      <div className="selection-header">
        <div className="form-group">
          <Select
            value={selectedType}
            onChange={handleTypeChange}
            label="좌석 유형"
          >
            <option value="all">전체</option>
            <option value="individual">1인 연구석</option>
            <option value="window">창가석</option>
            <option value="imac">아이맥석</option>
            <option value="team">팀프로젝트석</option>
          </Select>
        </div>

        {selectedType === 'team' && (
          <div className="form-group">
            <Input
              type="number"
              value={teamSize}
              onChange={handleTeamSizeChange}
              min={1}
              max={6}
              label="팀 인원"
            />
          </div>
        )}
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="map-wrapper">
          <SeatMap
            selectedSeat={selectedSeat}
            onSeatSelect={onSelect}
            availableSeats={availableSeats}
            selectedSeatType={selectedType}
          />
        </div>
      )}

      {error && (
        <div className="error-message">{error}</div>
      )}

      <div className="seat-info">
        {selectedSeat && (
          <p>
            선택된 좌석: {SEAT_TYPES.ALL.find(seat => seat.id === selectedSeat)?.name}
          </p>
        )}
      </div>

      <style jsx>{`
        .seat-selection {
          width: 100%;
        }

        .selection-header {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .form-group {
          flex: 1;
        }

        .map-wrapper {
          margin-bottom: 1.5rem;
          min-height: 400px;
        }

        .error-message {
          color: var(--error);
          font-size: 0.875rem;
          margin-bottom: 1rem;
        }

        .seat-info {
          text-align: center;
          color: var(--text-secondary);
        }

        .seat-info p {
          margin: 0;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .selection-header {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}; 