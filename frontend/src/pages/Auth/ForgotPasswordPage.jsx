import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { AlertModal } from '../../components/notification/AlertModal';
import { useAuth } from '../../hooks/useAuth';
import { validateEmail } from '../../utils/validation';

export const ForgotPasswordPage = () => {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('이메일을 입력해주세요.');
      return;
    }

    if (!validateEmail(email)) {
      setError('올바른 이메일 형식이 아닙니다.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await requestPasswordReset(email);
      setShowSuccessModal(true);
    } catch (err) {
      setError(err.response?.data?.message || '비밀번호 재설정 요청에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Card className="auth-card">
        <div className="auth-header">
          <h1>비밀번호 찾기</h1>
          <p>가입하신 이메일 주소를 입력하시면 비밀번호 재설정 링크를 보내드립니다.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <Input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="이메일 주소를 입력하세요"
              icon="email"
              error={error}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={isLoading}
          >
            비밀번호 재설정 링크 받기
          </Button>
        </form>

        <div className="auth-footer">
          <Link to="/auth/login" className="back-link">
            <i className="material-icons">arrow_back</i>
            로그인으로 돌아가기
          </Link>
        </div>
      </Card>

      <AlertModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="이메일 전송 완료"
        message="비밀번호 재설정 링크가 이메일로 전송되었습니다. 이메일을 확인해주세요."
        type="success"
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
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .auth-form {
          margin-bottom: 2rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .auth-footer {
          text-align: center;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.875rem;
        }

        .back-link:hover {
          color: var(--text-primary);
        }

        .back-link i {
          font-size: 1.25rem;
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