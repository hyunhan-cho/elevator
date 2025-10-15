import React from 'react'

function formatKoreanDate(date = new Date()) {
  const weekday = date.toLocaleDateString('ko-KR', { weekday: 'long' })
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${month}월 ${day}일 ${weekday}`
}

export default function TopInfo({ currentFloor, direction }) {
  const arrow = direction === 'up' ? '▲' : '▼'
  const arrowColor = direction === 'up' ? '#16a34a' : '#ef4444'
  return (
    <div className="top-info">
      <div className="badge date">{formatKoreanDate()}</div>
      <div className="badge floor">
        <div>현재 층수</div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <strong>{currentFloor}</strong>
          <span style={{ color: arrowColor }}>{arrow}</span>
        </div>
      </div>
    </div>
  )
}
