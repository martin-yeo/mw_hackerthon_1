import React from 'react';
import { useAuth } from '../../hooks/useAuth';

export const SocialLogin = () => {
  const { socialLogin } = useAuth();

  const handleSocialLogin = (provider) => {
    socialLogin(provider);
  };

  return (
    <div className="social-login">
      <button 
        onClick={() => handleSocialLogin('github')}
        className="social-button github"
      >
        <i className="material-icons">github</i>
        GitHub로 로그인
      </button>
      
      <button 
        onClick={() => handleSocialLogin('google')}
        className="social-button google"
      >
        <i className="material-icons">google</i>
        Google로 로그인
      </button>

      <button 
        onClick={() => handleSocialLogin('kakao')}
        className="social-button kakao"
      >
        Kakao로 로그인
      </button>

      <button 
        onClick={() => handleSocialLogin('naver')}
        className="social-button naver"
      >
        Naver로 로그인
      </button>

      <button 
        onClick={() => handleSocialLogin('facebook')}
        className="social-button facebook"
      >
        <i className="material-icons">facebook</i>
        Facebook으로 로그인
      </button>
    </div>
  );
}; 