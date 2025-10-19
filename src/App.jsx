import React, { useEffect, useState } from 'react'
import './App.css'
import ElevatorDoor from './components/ElevatorDoor.jsx'
import TopInfo from './components/TopInfo.jsx'
import QuestList from './components/QuestList.jsx'
import { floors } from './constants/floors.js'
import Badges from './components/Badges.jsx'
import useLocalStorage from './hooks/useLocalStorage.js'
import Splash from './pages/Splash.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import BackButton from './components/BackButton.jsx'
import Navbar from './components/Navbar.jsx'
import Weekbar from './components/Weekbar.jsx'
import MonthProjects from './components/MonthProjects.jsx'

// 공개 폴더(public)에 둔 이미지 경로를 사용합니다.
const elevatorInsideImg = '/images/frame.png' // 엘리베이터 내부(창문 투명)

export default function App() {
  const [isOpen, setIsOpen] = useState(true)
  const [isMoving, setIsMoving] = useState(false)
  const [currentFloor, setCurrentFloor] = useState(1)
  const [direction, setDirection] = useState('up')
  const [progressInfo, setProgressInfo] = useState({ percent: 0, done: 0, total: 0 })
  const [view, setView] = useLocalStorage('view', 'splash')

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
      <Splash onLogin={() => setView('login')} onSignup={() => setView('signup')} />
    )
  }
  if (view === 'login') {
    return (
      <Login
        onBack={() => setView('splash')}
        onSignup={() => setView('signup')}
        onSuccess={() => setView('home')}
      />
    )
  }
  if (view === 'signup') {
    return (
      <Signup
        onBack={() => setView('splash')}
        onLogin={() => setView('login')}
        onSuccess={() => setView('login')}
      />
    )
  }
  return (
    <div className="app home-view">
      <BackButton onClick={() => setView('splash')} />
      <div className="home-header">
        <img className="home-logo" src="/images/logo.png" alt="FLOORIDA" />
      </div>
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

      {/* 하단 패널: 퀘스트 & 주간 바 */}
  <QuestList onProgressChange={setProgressInfo} />
  <Weekbar done={progressInfo.done ?? 0} total={progressInfo.total ?? 0} />
  <MonthProjects />
  <Badges currentFloor={currentFloor} />
      <Navbar onNavigate={(key) => {
        if (key === 'home') setView('home')
      }} />
    </div>
  )
}
