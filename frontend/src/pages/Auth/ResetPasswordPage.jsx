import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { AlertModal } from '../../components/notification/AlertModal';
import { useAuth } from '../../hooks/useAuth';
import { validatePassword } from '../../utils/validation';

export const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { resetPassword, verifyResetToken } = useAuth();
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);
  const [tokenChecked, setTokenChecked] = useState(false);

  useEffect(() => {
    checkToken();
  }, [token]);

  const checkToken = async () => {
    try {
      await verifyResetToken(token);
      setTokenValid(true);
    } catch (error) {
      setTokenValid(false);
    } finally {
      setTokenChecked(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // 에러 메시지 초기화
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
      newErrors.password = '새 비밀번호를 입력해주세요.';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = '비밀번호는 8자 이상이며, 영문 대소문자, 숫자, 특수문자를 포함해야 합니다.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await resetPassword(token, formData.password);
      setShowSuccessModal(true);
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || '비밀번호 재설정에 실패했습니다.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessConfirm = () => {
    navigate('/auth/login');
  };

  if (!tokenChecked) {
    return (
      <div className="auth-page">
        <Card className="auth-card">
          <div className="loading-message">
            <i className="material-icons spinning">refresh</i>
            <p>토큰 확인 중...</p>
          </div>
        </Card>
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <div className="auth-page">
        <Card className="auth-card">
          <div className="invalid-token">
            <i className="material-icons">error</i>
            <h2>유효하지 않은 링크</h2>
            <p>비밀번호 재설정 링크가 만료되었거나 유효하지 않습니다.</p>
            <Button
              as={Link}
              to="/auth/forgot-password"
              variant="primary"
            >
              새로운 링크 요청하기
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <Card className="auth-card">
        <div className="auth-header">
          <h1>새 비밀번호 설정</h1>
          <p>새로운 비밀번호를 입력해주세요.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="새 비밀번호"
              icon="lock"
              error={errors.password}
            />
          </div>

          <div className="form-group">
            <Input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="비밀번호 확인"
              icon="lock_clock"
              error={errors.confirmPassword}
            />
          </div>

          {errors.submit && (
            <div className="error-message">
              <i className="material-icons">error</i>
              {errors.submit}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={isLoading}
          >
            비밀번호 변경
          </Button>
        </form>
      </Card>

      <AlertModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="비밀번호 변경 완료"
        message="비밀번호가 성공적으로 변경되었습니다. 새로운 비밀번호로 로그인해주세요."
        type="success"
        confirmText="로그인하기"
        onConfirm={handleSuccessConfirm}
      />

      <style jsx>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background-color: var(--background);
        }

        .auth-card {
          width: 100%;
          max-width: 480px;
        }

        .auth-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .auth-header h1 {
          margin: 0 0 0.5rem 0;
          color: var(--text-primary);
        }

        .auth-header p {
          margin: 0;
          color: var(--text-secondary);
        }

        .auth-form {
          margin-bottom: 1rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--error);
          font-size: 0.875rem;
          margin-bottom: 1rem;
        }

        .error-message i {
          font-size: 1.25rem;
        }

        .loading-message,
        .invalid-token {
          text-align: center;
          padding: 2rem;
        }

        .loading-message i,
        .invalid-token i {
          font-size: 3rem;
          margin-bottom: 1rem;
          color: var(--text-secondary);
        }

        .invalid-token h2 {
          margin: 0 0 0.5rem 0;
          color: var(--text-primary);
        }

        .invalid-token p {
          margin: 0 0 1.5rem 0;
          color: var(--text-secondary);
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .spinning {
          animation: spin 1s linear infinite;
        }

        @media (max-width: 768px) {
          .auth-page {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}; 