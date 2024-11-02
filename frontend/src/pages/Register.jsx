import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { RegisterForm } from '../components/auth/RegisterForm';
import { SocialLogin } from '../components/auth/SocialLogin';

export const Register = () => {
  return (
    <div className="register-page">
      <Card className="register-card">
        <div className="register-header">
          <h1>회원가입</h1>
          <p>FabLab 좌석 예약 시스템 회원이 되어주세요.</p>
        </div>

        <RegisterForm />

        <SocialLogin />

        <div className="register-footer">
          <p>
            이미 계정이 있으신가요?{' '}
            <Link to="/login">로그인</Link>
          </p>
        </div>

        <div className="terms">
          <p>
            회원가입 시{' '}
            <Link to="/terms">이용약관</Link>과{' '}
            <Link to="/privacy">개인정보 처리방침</Link>에 동의하게 됩니다.
          </p>
        </div>
      </Card>

      <style jsx>{`
        .register-page {
          min-height: calc(100vh - var(--header-height));
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background-color: var(--background);
        }

        .register-card {
          width: 100%;
          max-width: 500px;
        }

        .register-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .register-header h1 {
          margin: 0 0 0.5rem 0;
          color: var(--text-primary);
        }

        .register-header p {
          margin: 0;
          color: var(--text-secondary);
        }

        .register-footer {
          margin-top: 2rem;
          text-align: center;
          color: var(--text-secondary);
        }

        .register-footer p {
          margin: 0.5rem 0;
        }

        .register-footer a {
          color: var(--burgundy-red);
          text-decoration: none;
        }

        .register-footer a:hover {
          text-decoration: underline;
        }

        .terms {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
          text-align: center;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .terms p {
          margin: 0;
        }

        .terms a {
          color: var(--burgundy-red);
          text-decoration: none;
        }

        .terms a:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .register-page {
            padding: 1rem;
          }

          .register-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}; 