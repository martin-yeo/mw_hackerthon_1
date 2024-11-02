import React from 'react';
import { Card } from '../common/Card';
import { SEAT_TYPES } from '../../utils/constants';

export const SeatType = ({ 
  type, 
  selected = false, 
  onClick,
  showCapacity = true,
  showDescription = true 
}) => {
  const getTypeInfo = () => {
    switch (type) {
      case 'individual':
        return {
          icon: 'person',
          title: '1인 연구석',
          description: '개인 학습을 위한 독립된 공간',
          capacity: 1
        };
      case 'window':
        return {
          icon: 'wb_sunny',
          title: '창가석',
          description: '자연광이 들어오는 쾌적한 학습 공간',
          capacity: 1
        };
      case 'imac':
        return {
          icon: 'computer',
          title: '아이맥석',
          description: 'iMac이 설치된 디자인/개발 작업 공간',
          capacity: 1
        };
      case 'team':
        return {
          icon: 'group',
          title: '팀프로젝트석',
          description: '팀 프로젝트와 그룹 스터디를 위한 공간',
          capacity: 6
        };
      default:
        return {
          icon: 'chair',
          title: '일반석',
          description: '기본 학습 공간',
          capacity: 1
        };
    }
  };

  const typeInfo = getTypeInfo();

  return (
    <Card 
      className={`seat-type ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className="type-icon">
        <i className="material-icons">{typeInfo.icon}</i>
      </div>
      
      <div className="type-info">
        <h3>{typeInfo.title}</h3>
        {showDescription && (
          <p className="description">{typeInfo.description}</p>
        )}
        {showCapacity && (
          <div className="capacity">
            <i className="material-icons">person</i>
            <span>최대 {typeInfo.capacity}인</span>
          </div>
        )}
      </div>

      {SEAT_TYPES[type.toUpperCase()]?.length > 0 && (
        <div className="seat-count">
          총 {SEAT_TYPES[type.toUpperCase()].length}석
        </div>
      )}

      <style jsx>{`
        .seat-type {
          display: flex;
          align-items: flex-start;
          padding: 1.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 2px solid transparent;
        }

        .seat-type:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .seat-type.selected {
          border-color: var(--burgundy-red);
        }

        .type-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          background-color: var(--background);
          border-radius: 12px;
          margin-right: 1rem;
        }

        .type-icon i {
          font-size: 24px;
          color: var(--burgundy-red);
        }

        .type-info {
          flex: 1;
        }

        .type-info h3 {
          margin: 0;
          font-size: 1.125rem;
          color: var(--text-primary);
        }

        .description {
          margin: 0.5rem 0;
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .capacity {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .capacity i {
          font-size: 1rem;
        }

        .seat-count {
          padding: 0.25rem 0.5rem;
          background-color: var(--background);
          border-radius: 4px;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        @media (max-width: 768px) {
          .seat-type {
            padding: 1rem;
          }

          .type-icon {
            width: 40px;
            height: 40px;
          }

          .type-icon i {
            font-size: 20px;
          }

          .type-info h3 {
            font-size: 1rem;
          }

          .description {
            font-size: 0.813rem;
          }
        }
      `}</style>
    </Card>
  );
}; 