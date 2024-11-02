import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';
import { validateEmail, validatePassword } from '../../utils/validation';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');

  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    validate: {
      email: validateEmail,
      password: validatePassword
    },
    onSubmit: async (values) => {
      try {
        await login(values.email, values.password, values.rememberMe);
        navigate('/');
      } catch (err) {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.');
      }
    }
  });

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>로그인</h1>
          <p>계정에 로그인하여 시작하세요</p>
        </div>

        {error && (
          <div className="alert error">
            <i className="material-icons">error</i>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <div className="input-wrapper">
              <i className="material-icons input-icon left">email</i>
              <input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="example@domain.com"
              />
            </div>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <div className="input-wrapper">
              <i className="material-icons input-icon left">lock</i>
              <input
                type="password"
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                placeholder="비밀번호를 입력하세요"
              />
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-options">
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={values.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="rememberMe">로그인 상태 유지</label>
            </div>
            <Link to="/auth/forgot-password" className="forgot-password">
              비밀번호를 잊으셨나요?
            </Link>
          </div>

          <button type="submit" className="submit-button">
            로그인
          </button>
        </form>

        <div className="auth-footer">
          <div className="divider">
            <span>또는</span>
          </div>

          <div className="social-buttons">
            <button className="social-button google">
              <img src="/images/google-icon.svg" alt="Google" />
              Google로 계속하기
            </button>
            <button className="social-button facebook">
              <img src="/images/facebook-icon.svg" alt="Facebook" />
              페이스북으로 계속하기
            </button>
            <button className="social-button kakao">
              <img src="/images/kakao-icon.svg" alt="Kakao" />
              카카오로 계속하기
            </button>
            <button className="social-button github">
              <img src="/images/github-icon.svg" alt="GitHub" />
              GitHub로 계속하기
            </button>
            <button className="social-button naver">
              <img src="/images/naver-icon.svg" alt="Naver" />
              네이버로 계속하기
            </button>
          </div>

          <p className="auth-links">
            계정이 없으신가요? <Link to="/auth/register">회원가입</Link>
          </p>
        </div>
      </div>
    </div>
  );
}; 