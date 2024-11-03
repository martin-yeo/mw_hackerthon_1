import React, { useState } from 'react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Checkbox } from '../common/Checkbox';
import { useAuth } from '../../hooks/useAuth';
import { validateEmail, validatePassword, validateStudentId } from '../../utils/validation';

export const RegisterForm = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    studentId: '',
    phone: '',
    department: '',
    agreeToTerms: false
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
    } else if (!validatePassword(formData.password)) {
      newErrors.password = '비밀번호는 8자 이상이며, 영문 대소문자, 숫자, 특수문자를 포함해야 합니다.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    if (!formData.name) {
      newErrors.name = '이름을 입력해주세요.';
    }

    if (!formData.studentId) {
      newErrors.studentId = '학번을 입력해주세요.';
    } else if (!validateStudentId(formData.studentId)) {
      newErrors.studentId = '올바른 학번 형식이 아닙니다.';
    }

    if (!formData.phone) {
      newErrors.phone = '전화번호를 입력해주세요.';
    }

    if (!formData.department) {
      newErrors.department = '학과를 입력해주세요.';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = '이용약관에 동의해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await register(formData);
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || '회원가입에 실패했습니다.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <div className="form-row">
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
      </div>

      <div className="form-row">
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
      </div>

      <div className="form-row">
        <div className="form-group">
          <Input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="비밀번호 확인"
            icon="lock_clock"
            error={errors.confirmPassword}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="이름"
            icon="person"
            error={errors.name}
          />
        </div>
      </div>

      <div className="form-row two-columns">
        <div className="form-group">
          <Input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            placeholder="학번"
            icon="badge"
            error={errors.studentId}
          />
        </div>
        <div className="form-group">
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="전화번호"
            icon="phone"
            error={errors.phone}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <Input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="학과"
            icon="school"
            error={errors.department}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group checkbox-group">
          <Checkbox
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            label={
              <span>
                <a href="/terms" target="_blank" rel="noopener noreferrer">
                  이용약관
                </a>
                에 동의합니다
              </span>
            }
            error={errors.agreeToTerms}
          />
        </div>
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
        회원가입
      </Button>

      <style jsx>{`
        .register-form {
          margin-bottom: 1rem;
        }

        .form-row {
          margin-bottom: 1.5rem;
        }

        .form-row.two-columns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .checkbox-group {
          margin-top: 0.5rem;
        }

        .checkbox-group a {
          color: var(--primary);
          text-decoration: none;
        }

        .checkbox-group a:hover {
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

        @media (max-width: 768px) {
          .form-row.two-columns {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </form>
  );
}; 