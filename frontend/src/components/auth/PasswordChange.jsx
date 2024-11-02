import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { validatePassword } from '../../utils/validation';

export const PasswordChange = () => {
  const { changePassword } = useAuth();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.currentPassword) {
      newErrors.currentPassword = '현재 비밀번호를 입력해주세요.';
    }

    if (!formData.newPassword) {
      newErrors.newPassword = '새 비밀번호를 입력해주세요.';
    } else if (!validatePassword(formData.newPassword)) {
      newErrors.newPassword = '비밀번호는 8자 이상의 영문 대소문자, 숫자, 특수문자를 포함해야 합니다.';
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = '새 비밀번호가 일치하지 않습니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await changePassword(formData.currentPassword, formData.newPassword);
      setSuccess(true);
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || '비밀번호 변경에 실패했습니다.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="password-change-form">
      {success && (
        <div className="success-message">
          비밀번호가 성공적으로 변경되었습니다.
        </div>
      )}

      <div className="form-group">
        <Input
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          placeholder="현재 비밀번호"
          error={errors.currentPassword}
        />
      </div>

      <div className="form-group">
        <Input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          placeholder="새 비밀번호"
          error={errors.newPassword}
        />
      </div>

      <div className="form-group">
        <Input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="새 비밀번호 확인"
          error={errors.confirmPassword}
        />
      </div>

      {errors.submit && (
        <div className="error-message">{errors.submit}</div>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        fullWidth
      >
        {isLoading ? '변경 중...' : '비밀번호 변경'}
      </Button>

      <style jsx>{`
        .password-change-form {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .success-message {
          color: var(--success);
          background-color: var(--success-light);
          padding: 1rem;
          border-radius: 4px;
          margin-bottom: 1rem;
          text-align: center;
        }

        .error-message {
          color: var(--error);
          font-size: 0.875rem;
          margin-bottom: 1rem;
          text-align: center;
        }
      `}</style>
    </form>
  );
}; 