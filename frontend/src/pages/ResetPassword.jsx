import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import { validatePassword } from '../utils/validation';

export const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { resetPassword, verifyResetToken } = useAuth();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [tokenError, setTokenError] = useState('');

  useEffect(() => {
    verifyToken();
  }, [token]);

  const verifyToken = async () => {
    try {
      await verifyResetToken(token);
      setIsTokenValid(true);
    } catch (error) {
      setTokenError('유효하지 않거나 만료된 링크입니다.');
    }
  };

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
    
    if (!validatePassword(formData.password)) {
      newErrors.password = '비밀번호는 8자 이상이며, 영문, 숫자, 특수문자를 포함해야 합니다.';
    }

    if (formData.password !== formData.confirmPassword) {
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
      navigate('/login', { 
        state: { message: '비밀번호가 성공적으로 변경되었습니다.' }
      });
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || '비밀번호 재설정에 실패했습니다.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isTokenValid) {
    return (
      <div className="reset-password-page">
        <Card className="reset-password-card">
          <div className="error-state">
            <div className="error-icon">
              <i className="material-icons">error</i>
            </div>
            <h2>링크 오류</h2>
            <p>{tokenError}</p>
            <Button onClick={() => navigate('/forgot-password')}>
              비밀번호 재설정 다시 시도
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="reset-password-page">
      <Card className="reset-password-card">
        <div className="card-header">
          <h1>새 비밀번호 설정</h1>
          <p>새로운 비밀번호를 입력해주세요.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <Input
              type="password"
              name="password"
              label="새 비밀번호"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />
          </div>

          <div className="form-group">
            <Input
              type="password"
              name="confirmPassword"
              label="새 비밀번호 확인"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
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
            {isLoading ? '처리 중...' : '비밀번호 변경'}
          </Button>
        </form>

        <div className="card-footer">
          <Link to="/login">로그인 페이지로 돌아가기</Link>
        </div>
      </Card>

      <style jsx>{`
        .reset-password-page {
          min-height: calc(100vh - var(--header-height));
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background-color: var(--background);
        }

        .reset-password-card {
          width: 100%;
          max-width: 400px;
        }

        .card-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .card-header h1 {
          margin: 0 0 0.5rem 0;
          color: var(--text-primary);
        }

        .card-header p {
          margin: 0;
          color: var(--text-secondary);
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .error-message {
          color: var(--error);
          text-align: center;
          margin-bottom: 1rem;
          font-size: 0.875rem;
        }

        .error-state {
          text-align: center;
          padding: 2rem 0;
        }

        .error-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 64px;
          background-color: var(--error-light);
          border-radius: 50%;
          margin-bottom: 1.5rem;
        }

        .error-icon i {
          font-size: 32px;
          color: var(--error);
        }

        .error-state h2 {
          margin: 0 0 1rem 0;
          color: var(--text-primary);
        }

        .error-state p {
          margin: 0 0 1.5rem 0;
          color: var(--text-secondary);
        }

        .card-footer {
          margin-top: 2rem;
          text-align: center;
        }

        .card-footer a {
          color: var(--burgundy-red);
          text-decoration: none;
        }

        .card-footer a:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .reset-password-page {
            padding: 1rem;
          }

          .reset-password-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}; 