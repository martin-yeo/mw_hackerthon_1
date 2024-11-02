import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';
import { validateEmail } from '../../utils/validation';
import { useToast } from '../../hooks/useToast';

export const ForgotPasswordPage = () => {
  const { resetPassword } = useAuth();
  const { showToast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      email: ''
    },
    validate: {
      email: validateEmail
    },
    onSubmit: async (values) => {
      try {
        await resetPassword(values.email);
        setIsSubmitted(true);
        showToast({
          type: 'success',
          message: '비밀번호 재설정 링크가 이메일로 전송되었습니다.'
        });
      } catch (err) {
        showToast({
          type: 'error',
          message: '비밀번호 재설정 이메일 전송에 실패했습니다.'
        });
      }
    }
  });

  if (isSubmitted) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="success-icon">
              <i className="material-icons">check_circle</i>
            </div>
            <h1>이메일 전송 완료</h1>
            <p>
              비밀번호 재설정 링크를 이메일로 전송했습니다.<br />
              이메일을 확인해 주세요.
            </p>
          </div>

          <div className="auth-footer">
            <p>
              이메일을 받지 못하셨나요?{' '}
              <button 
                className="text-button"
                onClick={() => handleSubmit()}
              >
                다시 보내기
              </button>
            </p>
            <Link to="/auth/login" className="button primary mt-4">
              로그인 페이지로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>비밀번호 찾기</h1>
          <p>
            가입한 이메일 주소를 입력하시면<br />
            비밀번호 재설정 링크를 보내드립니다.
          </p>
        </div>

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
                placeholder="가입한 이메일을 입력하세요"
                autoFocus
              />
            </div>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <button type="submit" className="submit-button">
            비밀번호 재설정 링크 받기
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-links">
            비밀번호가 기억나셨나요? <Link to="/auth/login">로그인</Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        .success-icon {
          text-align: center;
          margin-bottom: ${({ theme }) => theme.spacing(4)};
          
          i {
            font-size: 48px;
            color: ${({ theme }) => theme.colors.success.main};
          }
        }

        .text-button {
          background: none;
          border: none;
          color: ${({ theme }) => theme.colors.primary.main};
          text-decoration: underline;
          cursor: pointer;
          padding: 0;
          font: inherit;

          &:hover {
            color: ${({ theme }) => theme.colors.primary.dark};
          }
        }
      `}</style>
    </div>
  );
}; 