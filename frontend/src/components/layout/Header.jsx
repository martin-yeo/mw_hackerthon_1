import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { Dropdown } from '../common/Dropdown';
import { Modal } from '../common/Modal';

export const Header = () => {
  const { user, logout, isAdmin } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      showToast({
        type: 'success',
        message: '로그아웃되었습니다.'
      });
      navigate('/auth/login');
    } catch (error) {
      showToast({
        type: 'error',
        message: '로그아웃 중 오류가 발생했습니다.'
      });
    }
  };

  const userMenuItems = [
    {
      label: '프로필 설정',
      icon: 'person',
      onClick: () => setShowProfileModal(true)
    },
    {
      label: '내 예약',
      icon: 'event',
      onClick: () => navigate('/reservations')
    },
    {
      label: '알림 설정',
      icon: 'notifications',
      onClick: () => navigate('/settings/notifications')
    },
    {
      type: 'divider'
    },
    {
      label: '로그아웃',
      icon: 'logout',
      onClick: handleLogout
    }
  ];

  if (isAdmin) {
    userMenuItems.splice(3, 0, {
      label: '관리자 페이지',
      icon: 'admin_panel_settings',
      onClick: () => navigate('/admin')
    });
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <Link to="/" className="logo">
            <img src="/images/logo.svg" alt="Logo" />
            <span className="logo-text">공간예약시스템</span>
          </Link>

          <nav className="main-nav">
            <Link to="/spaces" className="nav-link">
              <i className="material-icons">room</i>
              공간 둘러보기
            </Link>
            <Link to="/reservations/new" className="nav-link">
              <i className="material-icons">add_circle</i>
              예약하기
            </Link>
            <Link to="/guide" className="nav-link">
              <i className="material-icons">help</i>
              이용안내
            </Link>
          </nav>
        </div>

        <div className="header-right">
          {user ? (
            <>
              <button className="notification-button">
                <i className="material-icons">notifications</i>
                <span className="notification-badge">2</span>
              </button>

              <Dropdown
                trigger={
                  <button className="profile-button">
                    <img 
                      src={user.profileImage || '/images/default-avatar.png'} 
                      alt={user.name}
                      className="profile-image"
                    />
                    <span className="profile-name">{user.name}</span>
                    <i className="material-icons">arrow_drop_down</i>
                  </button>
                }
                items={userMenuItems}
                position="bottom-right"
              />
            </>
          ) : (
            <div className="auth-buttons">
              <Link to="/auth/login" className="button text">
                로그인
              </Link>
              <Link to="/auth/register" className="button primary">
                회원가입
              </Link>
            </div>
          )}

          <button 
            className="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <i className="material-icons">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </i>
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          <Link to="/spaces" className="mobile-nav-link">
            <i className="material-icons">room</i>
            공간 둘러보기
          </Link>
          <Link to="/reservations/new" className="mobile-nav-link">
            <i className="material-icons">add_circle</i>
            예약하기
          </Link>
          <Link to="/guide" className="mobile-nav-link">
            <i className="material-icons">help</i>
            이용안내
          </Link>
        </nav>
      </div>

      {/* 프로필 수정 모달 */}
      <Modal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        title="프로필 설정"
      >
        {/* 프로필 수정 폼 컴포넌트 */}
      </Modal>
    </header>
  );
}; 