import React from 'react';
import { Modal } from './Modal';

export const Confirm = ({
  isOpen,
  onClose,
  onConfirm,
  title = '확인',
  message,
  confirmText = '확인',
  cancelText = '취소',
  type = 'info',
  size = 'small'
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const getIcon = () => {
    switch (type) {
      case 'danger':
        return 'warning';
      case 'success':
        return 'check_circle';
      case 'warning':
        return 'error_outline';
      default:
        return 'help_outline';
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      showCloseButton={false}
    >
      <div className="confirm-dialog">
        <div className={`icon-container ${type}`}>
          <i className="material-icons">{getIcon()}</i>
        </div>

        <div className="content">
          <h2 className="title">{title}</h2>
          <p className="message">{message}</p>
        </div>

        <div className="actions">
          <button 
            className="cancel-button"
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button 
            className={`confirm-button ${type}`}
            onClick={handleConfirm}
            autoFocus
          >
            {confirmText}
          </button>
        </div>

        <style jsx>{`
          .confirm-dialog {
            text-align: center;
            padding: 20px;
          }

          .icon-container {
            margin-bottom: 20px;
          }

          .icon-container i {
            font-size: 48px;
          }

          .icon-container.info { color: #2196F3; }
          .icon-container.success { color: #4CAF50; }
          .icon-container.warning { color: #FFC107; }
          .icon-container.danger { color: #F44336; }

          .title {
            margin: 0 0 12px 0;
            font-size: 1.25rem;
            color: #333;
          }

          .message {
            margin: 0;
            color: #666;
            line-height: 1.5;
          }

          .actions {
            display: flex;
            justify-content: center;
            gap: 12px;
            margin-top: 24px;
          }

          button {
            padding: 10px 24px;
            border: none;
            border-radius: 4px;
            font-size: 14px;
            cursor: pointer;
            transition: background-color 0.2s;
          }

          .cancel-button {
            background-color: #f0f0f0;
            color: #333;
          }

          .cancel-button:hover {
            background-color: #e0e0e0;
          }

          .confirm-button {
            color: white;
          }

          .confirm-button.info { background-color: #2196F3; }
          .confirm-button.success { background-color: #4CAF50; }
          .confirm-button.warning { background-color: #FFC107; }
          .confirm-button.danger { background-color: #F44336; }

          .confirm-button.info:hover { background-color: #1976D2; }
          .confirm-button.success:hover { background-color: #388E3C; }
          .confirm-button.warning:hover { background-color: #FFA000; }
          .confirm-button.danger:hover { background-color: #D32F2F; }
        `}</style>
      </div>
    </Modal>
  );
}; 