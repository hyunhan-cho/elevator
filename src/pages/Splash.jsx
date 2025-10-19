import React from 'react'

export default function Splash({ onLogin, onSignup }) {
  return (
    <div className="splash-page">
      <div className="splash-actions">
        <button className="splash-btn" onClick={onLogin}>로그인</button>
        <button className="splash-btn" onClick={onSignup}>회원가입</button>
      </div>
      <div className="splash-tagline">한 층 한 층 올려보자</div>
      <img className="splash-logo" src="/images/logo.png" alt="FLOORIDA" />
    </div>
  )
}
