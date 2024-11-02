import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Sidebar = () => {
  const { isAdmin } = useAuth();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // 메뉴 아이템 정의
  const menuItems = [
    {
      title: '대시보드',
      icon: 'dashboard',
      path: '/admin',
      adminOnly: true
    },
    {
      title: '예약 관리',
      icon: 'event',
      path: '/admin/reservations',
      adminOnly: true
    },
    {
      title: '사용자 관리',
      icon: 'people',
      path: '/admin/users',
      adminOnly: true
    },
    {
      title: '공간 관리',
      icon: 'room',
      path: '/admin/spaces',
      adminOnly: true
    },
    {
      title: '내 예약',
      icon: 'bookmark',
      path: '/reservations'
    },
    {
      title: '공간 둘러보기',
      icon: 'search',
      path: '/spaces'
    },
    {
      title: '알림',
      icon: 'notifications',
      path: '/notifications',
      badge: 3
    },
    {
      title: '설정',
      icon: 'settings',
      path: '/settings'
    }
  ];

  // 관리자가 아닌 경우 관리자 전용 메뉴 필터링
  const filteredMenuItems = menuItems.filter(item => 
    !item.adminOnly || (item.adminOnly && isAdmin)
  );

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <button 
          className="collapse-button"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <i className="material-icons">
            {isCollapsed ? 'menu' : 'menu_open'}
          </i>
        </button>
      </div>

      <nav className="sidebar-nav">
        {filteredMenuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `nav-item ${isActive ? 'active' : ''}`
            }
          >
            <i className="material-icons">{item.icon}</i>
            {!isCollapsed && (
              <span className="nav-text">{item.title}</span>
            )}
            {item.badge && !isCollapsed && (
              <span className="nav-badge">{item.badge}</span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="theme-toggle">
          <i className="material-icons">dark_mode</i>
          {!isCollapsed && <span>다크 모드</span>}
        </div>
      </div>

      <style jsx>{`
        .sidebar {
          position: fixed;
          left: 0;
          top: ${({ theme }) => theme.spacing(8)}; // Header 높이만큼 여백
          height: calc(100vh - ${({ theme }) => theme.spacing(8)});
          width: 240px;
          background: ${({ theme }) => theme.colors.background.paper};
          border-right: 1px solid ${({ theme }) => theme.colors.divider};
          transition: width 0.3s ease;
          display: flex;
          flex-direction: column;
          z-index: 100;

          &.collapsed {
            width: 64px;

            .nav-item {
              padding: ${({ theme }) => theme.spacing(2)};
              justify-content: center;
            }
          }
        }

        .sidebar-header {
          padding: ${({ theme }) => theme.spacing(2)};
          border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
        }

        .collapse-button {
          width: 40px;
          height: 40px;
          border: none;
          border-radius: 50%;
          background: transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${({ theme }) => theme.colors.text.primary};

          &:hover {
            background: ${({ theme }) => theme.colors.action.hover};
          }
        }

        .sidebar-nav {
          flex: 1;
          overflow-y: auto;
          padding: ${({ theme }) => theme.spacing(2)} 0;
        }

        .nav-item {
          display: flex;
          align-items: center;
          padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(3)};
          color: ${({ theme }) => theme.colors.text.primary};
          text-decoration: none;
          transition: background-color 0.2s;
          position: relative;

          &:hover {
            background: ${({ theme }) => theme.colors.action.hover};
          }

          &.active {
            background: ${({ theme }) => theme.colors.primary.light};
            color: ${({ theme }) => theme.colors.primary.main};
          }

          i {
            margin-right: ${({ theme }) => theme.spacing(2)};
          }
        }

        .nav-text {
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .nav-badge {
          background: ${({ theme }) => theme.colors.error.main};
          color: white;
          padding: 2px 6px;
          border-radius: 10px;
          font-size: 0.75rem;
          min-width: 20px;
          text-align: center;
        }
      `}</style>
    </aside>
  );
}; 