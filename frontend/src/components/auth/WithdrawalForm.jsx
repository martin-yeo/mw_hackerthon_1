import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const WithdrawalForm = () => {
  const navigate = useNavigate();
  const { withdraw } = useAuth();
  const [formData, setFormData] = useState({
    password: '',
    reason: '',
    confirm: false
  });
  const [error, setError] = useState('');

  const reasons = [
    '서비스 이용 빈도가 낮음',
    '다른 서비스 이용',
    '불편한 사용성',
    '개인정보 보호',
    '기타'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.confirm) {
      setError('회원 탈퇴 확인에 동의해주세요.');
      return;
    }

    try {
      await withdraw(formData.password, formData.reason);
      navigate('/login');
    } catch (err) {
      setError('회원 탈퇴에 실패했습니다. 비밀번호를 확인해주세요.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="withdrawal-form">
      <div className="warning-message">
        <h3>회원 탈퇴 시 주의사항</h3>
        <ul>
          <li>모든 예약 정보가 삭제됩니다.</li>
          <li>삭제된 정보는 복구할 수 없습니다.</li>
          <li>탈퇴 후 재가입은 즉시 가능합니다.</li>
        </ul>
      </div>

      <div className="form-group">
        <label>비밀번호 확인</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <label>탈퇴 사유</label>
        <select
          value={formData.reason}
          onChange={(e) => setFormData({...formData, reason: e.target.value})}
          required
        >
          <option value="">선택해주세요</option>
          {reasons.map(reason => (
            <option key={reason} value={reason}>{reason}</option>
          ))}
        </select>
        {formData.reason === '기타' && (
          <textarea
            placeholder="탈퇴 사유를 입력해주세요"
            value={formData.customReason}
            onChange={(e) => setFormData({...formData, customReason: e.target.value})}
            required
          />
        )}
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={formData.confirm}
            onChange={(e) => setFormData({...formData, confirm: e.target.checked})}
          />
          위 주의사항을 모두 확인하였으며, 회원 탈퇴에 동의합니다.
        </label>
      </div>

      {error && <div className="error-message">{error}</div>}
      <button type="submit" className="submit-button danger">회원 탈퇴</button>
    </form>
  );
}; 