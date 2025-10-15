import React from 'react'

const elevatorDoorImg = '/images/closed.png'

export default function ElevatorDoor({ isOpen }) {
  return (
    <>
      <div
        className="door door-left"
        style={{
          backgroundImage: `url(${elevatorDoorImg})`,
          transform: isOpen ? 'translateX(-100%)' : 'translateX(0)',
        }}
      />
      <div
        className="door door-right"
        style={{
          backgroundImage: `url(${elevatorDoorImg})`,
          transform: isOpen ? 'translateX(100%)' : 'translateX(0)',
        }}
      />
    </>
  )
}
