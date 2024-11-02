import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const ToastContainer = ({ children }) => {
  return (
    <div className="toast-container">
      {children}
      <style jsx>{`
        .toast-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          display: flex;
          flex-direction: column-reverse;
          gap: 10px;
          z-index: 9999;
        }
      `}</style>
    </div>
  );
};

export const Toast = ({ 
  message, 
  type = 'info', 
  duration = 3000,
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'check_circle';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      default:
        return 'info';
    }
  };

  return createPortal(
    <ToastContainer>
      <div className={`toast ${type} ${isExiting ? 'exit' : ''}`}>
        <i className="material-icons">{getIcon()}</i>
        <span className="message">{message}</span>
        <button className="close-button" onClick={() => setIsExiting(true)}>
          <i className="material-icons">close</i>
        </button>

        <style jsx>{`
          .toast {
            display: flex;
            align-items: center;
            padding: 12px 20px;
            border-radius: 6px;
            color: white;
            min-width: 300px;
            max-width: 500px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            animation: slideIn 0.3s ease-out;
            transition: transform 0.3s ease-out, opacity 0.3s ease-out;
          }

          .toast.exit {
            transform: translateX(100%);
            opacity: 0;
          }

          .toast.info {
            background-color: #2196F3;
          }

          .toast.success {
            background-color: #4CAF50;
          }

          .toast.warning {
            background-color: #FFC107;
          }

          .toast.error {
            background-color: #F44336;
          }

          .material-icons {
            margin-right: 12px;
          }

          .message {
            flex: 1;
            margin-right: 12px;
          }

          .close-button {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 0;
            opacity: 0.8;
            transition: opacity 0.2s;
          }

          .close-button:hover {
            opacity: 1;
          }

          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}</style>
      </div>
    </ToastContainer>,
    document.body
  );
}; 