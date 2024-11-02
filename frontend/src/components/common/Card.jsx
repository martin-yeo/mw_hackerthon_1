import React from 'react';

export const Card = ({ 
  children, 
  className = '', 
  onClick,
  hoverable = false,
  padding = 'medium' 
}) => {
  const getPadding = () => {
    switch (padding) {
      case 'small': return '1rem';
      case 'large': return '2rem';
      default: return '1.5rem';
    }
  };

  return (
    <div className={`card ${className} ${hoverable ? 'hoverable' : ''}`} onClick={onClick}>
      {children}

      <style jsx>{`
        .card {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          padding: ${getPadding()};
          transition: all 0.3s ease;
        }

        .hoverable {
          cursor: pointer;
        }

        .hoverable:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
}; 