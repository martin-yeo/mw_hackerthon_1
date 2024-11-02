import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">공간예약시스템</h3>
            <p className="footer-description">
              효율적이고 편리한 공간 예약 서비스를 제공합니다.
            </p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="material-icons">facebook</i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="material-icons">instagram</i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <i className="material-icons">youtube</i>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">바로가기</h4>
            <ul className="footer-links">
              <li>
                <Link to="/spaces">공간 둘러보기</Link>
              </li>
              <li>
                <Link to="/reservations/new">예약하기</Link>
              </li>
              <li>
                <Link to="/guide">이용안내</Link>
              </li>
              <li>
                <Link to="/notice">공지사항</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">고객지원</h4>
            <ul className="footer-links">
              <li>
                <Link to="/faq">자주 묻는 질문</Link>
              </li>
              <li>
                <Link to="/contact">문의하기</Link>
              </li>
              <li>
                <Link to="/terms">이용약관</Link>
              </li>
              <li>
                <Link to="/privacy">개인정보처리방침</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section contact-info">
            <h4 className="footer-subtitle">연락처</h4>
            <ul className="contact-list">
              <li>
                <i className="material-icons">location_on</i>
                <span>서울특별시 강남구 테헤란로 123</span>
              </li>
              <li>
                <i className="material-icons">phone</i>
                <span>02-1234-5678</span>
              </li>
              <li>
                <i className="material-icons">email</i>
                <span>support@spacereservation.com</span>
              </li>
              <li>
                <i className="material-icons">access_time</i>
                <span>평일 09:00 - 18:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-info">
            <p>사업자등록번호: 123-45-67890</p>
            <p>대표: 홍길동</p>
            <p>통신판매업 신고번호: 제2024-서울강남-1234호</p>
          </div>
          
          <div className="footer-copyright">
            <p>
              © {currentYear} 공간예약시스템. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background-color: ${({ theme }) => theme.colors.gray[900]};
          color: ${({ theme }) => theme.colors.gray[300]};
          padding: ${({ theme }) => theme.spacing(8)} 0;
          margin-top: auto;
        }

        .footer-container {
          max-width: ${({ theme }) => theme.breakpoints.xl};
          margin: 0 auto;
          padding: 0 ${({ theme }) => theme.spacing(4)};
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: ${({ theme }) => theme.spacing(8)};
          margin-bottom: ${({ theme }) => theme.spacing(6)};
        }

        .footer-title {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: ${({ theme }) => theme.spacing(2)};
        }

        .footer-description {
          margin-bottom: ${({ theme }) => theme.spacing(3)};
          line-height: 1.6;
        }

        .social-links {
          display: flex;
          gap: ${({ theme }) => theme.spacing(2)};
        }

        .footer-subtitle {
          font-size: 1.1rem;
          font-weight: bold;
          margin-bottom: ${({ theme }) => theme.spacing(3)};
        }

        .footer-links {
          list-style: none;
          padding: 0;
          
          li {
            margin-bottom: ${({ theme }) => theme.spacing(2)};
            
            a {
              color: ${({ theme }) => theme.colors.gray[300]};
              text-decoration: none;
              transition: color 0.2s;
              
              &:hover {
                color: ${({ theme }) => theme.colors.primary.main};
              }
            }
          }
        }

        .contact-list {
          list-style: none;
          padding: 0;
          
          li {
            display: flex;
            align-items: center;
            gap: ${({ theme }) => theme.spacing(2)};
            margin-bottom: ${({ theme }) => theme.spacing(2)};
            
            i {
              color: ${({ theme }) => theme.colors.primary.main};
            }
          }
        }

        .footer-bottom {
          border-top: 1px solid ${({ theme }) => theme.colors.gray[700]};
          padding-top: ${({ theme }) => theme.spacing(4)};
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: ${({ theme }) => theme.spacing(2)};
        }

        .footer-info {
          display: flex;
          flex-wrap: wrap;
          gap: ${({ theme }) => theme.spacing(4)};
          color: ${({ theme }) => theme.colors.gray[500]};
        }

        @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
          .footer-content {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: ${({ theme }) => theme.spacing(6)};
          }

          .footer-bottom {
            flex-direction: column;
            text-align: center;
            
            .footer-info {
              justify-content: center;
            }
          }
        }
      `}</style>
    </footer>
  );
}; 