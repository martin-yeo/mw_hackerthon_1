import React from 'react';

export const Loading = ({ 
  size = 'medium', 
  color = '#800020',
  fullScreen = false,
  text = '로딩 중...'
}) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return 24;
      case 'large':
        return 48;
      case 'medium':
      default:
        return 36;
    }
  };

  const spinnerSize = getSize();

  return (
    <div className={`loading-container ${fullScreen ? 'fullscreen' : ''}`}>
      <div className="spinner"></div>
      {text && <p className="loading-text">{text}</p>}

      <style jsx>{`
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .loading-container.fullscreen {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(255, 255, 255, 0.9);
          z-index: 9999;
        }

        .spinner {
          width: ${spinnerSize}px;
          height: ${spinnerSize}px;
          border: 3px solid #f3f3f3;
          border-top: 3px solid ${color};
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .loading-text {
          margin-top: 12px;
          color: #666;
          font-size: ${size === 'small' ? '14px' : '16px'};
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}; 