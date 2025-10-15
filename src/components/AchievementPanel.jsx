import React from 'react'

export default function AchievementPanel({ value = 0 }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)))
  return (
    <section className="panel">
      <h2 className="panel-title">오늘의 성취도</h2>
      <div className="progress">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="progress-label">{pct}%</div>
    </section>
  )
}
