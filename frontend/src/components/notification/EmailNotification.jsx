import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Switch } from '../common/Switch';
import { useAuth } from '../../hooks/useAuth';
import { validateEmail } from '../../utils/validation';

export const EmailNotification = () => {
  const { user, updateNotificationSettings } = useAuth();
  const [settings, setSettings] = useState({
    email: user?.email || '',
    notifications: {
      reservationConfirmation: true,
      reservationReminder: true,
      statusChange: true,
      newsletter: false
    }
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleEmailChange = (e) => {
    setSettings(prev => ({
      ...prev,
      email: e.target.value
    }));
    if (errors.email) {
      setErrors(prev => ({
        ...prev,
        email: ''
      }));
    }
  };

  const handleNotificationToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!settings.email) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!validateEmail(settings.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await updateNotificationSettings(settings);
      setSuccessMessage('알림 설정이 성공적으로 업데이트되었습니다.');
      setIsEditing(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || '설정 업데이트에 실패했습니다.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="email-notification">
      <div className="notification-header">
        <h3>이메일 알림 설정</h3>
        <Button
          variant="text"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? '취소' : '수정'}
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <Input
            label="알림 수신 이메일"
            type="email"
            value={settings.email}
            onChange={handleEmailChange}
            disabled={!isEditing}
            error={errors.email}
          />
        </div>

        <div className="notification-options">
          <div className="option-item">
            <div className="option-info">
              <h4>예약 확인</h4>
              <p>예약이 완료되면 확인 이메일을 받습니다.</p>
            </div>
            <Switch
              checked={settings.notifications.reservationConfirmation}
              onChange={() => handleNotificationToggle('reservationConfirmation')}
              disabled={!isEditing}
            />
          </div>

          <div className="option-item">
            <div className="option-info">
              <h4>예약 리마인더</h4>
              <p>예약 시간 1시간 전에 알림을 받습니다.</p>
            </div>
            <Switch
              checked={settings.notifications.reservationReminder}
              onChange={() => handleNotificationToggle('reservationReminder')}
              disabled={!isEditing}
            />
          </div>

          <div className="option-item">
            <div className="option-info">
              <h4>상태 변경 알림</h4>
              <p>예약 상태가 변경되면 알림을 받습니다.</p>
            </div>
            <Switch
              checked={settings.notifications.statusChange}
              onChange={() => handleNotificationToggle('statusChange')}
              disabled={!isEditing}
            />
          </div>

          <div className="option-item">
            <div className="option-info">
              <h4>뉴스레터</h4>
              <p>FabLab의 새로운 소식과 이벤트 정보를 받습니다.</p>
            </div>
            <Switch
              checked={settings.notifications.newsletter}
              onChange={() => handleNotificationToggle('newsletter')}
              disabled={!isEditing}
            />
          </div>
        </div>

        {isEditing && (
          <div className="form-actions">
            <Button
              type="submit"
              disabled={isLoading}
              fullWidth
            >
              {isLoading ? '저장 중...' : '설정 저장'}
            </Button>
          </div>
        )}

        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}

        {errors.submit && (
          <div className="error-message">
            {errors.submit}
          </div>
        )}
      </form>

      <style jsx>{`
        .email-notification {
          max-width: 600px;
          margin: 0 auto;
        }

        .notification-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .notification-header h3 {
          margin: 0;
        }

        .form-group {
          margin-bottom: 2rem;
        }

        .notification-options {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .option-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background-color: var(--background);
          border-radius: 8px;
        }

        .option-info {
          flex: 1;
          margin-right: 1rem;
        }

        .option-info h4 {
          margin: 0 0 0.25rem 0;
          color: var(--text-primary);
        }

        .option-info p {
          margin: 0;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .form-actions {
          margin-top: 2rem;
        }

        .success-message {
          margin-top: 1rem;
          padding: 1rem;
          background-color: var(--success-light);
          color: var(--success);
          border-radius: 4px;
          text-align: center;
        }

        .error-message {
          margin-top: 1rem;
          padding: 1rem;
          background-color: var(--error-light);
          color: var(--error);
          border-radius: 4px;
          text-align: center;
        }

        @media (max-width: 768px) {
          .option-item {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }

          .option-info {
            margin-right: 0;
          }
        }
      `}</style>
    </Card>
  );
}; 