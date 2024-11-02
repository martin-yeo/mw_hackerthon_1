import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';
import { ScrollToTop } from '../common/ScrollToTop';
import { useAuth } from '../../hooks/useAuth';

export const Layout = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // 사이드바를 표시하지 않을 경로들
  const noSidebarPaths = [
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password',
    '/auth/reset-password',
    '/404',
    '/500'
  ];

  // 푸터를 표시하지 않을 경로들
  const noFooterPaths = [
    '/admin',
    '/admin/users',
    '/admin/reservations',
    '/admin/spaces'
  ];

  // 현재 경로에 따라 사이드바와 푸터 표시 여부 결정
  const shouldShowSidebar = !noSidebarPaths.includes(location.pathname) && user;
  const shouldShowFooter = !noFooterPaths.includes(location.pathname);

  // 반응형 처리
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 모바일에서 페이지 이동시 사이드바 닫기
  useEffect(() => {
    if (isMobile) {
      setShowSidebar(false);
    }
  }, [location.pathname, isMobile]);

  return (
    <div className="layout">
      <Header onMenuClick={() => setShowSidebar(!showSidebar)} />
      
      <div className="layout-container">
        {shouldShowSidebar && (
          <Sidebar 
            isOpen={showSidebar} 
            onClose={() => setShowSidebar(false)} 
          />
        )}
        
        <main className={`main-content ${shouldShowSidebar ? 'with-sidebar' : ''}`}>
          {children}
        </main>
      </div>

      {shouldShowFooter && <Footer />}
      
      <ScrollToTop />

      <style jsx>{`
        .layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: ${({ theme }) => theme.colors.background.default};
        }

        .layout-container {
          flex: 1;
          display: flex;
          position: relative;
          margin-top: ${({ theme }) => theme.spacing(8)}; // Header 높이
        }

        .main-content {
          flex: 1;
          min-height: calc(100vh - ${({ theme }) => theme.spacing(8)});
          padding: ${({ theme }) => theme.spacing(3)};
          transition: margin-left 0.3s ease;
          width: 100%;

          &.with-sidebar {
            margin-left: ${showSidebar ? '240px' : '64px'};
          }
        }

        // 반응형 스타일
        @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
          .main-content {
            margin-left: 0 !important;
            padding: ${({ theme }) => theme.spacing(2)};
          }

          .layout-container {
            margin-top: ${({ theme }) => theme.spacing(7)}; // 모바일 Header 높이
          }
        }

        // 다크모드 지원
        @media (prefers-color-scheme: dark) {
          .layout {
            background-color: ${({ theme }) => theme.colors.background.dark};
          }
        }

        // 프린트 스타일
        @media print {
          .layout {
            background: white;
          }

          .main-content {
            margin: 0 !important;
            padding: 0;
          }

          header, footer, .sidebar {
            display: none !important;
          }
        }
      `}</style>

      {/* 모바일 사이드바 오버레이 */}
      {isMobile && showSidebar && (
        <div 
          className="sidebar-overlay"
          onClick={() => setShowSidebar(false)}
        >
          <style jsx>{`
            .sidebar-overlay {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-color: rgba(0, 0, 0, 0.5);
              z-index: 99;
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

// 레이아웃 설정을 위한 HOC
export const withLayout = (Component, options = {}) => {
  return function WrappedComponent(props) {
    return (
      <Layout {...options}>
        <Component {...props} />
      </Layout>
    );
  };
}; 