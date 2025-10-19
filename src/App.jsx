import React, { useEffect, useState } from 'react'
import './App.css'
import ElevatorDoor from './components/ElevatorDoor.jsx'
import TopInfo from './components/TopInfo.jsx'
import AchievementPanel from './components/AchievementPanel.jsx'
import QuestList from './components/QuestList.jsx'
import { floors } from './constants/floors.js'
import Badges from './components/Badges.jsx'

// 공개 폴더(public)에 둔 이미지 경로를 사용합니다.
const elevatorInsideImg = '/images/frame.png' // 엘리베이터 내부(창문 투명)

export default function App() {
  const [isOpen, setIsOpen] = useState(true)
  const [isMoving, setIsMoving] = useState(false)
  const [currentFloor, setCurrentFloor] = useState(1)
  const [direction, setDirection] = useState('up')
  const [progressInfo, setProgressInfo] = useState({ percent: 0, done: 0, total: 0 })
  const [view, setView] = useState('splash')

  const goToFloor = (targetFloor) => {
    if (isMoving || !isOpen || currentFloor === targetFloor) return

    setDirection(targetFloor > currentFloor ? 'up' : 'down')
    setIsOpen(false) // 1) 문 닫기

    // 2) 문이 닫힌 뒤 이동 시작
    setTimeout(() => setIsMoving(true), 1500)

    // 3) 이동 완료 후 도착 및 문 열기
    setTimeout(() => {
      setIsMoving(false)
      setCurrentFloor(targetFloor)
      setTimeout(() => setIsOpen(true), 500)
    }, 3500) // 1500ms(닫힘) + 2000ms(이동)
  }

  const floor = floors[currentFloor]

  // 진행도(퀘스트 완료 수)에 따라 목표 층 계산: 1층 + 완료 개수
  useEffect(() => {
    const maxFloor = Object.keys(floors).length
    const desired = Math.max(1, Math.min(1 + (progressInfo?.done ?? 0), maxFloor))
    if (desired !== currentFloor) {
      // 이동 중이면 goToFloor 내부에서 early return됨; isMoving 변경 시 이 effect가 재실행되어 재시도함
      goToFloor(desired)
    }
  }, [progressInfo, currentFloor, isMoving, isOpen])
  if (view === 'splash') {
    return (
      <div className="splash-page">
        <div className="splash-actions">
          <button className="splash-btn" onClick={() => setView('login')}>로그인</button>
          <button className="splash-btn" onClick={() => setView('signup')}>회원가입</button>
        </div>
        <div className="splash-tagline">한 층 한 층 올려보자</div>
        <img className="splash-logo" src="/images/logo.png" alt="FLOORIDA" />
      </div>
    )
  }
  if (view === 'login') {
    return (
      <div className="login-page">
        <button className="back-btn" aria-label="뒤로" onClick={() => setView('splash')}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 12H9" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
        </button>
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
            <button className="login-button" onClick={() => setView('home')}>플로리다 시작!</button>
            <div className="login-footer">
              <span>계정이 없으신가요?</span>
              <a href="#" onClick={(e) => { e.preventDefault(); setView('signup') }}>회원가입</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
  if (view === 'signup') {
    return (
      <div className="login-page">
        <button className="back-btn" aria-label="뒤로" onClick={() => setView('splash')}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 12H9" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
        </button>
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
            <button className="login-button" onClick={() => setView('login')}>가입하기</button>
            <div className="login-footer">
              <span>이미 가입하셨나요?</span>
              <a href="#" onClick={(e) => { e.preventDefault(); setView('login') }}>로그인</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="app">
      <button className="back-btn" aria-label="뒤로" onClick={() => setView('splash')}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20 12H9" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round"/>
        </svg>
      </button>
      <div className="elevator-wrapper">
        {/* 엘리베이터 본체 */}
        <div className={`elevator ${isMoving ? 'elevator-moving' : ''}`}>
          {/* 상단 정보 (날짜/층수) */}
          <TopInfo currentFloor={currentFloor} direction={direction} />

          {/* 창밖 풍경 (가장 아래 레이어) */}
          <div className="floor-scene" style={floor.sceneStyle}>
            <div className="scene-label">{floor.label}</div>
            {/* 구름 레이어 */}
            <div className="cloud c1" />
            <div className="cloud c2" />
            <div className="cloud c3" />
          </div>

          {/* 엘리베이터 내부 오버레이 */}
          <div
            className="elevator-inside"
            style={{
              backgroundImage: `url(${elevatorInsideImg})`,
            }}
          />

          {/* 캐릭터: 이미지로 교체 (public/images/mascot.png 를 사용) */}
          <img
            className="character-img"
            src="/images/mascot.png"
            alt="오늘의 나"
            title="오늘의 나"
            loading="eager"
            decoding="async"
          />

          {/* 엘리베이터 문 */}
          <ElevatorDoor isOpen={isOpen} />
        </div>

        {/* 수동 컨트롤 제거: 진행도 변화에 따라 자동 이동 */}
      </div>

      {/* 하단 패널: 성취도 & 퀘스트 */}
  <AchievementPanel value={progressInfo.percent ?? 0} />
  <QuestList onProgressChange={setProgressInfo} />
  <Badges currentFloor={currentFloor} />
    </div>
  )
}
