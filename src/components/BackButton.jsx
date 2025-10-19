import React from 'react'

export default function BackButton({ onClick }) {
  return (
    <button className="back-btn" aria-label="뒤로" onClick={onClick}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 18L9 12L15 6" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 12H9" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round"/>
      </svg>
    </button>
  )
}
