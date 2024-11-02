import React from 'react';
import { RegisterForm } from '../components/auth/RegisterForm';
import { Link } from 'react-router-dom';

export const Register = () => {
  return (
    <div className="register-page">
      <div className="register-container">
        <div className="header-section">
          <Link to="/" className="back-link">
            <i className="material-icons">arrow_back</i>
          </Link>
          <h1>회원가입</h1>
        </div>

        <div className="form-section">
          <RegisterForm />
        </div>

        <div className="info-section">
          <h3>회원가입 시 유의사항</h3>
          <ul>
            <li>이메일 주소는 실제 사용하는 주소를 입력해주세요.</li>
            <li>비밀번호는 8자 이상의 영문 대소문자, 숫자, 특수문자를 포함해야 합니다.</li>
            <li>학번은 7자리 숫자로 입력해주세요.</li>
            <li>연락처는 010-XXXX-XXXX 형식으로 입력해주세요.</li>
          </ul>
        </div>

        <div className="links-section">
          <p>
            이미 계정이 있으신가요? 
            <Link to="/login" className="login-link">
              로그인하기
            </Link>
          </p>
        </div>
      </div>

      <footer className="register-footer">
        <p>© 2024 목원대학교 컴퓨터공학과. All rights reserved.</p>
      </footer>
    </div>
  );
}; 