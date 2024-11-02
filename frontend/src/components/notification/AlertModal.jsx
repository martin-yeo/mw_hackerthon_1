import React, { useEffect } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

export const AlertModal = ({
  isOpen,
  onClose,
  title,
  message,
  type = 'info',
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  showCancel = false,
  autoClose = 0
}) => {
  useEffect(() => {
    if (autoClose > 0 && isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, autoClose);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, onClose]);

  if (!isOpen) return null;

  const getIconByType = () => {
    switch (type) {
      case 'success':
        return 'check_circle';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
      default:
        return 'info';
    }
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  return (
    <div className="modal-overlay">
      <Card className="alert-modal">
        <div className={`modal-icon ${type}`}>
          <i className="material-icons">{getIconByType()}</i>
        </div>

        {title && <h3 className="modal-title">{title}</h3>}
        
        <div className="modal-content">
          {message}
        </div>

        <div className="modal-actions">
          {showCancel && (
            <Button
              variant="secondary"
              onClick={onClose}
            >
              {cancelText}
            </Button>
          )}
          <Button
            variant={type === 'error' ? 'danger' : 'primary'}
            onClick={handleConfirm}
          >
            {confirmText}
          </Button>
        </div>

        {autoClose > 0 && (
          <div className="auto-close-progress">
            <div 
              className="progress-bar"
              style={{
                animationDuration: `${autoClose}ms`
              }}
            />
          </div>
        )}

        <style jsx>{`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: var(--z-index-modal);
            animation: fadeIn 0.2s ease-out;
          }

          .alert-modal {
            width: 90%;
            max-width: 400px;
            padding: 2rem;
            text-align: center;
            animation: slideIn 0.2s ease-out;
          }

          .modal-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 64px;
            height: 64px;
            margin: 0 auto 1.5rem;
            border-radius: 50%;
          }

          .modal-icon i {
            font-size: 32px;
          }

          .modal-icon.success {
            background-color: var(--success-light);
            color: var(--success);
          }

          .modal-icon.error {
            background-color: var(--error-light);
            color: var(--error);
          }

          .modal-icon.warning {
            background-color: var(--warning-light);
            color: var(--warning);
          }

          .modal-icon.info {
            background-color: var(--info-light);
            color: var(--info);
          }

          .modal-title {
            margin: 0 0 1rem 0;
            color: var(--text-primary);
          }

          .modal-content {
            margin-bottom: 1.5rem;
            color: var(--text-secondary);
            line-height: 1.5;
          }

          .modal-actions {
            display: flex;
            justify-content: center;
            gap: 1rem;
          }

          .auto-close-progress {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 4px;
            background-color: var(--background);
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
            overflow: hidden;
          }

          .progress-bar {
            height: 100%;
            background-color: var(--burgundy-red);
            animation: progress linear;
            transform-origin: left;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes slideIn {
            from {
              transform: translateY(-20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          @keyframes progress {
            from {
              transform: scaleX(1);
            }
            to {
              transform: scaleX(0);
            }
          }

          @media (max-width: 768px) {
            .alert-modal {
              padding: 1.5rem;
            }

            .modal-icon {
              width: 48px;
              height: 48px;
              margin-bottom: 1rem;
            }

            .modal-icon i {
              font-size: 24px;
            }

            .modal-actions {
              flex-direction: column-reverse;
            }
          }
        `}</style>
      </Card>
    </div>
  );
}; 