import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';

export const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const features = [
    {
      icon: 'event_seat',
      title: '좌석 예약',
      description: '원하는 시간에 원하는 좌석을 미리 예약하세요.',
      action: () => navigate('/reservations/new')
    },
    {
      icon: 'calendar_today',
      title: '예약 현황',
      description: '실시간 좌석 예약 현황을 확인하세요.',
      action: () => navigate('/reservations/calendar')
    },
    {
      icon: 'group',
      title: '팀 프로젝트',
      description: '팀 프로젝트를 위한 공간을 예약하세요.',
      action: () => navigate('/reservations/new?type=team')
    },
    {
      icon: 'computer',
      title: '아이맥 좌석',
      description: 'iMac이 설치된 좌석을 이용하세요.',
      action: () => navigate('/reservations/new?type=imac')
    }
  ];

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>FabLab 좌석 예약 시스템</h1>
          <p>
            원하는 시간에 원하는 공간을 예약하고,<br />
            효율적인 학습 환경을 경험하세요.
          </p>
          {!user ? (
            <div className="hero-actions">
              <Button onClick={() => navigate('/login')}>
                로그인
              </Button>
              <Button 
                variant="outlined"
                onClick={() => navigate('/register')}
              >
                회원가입
              </Button>
            </div>
          ) : (
            <Button onClick={() => navigate('/reservations/new')}>
              지금 예약하기
            </Button>
          )}
        </div>
      </section>

      <section className="features">
        <h2>주요 기능</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="feature-card"
              onClick={feature.action}
            >
              <div className="feature-icon">
                <i className="material-icons">{feature.icon}</i>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="info">
        <Card className="info-card">
          <h2>이용 안내</h2>
          <div className="info-content">
            <div className="info-item">
              <h3>운영 시간</h3>
              <p>평일: 09:00 - 22:00</p>
              <p>주말: 10:00 - 18:00</p>
            </div>
            <div className="info-item">
              <h3>예약 규칙</h3>
              <ul>
                <li>최대 3시간까지 예약 가능</li>
                <li>하루 최대 2회 예약 가능</li>
                <li>예약 시간 10분 전까지 취소 가능</li>
                <li>노쇼 3회 시 이용 제한</li>
              </ul>
            </div>
            <div className="info-item">
              <h3>문의</h3>
              <p>전화: 02-XXX-XXXX</p>
              <p>이메일: fablab@university.ac.kr</p>
            </div>
          </div>
        </Card>
      </section>

      <style jsx>{`
        .home {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .hero {
          text-align: center;
          padding: 4rem 0;
          background: linear-gradient(
            135deg,
            var(--burgundy-red) 0%,
            var(--burgundy-dark) 100%
          );
          border-radius: 16px;
          color: white;
          margin-bottom: 4rem;
        }

        .hero h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .hero p {
          font-size: 1.25rem;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .features {
          margin-bottom: 4rem;
        }

        .features h2 {
          text-align: center;
          margin-bottom: 2rem;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          padding: 2rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }

        .feature-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 64px;
          background-color: var(--burgundy-light);
          border-radius: 16px;
          margin-bottom: 1rem;
        }

        .feature-icon i {
          font-size: 32px;
          color: var(--burgundy-red);
        }

        .feature-card h3 {
          margin: 0 0 0.5rem 0;
          color: var(--text-primary);
        }

        .feature-card p {
          margin: 0;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .info-card {
          padding: 2rem;
        }

        .info-card h2 {
          text-align: center;
          margin-bottom: 2rem;
        }

        .info-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .info-item h3 {
          color: var(--burgundy-red);
          margin-bottom: 1rem;
        }

        .info-item p {
          margin: 0 0 0.5rem 0;
          color: var(--text-secondary);
        }

        .info-item ul {
          margin: 0;
          padding-left: 1.25rem;
          color: var(--text-secondary);
        }

        .info-item li {
          margin-bottom: 0.5rem;
        }

        @media (max-width: 768px) {
          .home {
            padding: 1rem;
          }

          .hero {
            padding: 2rem 1rem;
          }

          .hero h1 {
            font-size: 2rem;
          }

          .hero p {
            font-size: 1rem;
          }

          .hero-actions {
            flex-direction: column;
          }

          .info-card {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}; 