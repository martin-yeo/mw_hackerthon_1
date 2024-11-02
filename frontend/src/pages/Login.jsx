import React from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { SocialLogin } from '../components/auth/SocialLogin';
import { Link } from 'react-router-dom';

export const Login = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="logo-section">
          <img src="/images/logo.png" alt="목원대학교 로고" />
          <h1>FabLab 예약 시스템</h1>
        </div>

        <div className="form-section">
          <LoginForm />
          
          <div className="divider">
            <span>또는</span>
          </div>

          <SocialLogin />
        </div>

        <div className="links-section">
          <Link to="/register" className="register-link">
            회원가입
          </Link>
          <span className="separator">|</span>
          <Link to="/forgot-password" className="forgot-password-link">
            비밀번호 찾기
          </Link>
        </div>
      </div>

      <footer className="login-footer">
        <p>© 2024 목원대학교 컴퓨터공학과. All rights reserved.</p>
      </footer>
    </div>
  );
}; 