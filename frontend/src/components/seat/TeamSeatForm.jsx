import React, { useState } from 'react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { validateTeamMembers } from '../../utils/validation';

export const TeamSeatForm = ({ 
  onSubmit, 
  maxMembers = 6,
  minMembers = 2,
  isLoading = false 
}) => {
  const [members, setMembers] = useState([
    { name: '', studentId: '', phone: '' }
  ]);
  const [errors, setErrors] = useState({});

  const handleAddMember = () => {
    if (members.length < maxMembers) {
      setMembers([...members, { name: '', studentId: '', phone: '' }]);
    }
  };

  const handleRemoveMember = (index) => {
    if (members.length > minMembers) {
      const newMembers = members.filter((_, i) => i !== index);
      setMembers(newMembers);
    }
  };

  const handleMemberChange = (index, field, value) => {
    const newMembers = [...members];
    newMembers[index] = {
      ...newMembers[index],
      [field]: value
    };
    setMembers(newMembers);

    // 에러 메시지 초기화
    if (errors[`member${index}_${field}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`member${index}_${field}`];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const validationResult = validateTeamMembers(members);

    if (!validationResult.isValid) {
      validationResult.errors.forEach(error => {
        newErrors[`member${error.index}_${error.field}`] = error.message;
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(members);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="team-seat-form">
      <div className="form-header">
        <h3>팀원 정보</h3>
        <span className="member-count">
          {members.length}/{maxMembers}명
        </span>
      </div>

      {members.map((member, index) => (
        <Card key={index} className="member-card">
          <div className="member-header">
            <h4>팀원 {index + 1}</h4>
            {members.length > minMembers && (
              <button
                type="button"
                className="remove-button"
                onClick={() => handleRemoveMember(index)}
              >
                <i className="material-icons">close</i>
              </button>
            )}
          </div>

          <div className="member-fields">
            <Input
              label="이름"
              value={member.name}
              onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
              error={errors[`member${index}_name`]}
            />
            <Input
              label="학번"
              value={member.studentId}
              onChange={(e) => handleMemberChange(index, 'studentId', e.target.value)}
              error={errors[`member${index}_studentId`]}
            />
            <Input
              label="연락처"
              value={member.phone}
              onChange={(e) => handleMemberChange(index, 'phone', e.target.value)}
              error={errors[`member${index}_phone`]}
            />
          </div>
        </Card>
      ))}

      {members.length < maxMembers && (
        <Button
          type="button"
          variant="secondary"
          onClick={handleAddMember}
          className="add-member-button"
        >
          <i className="material-icons">add</i>
          팀원 추가
        </Button>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        fullWidth
      >
        {isLoading ? '처리 중...' : '예약하기'}
      </Button>

      <style jsx>{`
        .team-seat-form {
          max-width: 600px;
          margin: 0 auto;
        }

        .form-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .form-header h3 {
          margin: 0;
        }

        .member-count {
          padding: 0.25rem 0.5rem;
          background-color: var(--background);
          border-radius: 4px;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .member-card {
          margin-bottom: 1rem;
        }

        .member-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .member-header h4 {
          margin: 0;
          color: var(--burgundy-red);
        }

        .remove-button {
          background: none;
          border: none;
          color: var(--error);
          cursor: pointer;
          padding: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .remove-button:hover {
          background-color: var(--error-light);
          border-radius: 50%;
        }

        .member-fields {
          display: grid;
          gap: 1rem;
        }

        .add-member-button {
          margin: 1rem 0;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        @media (max-width: 768px) {
          .member-fields {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </form>
  );
}; 