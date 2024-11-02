import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';
import { 
  validateEmail, 
  validatePassword, 
  validateName,
  validateStudentId,
  validatePasswordMatch 
} from '../../utils/validation';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [error, setError] = useState('');

  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      studentId: '',
      agreeToTerms: false
    },
    validate: {
      email: validateEmail,
      password: validatePassword,
      confirmPassword: (value) => validatePasswordMatch(values.password, value),
      name: validateName,
      studentId: validateStudentId,
      agreeToTerms: (value) => !value ? '이용약관에 동의해주세요.' : ''
    },
    onSubmit: async (values) => {
      try {
        await register({
          email: values.email,
          password: values.password,
          name: values.name,
          studentId: values.studentId
        });
        navigate('/auth/login', { 
          state: { message: '회원가입이 완료되었습니다. 로그인해주세요.' } 
        });
      } catch (err) {
        setError(err.message || '회원가입 중 오류가 발생했습니다.');
      }
    }
  });

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>회원가입</h1>
          <p>새로운 계정을 만들어보세요</p>
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
                placeholder="학교 이메일을 입력하세요"
              />
            </div>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">이름</label>
              <input
                type="text"
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="이름을 입력하세요"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="studentId">학번</label>
              <input
                type="text"
                id="studentId"
                name="studentId"
                value={values.studentId}
                onChange={handleChange}
                placeholder="학번을 입력하세요"
              />
              {errors.studentId && <span className="error-message">{errors.studentId}</span>}
            </div>
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

          <div className="form-group">
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <div className="input-wrapper">
              <i className="material-icons input-icon left">lock_clock</i>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                placeholder="비밀번호를 다시 입력하세요"
              />
            </div>
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={values.agreeToTerms}
              onChange={handleChange}
            />
            <label htmlFor="agreeToTerms">
              <Link to="/terms" target="_blank">이용약관</Link>에 동의합니다
            </label>
          </div>
          {errors.agreeToTerms && (
            <span className="error-message">{errors.agreeToTerms}</span>
          )}

          <button type="submit" className="submit-button">
            회원가입
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-links">
            이미 계정이 있으신가요? <Link to="/auth/login">로그인</Link>
          </p>
        </div>
      </div>
    </div>
  );
}; 