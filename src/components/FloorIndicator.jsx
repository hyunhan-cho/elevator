import React from 'react'

export default function FloorIndicator({ currentFloor, isMoving, direction }) {
  const arrow = direction === 'up' ? '▲' : '▼'
  return (
    <div className="floor-indicator">
      {isMoving && <span className="arrow">{arrow}</span>}
      <span>{currentFloor}</span>
    </div>
  )
}
