import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/common/Card';
import { RegisterForm } from '../../components/auth/RegisterForm';
import { SocialLogin } from '../../components/auth/SocialLogin';

export const RegisterPage = () => {
  return (
    <div className="auth-page">
      <Card className="auth-card">
        <div className="auth-header">
          <h1>회원가입</h1>
          <p>FabLab 예약 시스템에 오신 것을 환영합니다</p>
        </div>

        <RegisterForm />

        <div className="auth-divider">
          <span>또는</span>
        </div>

        <SocialLogin />

        <div className="auth-footer">
          <p>
            이미 계정이 있으신가요?{' '}
            <Link to="/auth/login" className="link">
              로그인
            </Link>
          </p>
        </div>
      </Card>

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

        .auth-divider {
          position: relative;
          text-align: center;
          margin: 2rem 0;
        }

        .auth-divider::before,
        .auth-divider::after {
          content: '';
          position: absolute;
          top: 50%;
          width: calc(50% - 1rem);
          height: 1px;
          background-color: var(--border-color);
        }

        .auth-divider::before {
          left: 0;
        }

        .auth-divider::after {
          right: 0;
        }

        .auth-divider span {
          background-color: white;
          padding: 0 1rem;
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .auth-footer {
          text-align: center;
          margin-top: 2rem;
        }

        .auth-footer p {
          margin: 0;
          color: var(--text-secondary);
        }

        .link {
          color: var(--primary);
          text-decoration: none;
        }

        .link:hover {
          text-decoration: underline;
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