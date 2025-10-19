import React from 'react'
import BackButton from '../components/BackButton.jsx'

export default function Login({ onBack, onSignup, onSuccess }) {
  return (
    <div className="login-page">
      <BackButton onClick={onBack} />
      <div className="login-header">
        <img className="login-logo" src="/images/logo.png" alt="FLOORIDA" />
        <div className="login-tagline">매일 성장하는 당신의 학습 동반자</div>
      </div>
      <div className="login-surface">
        <div className="login-card">
          <h2 className="login-title">로그인</h2>
          <p className="login-subtitle">플로리다에 오신 것을 환영합니다!</p>
          <label className="login-label">아이디</label>
          <input className="login-input" type="email" placeholder="name1234@naver.com" />
          <label className="login-label">비밀번호</label>
          <input className="login-input" type="password" placeholder="비밀번호를 입력하세요" />
          <button className="login-button" onClick={onSuccess}>플로리다 시작!</button>
          <div className="login-footer">
            <span>계정이 없으신가요?</span>
            <a href="#" onClick={(e) => { e.preventDefault(); onSignup() }}>회원가입</a>
          </div>
        </div>
      </div>
    </div>
  )
}
