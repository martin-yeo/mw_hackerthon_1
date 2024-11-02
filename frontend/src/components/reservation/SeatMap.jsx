import React from 'react';
import { SEAT_CONFIG } from '../../utils/constants';

export const SeatMap = ({ selectedType, onSeatSelect, reservedSeats }) => {
  const renderSeat = (seatId, isReserved) => {
    const seatClass = `seat ${isReserved ? 'reserved' : 'available'} 
                      ${selectedType === '팀프로젝트석' ? 'team-seat' : ''}`;
    
    return (
      <div
        key={seatId}
        className={seatClass}
        onClick={() => !isReserved && onSeatSelect(seatId)}
      >
        <span className="seat-id">{seatId}</span>
        {isReserved && <span className="material-icons">lock</span>}
      </div>
    );
  };

  const renderSeatSection = (type) => {
    switch (type) {
      case '1인연구석':
        return (
          <div className="seat-section research">
            <div className="east-section">
              {SEAT_CONFIG.RESEARCH.EAST.map(seatId => 
                renderSeat(seatId, reservedSeats.includes(seatId))
              )}
            </div>
            <div className="west-section">
              {SEAT_CONFIG.RESEARCH.WEST.map(seatId => 
                renderSeat(seatId, reservedSeats.includes(seatId))
              )}
            </div>
          </div>
        );
      case '창가석':
        return (
          <div className="seat-section window">
            {SEAT_CONFIG.WINDOW.map(seatId => 
              renderSeat(seatId, reservedSeats.includes(seatId))
            )}
          </div>
        );
      case '아이맥석':
        return (
          <div className="seat-section imac">
            {SEAT_CONFIG.IMAC.map(seatId => 
              renderSeat(seatId, reservedSeats.includes(seatId))
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="seat-map">
      {renderSeatSection(selectedType)}
    </div>
  );
}; 