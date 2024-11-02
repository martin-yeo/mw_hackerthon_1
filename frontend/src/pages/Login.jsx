import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { LoginForm } from '../components/auth/LoginForm';
import { SocialLogin } from '../components/auth/SocialLogin';

export const Login = () => {
  return (
    <div className="login-page">
      <Card className="login-card">
        <div className="login-header">
          <h1>로그인</h1>
          <p>FabLab 좌석 예약 시스템에 오신 것을 환영합니다.</p>
        </div>

        <LoginForm />
        
        <SocialLogin />

        <div className="login-footer">
          <p>
            아직 계정이 없으신가요?{' '}
            <Link to="/register">회원가입</Link>
          </p>
          <p>
            <Link to="/forgot-password">비밀번호를 잊으셨나요?</Link>
          </p>
        </div>
      </Card>

      <style jsx>{`
        .login-page {
          min-height: calc(100vh - var(--header-height));
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background-color: var(--background);
        }

        .login-card {
          width: 100%;
          max-width: 400px;
        }

        .login-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .login-header h1 {
          margin: 0 0 0.5rem 0;
          color: var(--text-primary);
        }

        .login-header p {
          margin: 0;
          color: var(--text-secondary);
        }

        .login-footer {
          margin-top: 2rem;
          text-align: center;
          color: var(--text-secondary);
        }

        .login-footer p {
          margin: 0.5rem 0;
        }

        .login-footer a {
          color: var(--burgundy-red);
          text-decoration: none;
        }

        .login-footer a:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .login-page {
            padding: 1rem;
          }

          .login-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}; 