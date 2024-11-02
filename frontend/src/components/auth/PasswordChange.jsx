import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { validatePassword } from '../../utils/validation';

export const PasswordChange = () => {
  const { changePassword } = useAuth();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!validatePassword(formData.newPassword)) {
      setError('새 비밀번호는 8자 이상의 영문 대소문자, 숫자, 특수문자를 포함해야 합니다.');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await changePassword(formData.currentPassword, formData.newPassword);
      setSuccess(true);
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setError('비밀번호 변경에 ���패했습니다. 현재 비밀번호를 확인해주세요.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="password-change-form">
      <div className="form-group">
        <label>현재 비밀번호</label>
        <input
          type="password"
          value={formData.currentPassword}
          onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
          required
        />
      </div>
      <div className="form-group">
        <label>새 비밀번호</label>
        <input
          type="password"
          value={formData.newPassword}
          onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
          required
        />
      </div>
      <div className="form-group">
        <label>비밀번호 확인</label>
        <input
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">비밀번호 변경</button>
    </form>
  );
}; 