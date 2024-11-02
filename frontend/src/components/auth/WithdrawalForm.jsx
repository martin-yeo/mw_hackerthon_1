import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { TextArea } from '../common/TextArea';

export const WithdrawalForm = () => {
  const navigate = useNavigate();
  const { withdraw } = useAuth();
  const [formData, setFormData] = useState({
    password: '',
    reason: '',
    confirmation: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
    
    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    }

    if (!formData.reason.trim()) {
      newErrors.reason = '탈퇴 사유를 입력해주세요.';
    }

    if (formData.confirmation !== '회원탈퇴') {
      newErrors.confirmation = "'회원탈퇴'를 정확히 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const confirmed = window.confirm(
      '정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.'
    );

    if (!confirmed) return;

    setIsLoading(true);
    try {
      await withdraw(formData.password, formData.reason);
      navigate('/login');
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || '회원 탈퇴에 실패했습니다.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="withdrawal-form">
      <div className="warning-message">
        <i className="material-icons">warning</i>
        <p>
          회원 탈퇴 시 모든 데이터가 삭제되며, 이 작업은 되돌릴 수 없습니다.
          신중하게 결정해 주세요.
        </p>
      </div>

      <div className="form-group">
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="비밀번호"
          error={errors.password}
        />
      </div>

      <div className="form-group">
        <TextArea
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          placeholder="탈퇴 사유를 입력해주세요."
          error={errors.reason}
          rows={4}
        />
      </div>

      <div className="form-group">
        <Input
          type="text"
          name="confirmation"
          value={formData.confirmation}
          onChange={handleChange}
          placeholder="'회원탈퇴'를 입력해주세요."
          error={errors.confirmation}
        />
      </div>

      {errors.submit && (
        <div className="error-message">{errors.submit}</div>
      )}

      <Button
        type="submit"
        variant="danger"
        disabled={isLoading}
        fullWidth
      >
        {isLoading ? '처리 중...' : '회원 탈퇴'}
      </Button>

      <style jsx>{`
        .withdrawal-form {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
        }

        .warning-message {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1rem;
          background-color: var(--warning-light);
          border-radius: 4px;
          margin-bottom: 2rem;
        }

        .warning-message i {
          color: var(--warning);
          font-size: 1.5rem;
        }

        .warning-message p {
          color: var(--text-primary);
          font-size: 0.875rem;
          margin: 0;
        }

        .form-group {
          margin-bottom: 1rem;
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