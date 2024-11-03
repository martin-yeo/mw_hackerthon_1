import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Checkbox } from '../common/Checkbox';
import { useAuth } from '../../hooks/useAuth';
import { validateEmail } from '../../utils/validation';

export const LoginForm = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // 에러 메시지 초기화
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.';
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await login(formData.email, formData.password, formData.rememberMe);
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || '로그인에 실패했습니다.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="form-group">
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="이메일"
          icon="email"
          error={errors.email}
        />
      </div>

      <div className="form-group">
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="비밀번호"
          icon="lock"
          error={errors.password}
        />
      </div>

      <div className="form-options">
        <Checkbox
          name="rememberMe"
          checked={formData.rememberMe}
          onChange={handleChange}
          label="로그인 상태 유지"
        />
        <Link to="/auth/forgot-password" className="forgot-password">
          비밀번호를 잊으셨나요?
        </Link>
      </div>

      {errors.submit && (
        <div className="error-message">
          <i className="material-icons">error</i>
          {errors.submit}
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={isLoading}
      >
        로그인
      </Button>

      <style jsx>{`
        .login-form {
          margin-bottom: 1rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .forgot-password {
          color: var(--text-secondary);
          font-size: 0.875rem;
          text-decoration: none;
        }

        .forgot-password:hover {
          color: var(--primary);
          text-decoration: underline;
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--error);
          font-size: 0.875rem;
          margin-bottom: 1rem;
        }

        .error-message i {
          font-size: 1.25rem;
        }
      `}</style>
    </form>
  );
}; 