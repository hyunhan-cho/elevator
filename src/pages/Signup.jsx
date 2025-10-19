import React from 'react'
import BackButton from '../components/BackButton.jsx'

export default function Signup({ onBack, onLogin, onSuccess }) {
  return (
    <div className="login-page">
      <BackButton onClick={onBack} />
      <div className="login-header">
        <img className="login-logo" src="/images/logo.png" alt="FLOORIDA" />
        <div className="login-tagline">매일 성장하는 당신의 학습 동반자</div>
      </div>
      <div className="login-surface">
        <div className="login-card">
          <h2 className="login-title">회원가입</h2>
          <p className="login-subtitle">새로운 여정을 시작하세요!</p>
          <label className="login-label">이름</label>
          <input className="login-input" type="text" placeholder="홍길동" />
          <label className="login-label">이메일</label>
          <input className="login-input" type="email" placeholder="name1234@naver.com" />
          <label className="login-label">비밀번호</label>
          <input className="login-input" type="password" placeholder="영문, 숫자 조합 7~20자" />
          <label className="agree-row">
            <input type="checkbox" />
            <span>이용약관 및 개인정보 처리에 동의합니다.</span>
          </label>
          <button className="login-button" onClick={onSuccess}>가입하기</button>
          <div className="login-footer">
            <span>이미 가입하셨나요?</span>
            <a href="#" onClick={(e) => { e.preventDefault(); onLogin() }}>로그인</a>
          </div>
        </div>
      </div>
    </div>
  )
}
