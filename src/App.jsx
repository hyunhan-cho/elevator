import React, { useState } from 'react'
import './App.css'
import ElevatorDoor from './components/ElevatorDoor.jsx'
import TopInfo from './components/TopInfo.jsx'
import AchievementPanel from './components/AchievementPanel.jsx'
import QuestList from './components/QuestList.jsx'
import { floors } from './constants/floors.js'

// 공개 폴더(public)에 둔 이미지 경로를 사용합니다.
const elevatorInsideImg = '/images/frame.png' // 엘리베이터 내부(창문 투명)

export default function App() {
  const [isOpen, setIsOpen] = useState(true)
  const [isMoving, setIsMoving] = useState(false)
  const [currentFloor, setCurrentFloor] = useState(1)
  const [direction, setDirection] = useState('up')

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

  const [progress, setProgress] = useState(0)
  const floor = floors[currentFloor]
  return (
    <div className="app">
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

          {/* 캐릭터 */}
          <div className="character" title="오늘의 나" />

          {/* 엘리베이터 문 */}
          <ElevatorDoor isOpen={isOpen} />
        </div>

        {/* 컨트롤: 위/아래 작은 버튼 */}
        <div className="mini-controls">
          <button className="mini" disabled={isMoving || !isOpen || currentFloor>=4} onClick={() => goToFloor(currentFloor+1)}>▲</button>
          <button className="mini" disabled={isMoving || !isOpen || currentFloor<=1} onClick={() => goToFloor(currentFloor-1)}>▼</button>
        </div>
      </div>

      {/* 하단 패널: 성취도 & 퀘스트 */}
      <AchievementPanel value={progress} />
      <QuestList onProgressChange={setProgress} />
    </div>
  )
}
