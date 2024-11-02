import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { 
  validateEmail, 
  validatePassword, 
  validateStudentId, 
  validatePhoneNumber 
} from '../../utils/validation';

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    studentId: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    
    // 이메일 검증
    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.';
    }

    // 비밀번호 검증
    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = '비밀번호는 8자 이상의 영문 대소문자, 숫자, 특수문자를 포함해야 합니다.';
    }

    // 비밀번호 확인 검증
    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    }

    // 이름 검증
    if (!formData.name) {
      newErrors.name = '이름을 입력해주세요.';
    }

    // 학번 검증
    if (!formData.studentId) {
      newErrors.studentId = '학번을 입력해주세요.';
    } else if (!validateStudentId(formData.studentId)) {
      newErrors.studentId = '학번은 7자리 숫자여야 합니다.';
    }

    // 전화번호 검증
    if (!formData.phone) {
      newErrors.phone = '전화번호를 입력해주세요.';
    } else if (!validatePhoneNumber(formData.phone)) {
      newErrors.phone = '올바른 전화번호 형식이 아닙니다. (010-XXXX-XXXX)';
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
      navigate('/login');
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      if (errorMessage?.includes('student_id')) {
        setErrors(prev => ({ ...prev, studentId: '이미 등록된 학번입니다.' }));
      } else if (errorMessage?.includes('phone')) {
        setErrors(prev => ({ ...prev, phone: '이미 등록된 전화번호입니다.' }));
      } else {
        setErrors(prev => ({ ...prev, submit: '회원가입에 실패했습니다.' }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <div className="form-group">
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="이메일"
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
          error={errors.password}
        />
      </div>
      <div className="form-group">
        <Input
          type="password"
          name="passwordConfirm"
          value={formData.passwordConfirm}
          onChange={handleChange}
          placeholder="비밀번호 확인"
          error={errors.passwordConfirm}
        />
      </div>
      <div className="form-group">
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="이름"
          error={errors.name}
        />
      </div>
      <div className="form-group">
        <Input
          type="text"
          name="studentId"
          value={formData.studentId}
          onChange={handleChange}
          placeholder="학번 (7자리)"
          error={errors.studentId}
        />
      </div>
      <div className="form-group">
        <Input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="전화번호 (010-XXXX-XXXX)"
          error={errors.phone}
        />
      </div>
      {errors.submit && (
        <div className="error-message">{errors.submit}</div>
      )}
      <Button
        type="submit"
        disabled={isLoading}
        fullWidth
      >
        {isLoading ? '가입 중...' : '회원가입'}
      </Button>

      <style jsx>{`
        .register-form {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .error-message {
          color: var(--error);
          font-size: 0.875rem;
          margin-bottom: 1rem;
          text-align: center;
        }
      `}</style>
    </form>
  );
}; 