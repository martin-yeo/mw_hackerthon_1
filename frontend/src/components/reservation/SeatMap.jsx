import React from 'react';
import { SEAT_TYPES } from '../../utils/constants';

export const SeatMap = ({ 
  selectedSeat, 
  onSeatSelect, 
  availableSeats = [], 
  selectedSeatType = 'all'
}) => {
  const isSeatAvailable = (seatId) => availableSeats.includes(seatId);
  const isSeatSelected = (seatId) => selectedSeat === seatId;

  const renderSeat = (seatId, seatName) => (
    <div
      key={seatId}
      className={`seat ${
        isSeatAvailable(seatId) ? 'available' : 'occupied'
      } ${isSeatSelected(seatId) ? 'selected' : ''}`}
      onClick={() => isSeatAvailable(seatId) && onSeatSelect(seatId)}
    >
      <span className="seat-name">{seatName}</span>
    </div>
  );

  return (
    <div className="seat-map">
      <div className="map-container">
        {/* 동쪽 1인 연구석 */}
        <div className="section east">
          {selectedSeatType === 'all' || selectedSeatType === 'individual' && (
            SEAT_TYPES.INDIVIDUAL.EAST.map((seatName, index) => 
              renderSeat(`east_${index + 1}`, seatName)
            )
          )}
        </div>

        {/* 서쪽 1인 연구석 */}
        <div className="section west">
          {selectedSeatType === 'all' || selectedSeatType === 'individual' && (
            SEAT_TYPES.INDIVIDUAL.WEST.map((seatName, index) => 
              renderSeat(`west_${index + 1}`, seatName)
            )
          )}
        </div>

        {/* 창가석 */}
        <div className="section window">
          {selectedSeatType === 'all' || selectedSeatType === 'window' && (
            SEAT_TYPES.WINDOW.map((seatName, index) => 
              renderSeat(`window_${index + 1}`, seatName)
            )
          )}
        </div>

        {/* 아이맥석 */}
        <div className="section imac">
          {selectedSeatType === 'all' || selectedSeatType === 'imac' && (
            SEAT_TYPES.IMAC.map((seatName, index) => 
              renderSeat(`imac_${index + 1}`, seatName)
            )
          )}
        </div>

        {/* 팀프로젝트석 */}
        <div className="section team">
          {selectedSeatType === 'all' || selectedSeatType === 'team' && (
            SEAT_TYPES.TEAM.map((seatName, index) => 
              renderSeat(`team_${index + 1}`, seatName)
            )
          )}
        </div>
      </div>

      <div className="legend">
        <div className="legend-item">
          <div className="legend-color available"></div>
          <span>이용 가능</span>
        </div>
        <div className="legend-item">
          <div className="legend-color occupied"></div>
          <span>이용 중</span>
        </div>
        <div className="legend-item">
          <div className="legend-color selected"></div>
          <span>선택됨</span>
        </div>
      </div>

      <style jsx>{`
        .seat-map {
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
        }

        .map-container {
          display: grid;
          grid-template-areas:
            "east window imac"
            "west window team"
            "west window team";
          gap: 2rem;
          padding: 2rem;
          background-color: var(--background-paper);
          border-radius: 8px;
          box-shadow: var(--shadow-sm);
        }

        .section {
          display: grid;
          gap: 1rem;
        }

        .section.east {
          grid-area: east;
          grid-template-columns: repeat(3, 1fr);
        }

        .section.west {
          grid-area: west;
          grid-template-columns: repeat(3, 1fr);
        }

        .section.window {
          grid-area: window;
          grid-template-columns: 1fr;
        }

        .section.imac {
          grid-area: imac;
          grid-template-columns: repeat(3, 1fr);
        }

        .section.team {
          grid-area: team;
          grid-template-columns: repeat(4, 1fr);
        }

        .seat {
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          padding: 0.5rem;
        }

        .seat.available {
          background-color: var(--success-light);
          border: 2px solid var(--success);
        }

        .seat.occupied {
          background-color: var(--error-light);
          border: 2px solid var(--error);
          cursor: not-allowed;
        }

        .seat.selected {
          background-color: var(--burgundy-red);
          border: 2px solid var(--burgundy-red);
          color: white;
        }

        .seat-name {
          font-size: 0.875rem;
          font-weight: 500;
          text-align: center;
        }

        .legend {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-top: 2rem;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .legend-color {
          width: 20px;
          height: 20px;
          border-radius: 4px;
        }

        .legend-color.available {
          background-color: var(--success-light);
          border: 2px solid var(--success);
        }

        .legend-color.occupied {
          background-color: var(--error-light);
          border: 2px solid var(--error);
        }

        .legend-color.selected {
          background-color: var(--burgundy-red);
          border: 2px solid var(--burgundy-red);
        }

        @media (max-width: 768px) {
          .map-container {
            grid-template-areas:
              "east"
              "west"
              "window"
              "imac"
              "team";
            padding: 1rem;
          }

          .section.team {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
}; 