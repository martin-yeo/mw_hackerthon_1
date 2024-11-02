import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import { validateEmail } from '../utils/validation';

export const ForgotPassword = () => {
  const { sendPasswordResetEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('올바른 이메일 주소를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await sendPasswordResetEmail(email);
      setSuccess(true);
    } catch (error) {
      setError(
        error.response?.data?.message || 
        '비밀번호 재설정 이메일 전송에 실패했습니다.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-page">
      <Card className="forgot-password-card">
        {!success ? (
          <>
            <div className="card-header">
              <h1>비밀번호 찾기</h1>
              <p>
                가입하신 이메일 주소를 입력하시면<br />
                비밀번호 재설정 링크를 보내드립니다.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <Input
                  type="email"
                  label="이메일"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  error={error}
                  placeholder="example@university.ac.kr"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                fullWidth
              >
                {isLoading ? '처리 중...' : '재설정 링크 받기'}
              </Button>
            </form>
          </>
        ) : (
          <div className="success-message">
            <div className="success-icon">
              <i className="material-icons">mark_email_read</i>
            </div>
            <h2>이메일을 확인해주세요</h2>
            <p>
              {email}로 비밀번호 재설정 링크를 보냈습니다.<br />
              이메일이 도착하지 않았다면 스팸함을 확인해주세요.
            </p>
          </div>
        )}

        <div className="card-footer">
          <Link to="/login">로그인 페이지로 돌아가기</Link>
        </div>
      </Card>

      <style jsx>{`
        .forgot-password-page {
          min-height: calc(100vh - var(--header-height));
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background-color: var(--background);
        }

        .forgot-password-card {
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
          line-height: 1.5;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .success-message {
          text-align: center;
          padding: 2rem 0;
        }

        .success-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 64px;
          background-color: var(--success-light);
          border-radius: 50%;
          margin-bottom: 1.5rem;
        }

        .success-icon i {
          font-size: 32px;
          color: var(--success);
        }

        .success-message h2 {
          margin: 0 0 1rem 0;
          color: var(--text-primary);
        }

        .success-message p {
          margin: 0;
          color: var(--text-secondary);
          line-height: 1.5;
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
          .forgot-password-page {
            padding: 1rem;
          }

          .forgot-password-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}; 