import React from 'react';
import { Button } from '../common/Button';

export const SocialLogin = () => {
  const handleSocialLogin = (provider) => {
    window.location.href = `${process.env.REACT_APP_API_URL}/api/connect/${provider}`;
  };

  return (
    <div className="social-login">
      <div className="divider">
        <span>또는</span>
      </div>

      <div className="social-buttons">
        <Button 
          variant="outlined"
          onClick={() => handleSocialLogin('github')}
          className="github"
          fullWidth
        >
          <i className="material-icons">code</i>
          GitHub로 계속하기
        </Button>

        <Button 
          variant="outlined"
          onClick={() => handleSocialLogin('google')}
          className="google"
          fullWidth
        >
          <i className="material-icons">mail</i>
          Google로 계속하기
        </Button>

        <Button 
          variant="outlined"
          onClick={() => handleSocialLogin('kakao')}
          className="kakao"
          fullWidth
        >
          <img src="/icons/kakao.svg" alt="kakao" />
          카카오로 계속하기
        </Button>

        <Button 
          variant="outlined"
          onClick={() => handleSocialLogin('naver')}
          className="naver"
          fullWidth
        >
          <img src="/icons/naver.svg" alt="naver" />
          네이버로 계속하기
        </Button>

        <Button 
          variant="outlined"
          onClick={() => handleSocialLogin('facebook')}
          className="facebook"
          fullWidth
        >
          <i className="material-icons">facebook</i>
          Facebook으로 계속하기
        </Button>
      </div>

      <style jsx>{`
        .social-login {
          width: 100%;
          max-width: 400px;
          margin: 2rem auto;
        }

        .divider {
          position: relative;
          text-align: center;
          margin: 1.5rem 0;
        }

        .divider::before,
        .divider::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 45%;
          height: 1px;
          background-color: var(--border-color);
        }

        .divider::before {
          left: 0;
        }

        .divider::after {
          right: 0;
        }

        .divider span {
          background-color: white;
          padding: 0 1rem;
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .social-buttons {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .social-buttons :global(.github) {
          color: #24292e;
          border-color: #24292e;
        }

        .social-buttons :global(.google) {
          color: #4285f4;
          border-color: #4285f4;
        }

        .social-buttons :global(.kakao) {
          color: #000000;
          border-color: #FEE500;
          background-color: #FEE500;
        }

        .social-buttons :global(.naver) {
          color: #ffffff;
          border-color: #03C75A;
          background-color: #03C75A;
        }

        .social-buttons :global(.facebook) {
          color: #1877f2;
          border-color: #1877f2;
        }

        .social-buttons i {
          margin-right: 0.5rem;
          font-size: 1.25rem;
        }

        .social-buttons img {
          width: 20px;
          height: 20px;
          margin-right: 0.5rem;
        }
      `}</style>
    </div>
  );
}; 