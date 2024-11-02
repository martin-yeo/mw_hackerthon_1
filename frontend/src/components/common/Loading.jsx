import React from 'react';

export const Loading = ({ size = 'medium', fullScreen = false }) => {
  const getSize = () => {
    switch (size) {
      case 'small': return '24px';
      case 'large': return '48px';
      default: return '36px';
    }
  };

  return (
    <div className={`loading-wrapper ${fullScreen ? 'fullscreen' : ''}`}>
      <div className="spinner"></div>
      
      <style jsx>{`
        .loading-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem;
        }

        .fullscreen {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.9);
          z-index: 1000;
        }

        .spinner {
          width: ${getSize()};
          height: ${getSize()};
          border: 3px solid var(--burgundy-gray);
          border-top-color: var(--burgundy-red);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}; 