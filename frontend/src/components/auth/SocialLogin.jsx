import React from 'react';
import { Button } from '../common/Button';
import { useAuth } from '../../hooks/useAuth';

export const SocialLogin = () => {
  const { loginWithProvider } = useAuth();

  const handleSocialLogin = async (provider) => {
    try {
      await loginWithProvider(provider);
    } catch (error) {
      console.error(`${provider} 로그인 실패:`, error);
    }
  };

  return (
    <div className="social-login">
      <Button
        variant="outlined"
        fullWidth
        className="social-button google"
        onClick={() => handleSocialLogin('google')}
      >
        <img src="/images/social/google.svg" alt="Google" />
        Google로 계속하기
      </Button>

      <Button
        variant="outlined"
        fullWidth
        className="social-button kakao"
        onClick={() => handleSocialLogin('kakao')}
      >
        <img src="/images/social/kakao.svg" alt="Kakao" />
        카카오로 계속하기
      </Button>

      <Button
        variant="outlined"
        fullWidth
        className="social-button naver"
        onClick={() => handleSocialLogin('naver')}
      >
        <img src="/images/social/naver.svg" alt="Naver" />
        네이버로 계속하기
      </Button>

      <Button
        variant="outlined"
        fullWidth
        className="social-button github"
        onClick={() => handleSocialLogin('github')}
      >
        <img src="/images/social/github.svg" alt="GitHub" />
        GitHub로 계속하기
      </Button>

      <style jsx>{`
        .social-login {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .social-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          height: 2.75rem;
          border-radius: 4px;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s;
        }

        .social-button img {
          width: 1.25rem;
          height: 1.25rem;
        }

        .social-button.google {
          border-color: #4285f4;
          color: #4285f4;
        }

        .social-button.google:hover {
          background-color: #4285f4;
          color: white;
        }

        .social-button.kakao {
          border-color: #fee500;
          color: #000000;
          background-color: #fee500;
        }

        .social-button.kakao:hover {
          background-color: #fada0a;
        }

        .social-button.naver {
          border-color: #03c75a;
          color: white;
          background-color: #03c75a;
        }

        .social-button.naver:hover {
          background-color: #02b351;
        }

        .social-button.github {
          border-color: #24292e;
          color: #24292e;
        }

        .social-button.github:hover {
          background-color: #24292e;
          color: white;
        }

        @media (hover: none) {
          .social-button:hover {
            background-color: transparent;
            color: inherit;
          }

          .social-button.kakao:hover {
            background-color: #fee500;
            color: #000000;
          }

          .social-button.naver:hover {
            background-color: #03c75a;
            color: white;
          }
        }
      `}</style>
    </div>
  );
}; 