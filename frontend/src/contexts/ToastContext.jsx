import React, { createContext, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Toast } from '../components/common/Toast';

export const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // 토스트 추가
  const addToast = useCallback((toast) => {
    setToasts(prev => [...prev, { ...toast, id: toast.id || Date.now() }]);
  }, []);

  // 토스트 제거
  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // 모든 토스트 제거
  const removeAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // 토스트 업데이트
  const updateToast = useCallback((id, updates) => {
    setToasts(prev => 
      prev.map(toast => 
        toast.id === id ? { ...toast, ...updates } : toast
      )
    );
  }, []);

  // 토스트 위치별 그룹화
  const groupedToasts = toasts.reduce((acc, toast) => {
    const position = toast.position || 'top-right';
    if (!acc[position]) {
      acc[position] = [];
    }
    acc[position].push(toast);
    return acc;
  }, {});

  // 토스트 컨테이너 스타일
  const getContainerStyle = (position) => {
    const baseStyle = {
      position: 'fixed',
      zIndex: 9999,
      pointerEvents: 'none',
      width: 'auto',
      maxWidth: '100%'
    };

    const positionStyles = {
      'top-left': {
        top: '1rem',
        left: '1rem'
      },
      'top-center': {
        top: '1rem',
        left: '50%',
        transform: 'translateX(-50%)'
      },
      'top-right': {
        top: '1rem',
        right: '1rem'
      },
      'bottom-left': {
        bottom: '1rem',
        left: '1rem'
      },
      'bottom-center': {
        bottom: '1rem',
        left: '50%',
        transform: 'translateX(-50%)'
      },
      'bottom-right': {
        bottom: '1rem',
        right: '1rem'
      }
    };

    return {
      ...baseStyle,
      ...positionStyles[position]
    };
  };

  const value = {
    addToast,
    removeToast,
    removeAllToasts,
    updateToast
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {Object.entries(groupedToasts).map(([position, toasts]) => (
        createPortal(
          <div
            key={position}
            className={`toast-container toast-${position}`}
            style={getContainerStyle(position)}
          >
            {toasts.map(toast => (
              <Toast
                key={toast.id}
                {...toast}
                onClose={() => {
                  removeToast(toast.id);
                  if (toast.onClose) {
                    toast.onClose();
                  }
                }}
              />
            ))}
          </div>,
          document.body
        )
      ))}
    </ToastContext.Provider>
  );
};

// 토스트 스타일 정의
const styles = `
  .toast-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .toast-container.toast-top-center,
  .toast-container.toast-bottom-center {
    align-items: center;
  }

  .toast-container.toast-top-right,
  .toast-container.toast-bottom-right {
    align-items: flex-end;
  }

  .toast-container.toast-top-left,
  .toast-container.toast-bottom-left {
    align-items: flex-start;
  }

  @media (max-width: 480px) {
    .toast-container {
      width: 100%;
      padding: 0 1rem;
    }

    .toast-container.toast-top-center,
    .toast-container.toast-top-right,
    .toast-container.toast-top-left {
      top: 0;
      left: 0;
      right: 0;
      transform: none;
    }

    .toast-container.toast-bottom-center,
    .toast-container.toast-bottom-right,
    .toast-container.toast-bottom-left {
      bottom: 0;
      left: 0;
      right: 0;
      transform: none;
    }
  }
`;

// 스타일 주입
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet); 