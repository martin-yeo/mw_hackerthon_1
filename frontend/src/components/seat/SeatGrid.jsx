import React from 'react';
import { Card } from '../common/Card';
import { SEAT_STATUS_COLORS } from '../../utils/constants';

export const SeatGrid = ({ 
  seats = [], 
  onSeatClick, 
  selectedSeat = null,
  showStatus = true,
  showLabels = true,
  gridSize = 'medium' 
}) => {
  const getSeatStatusColor = (status) => {
    return SEAT_STATUS_COLORS[status] || SEAT_STATUS_COLORS.default;
  };

  const getSeatSize = () => {
    switch (gridSize) {
      case 'small': return 'seat-small';
      case 'large': return 'seat-large';
      default: return 'seat-medium';
    }
  };

  return (
    <div className="seat-grid">
      {seats.map((seat) => (
        <Card 
          key={seat.id}
          className={`seat ${getSeatSize()} ${
            selectedSeat === seat.id ? 'selected' : ''
          }`}
          onClick={() => onSeatClick && onSeatClick(seat)}
        >
          {showLabels && (
            <div className="seat-label">{seat.name}</div>
          )}
          
          {showStatus && (
            <div 
              className="status-indicator"
              style={{ backgroundColor: getSeatStatusColor(seat.status) }}
            />
          )}

          {seat.type === 'team' && (
            <div className="team-indicator">
              <i className="material-icons">group</i>
              <span>{seat.capacity}인</span>
            </div>
          )}
        </Card>
      ))}

      <style jsx>{`
        .seat-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 1rem;
          padding: 1rem;
        }

        .seat {
          position: relative;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .seat:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .seat.selected {
          border: 2px solid var(--burgundy-red);
        }

        .seat-small {
          height: 80px;
        }

        .seat-medium {
          height: 120px;
        }

        .seat-large {
          height: 160px;
        }

        .seat-label {
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        .status-indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
        }

        .team-indicator {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .team-indicator i {
          font-size: 1rem;
        }

        @media (max-width: 768px) {
          .seat-grid {
            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
            gap: 0.5rem;
            padding: 0.5rem;
          }

          .seat-small {
            height: 60px;
          }

          .seat-medium {
            height: 90px;
          }

          .seat-large {
            height: 120px;
          }

          .seat-label {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
}; 