import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { ProfileForm } from '../components/auth/ProfileForm';
import { PasswordChangeForm } from '../components/auth/PasswordChangeForm';
import { WithdrawalForm } from '../components/auth/WithdrawalForm';
import { EmailNotification } from '../components/notification/EmailNotification';
import { useAuth } from '../hooks/useAuth';

export const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: '프로필', icon: 'person' },
    { id: 'password', label: '비밀번호', icon: 'lock' },
    { id: 'notification', label: '알림 설정', icon: 'notifications' },
    { id: 'withdrawal', label: '회원 탈퇴', icon: 'exit_to_app' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileForm />;
      case 'password':
        return <PasswordChangeForm />;
      case 'notification':
        return <EmailNotification />;
      case 'withdrawal':
        return <WithdrawalForm />;
      default:
        return null;
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <Card className="profile-sidebar">
          <div className="user-info">
            <div className="avatar">
              {user?.name?.[0] || 'U'}
            </div>
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
          </div>

          <nav className="profile-nav">
            {tabs.map(tab => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'primary' : 'text'}
                onClick={() => setActiveTab(tab.id)}
                className={`nav-button ${activeTab === tab.id ? 'active' : ''}`}
              >
                <i className="material-icons">{tab.icon}</i>
                {tab.label}
              </Button>
            ))}
          </nav>
        </Card>

        <div className="profile-content">
          {renderContent()}
        </div>
      </div>

      <style jsx>{`
        .profile-page {
          padding: 2rem;
          min-height: calc(100vh - var(--header-height));
          background-color: var(--background);
        }

        .profile-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 2rem;
        }

        .profile-sidebar {
          height: fit-content;
        }

        .user-info {
          text-align: center;
          padding: 2rem;
          border-bottom: 1px solid var(--border-color);
        }

        .avatar {
          width: 80px;
          height: 80px;
          background-color: var(--burgundy-red);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: 500;
          margin: 0 auto 1rem;
        }

        .user-info h2 {
          margin: 0 0 0.5rem 0;
          color: var(--text-primary);
        }

        .user-info p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .profile-nav {
          padding: 1rem;
        }

        .nav-button {
          width: 100%;
          justify-content: flex-start;
          padding: 0.75rem 1rem;
          margin-bottom: 0.5rem;
          border-radius: 8px;
          font-weight: 500;
        }

        .nav-button i {
          margin-right: 0.75rem;
        }

        .nav-button.active {
          background-color: var(--burgundy-red);
          color: white;
        }

        .profile-content {
          min-height: 500px;
        }

        @media (max-width: 1024px) {
          .profile-container {
            grid-template-columns: 250px 1fr;
          }
        }

        @media (max-width: 768px) {
          .profile-page {
            padding: 1rem;
          }

          .profile-container {
            grid-template-columns: 1fr;
          }

          .profile-sidebar {
            position: sticky;
            top: var(--header-height);
            z-index: 1;
          }

          .user-info {
            padding: 1rem;
          }

          .avatar {
            width: 60px;
            height: 60px;
            font-size: 1.5rem;
          }

          .profile-nav {
            display: flex;
            overflow-x: auto;
            padding: 0.5rem;
          }

          .nav-button {
            flex: 0 0 auto;
            width: auto;
            margin-bottom: 0;
            margin-right: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}; 