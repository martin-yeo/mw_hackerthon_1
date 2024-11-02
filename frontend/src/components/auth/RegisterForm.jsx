import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { validateEmail, validatePassword, validateStudentId, validatePhone } from '../../utils/validation';

export const RegisterForm = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    studentId: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!validateEmail(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.';
    }
    if (!validatePassword(formData.password)) {
      newErrors.password = '비밀번호는 8자 이상의 영문 대소문자, 숫자, 특수문자를 포함해야 합니다.';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }
    if (!validateStudentId(formData.studentId)) {
      newErrors.studentId = '학번은 7자리 숫자여야 합니다.';
    }
    if (!validatePhone(formData.phone)) {
      newErrors.phone = '올바른 전화번호 형식이 아닙니다.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await register(formData);
        // 성공 처리
      } catch (err) {
        setErrors({ submit: err.message });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      {/* 폼 필드들 */}
    </form>
  );
}; 