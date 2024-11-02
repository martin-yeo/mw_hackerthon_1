import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { PasswordChange } from '../components/auth/PasswordChange';
import { WithdrawalForm } from '../components/auth/WithdrawalForm';

export const MyPage = () => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(profileData);
      setIsEditing(false);
    } catch (error) {
      console.error('프로필 업데이트 실패:', error);
    }
  };

  return (
    <div className="mypage">
      <div className="mypage-container">
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <i className="material-icons">person</i>
            프로필
          </button>
          <button 
            className={`tab-button ${activeTab === 'password' ? 'active' : ''}`}
            onClick={() => setActiveTab('password')}
          >
            <i className="material-icons">lock</i>
            비밀번호 변경
          </button>
          <button 
            className={`tab-button ${activeTab === 'withdrawal' ? 'active' : ''}`}
            onClick={() => setActiveTab('withdrawal')}
          >
            <i className="material-icons">exit_to_app</i>
            회원 탈퇴
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'profile' && (
            <div className="profile-section">
              <h2>프로필 정보</h2>
              <form onSubmit={handleProfileUpdate}>
                <div className="form-group">
                  <label>이름</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>학번</label>
                  <input
                    type="text"
                    value={user?.studentId || ''}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label>이메일</label>
                  <input
                    type="email"
                    value={profileData.email}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label>연락처</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                {isEditing ? (
                  <div className="button-group">
                    <button type="submit" className="save-button">저장</button>
                    <button 
                      type="button" 
                      className="cancel-button"
                      onClick={() => setIsEditing(false)}
                    >
                      취소
                    </button>
                  </div>
                ) : (
                  <button 
                    type="button" 
                    className="edit-button"
                    onClick={() => setIsEditing(true)}
                  >
                    수정
                  </button>
                )}
              </form>
            </div>
          )}

          {activeTab === 'password' && (
            <div className="password-section">
              <h2>비밀번호 변경</h2>
              <PasswordChange />
            </div>
          )}

          {activeTab === 'withdrawal' && (
            <div className="withdrawal-section">
              <h2>회원 탈퇴</h2>
              <WithdrawalForm />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 