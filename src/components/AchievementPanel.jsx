import React from 'react'

export default function AchievementPanel({ value = 0, total = 100 }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)))
  return (
    <section className="card card-achievement">
      <h2 className="card-title">오늘의 성취도</h2>
      <div className="bar-row">
        <div className="bar">
          <div className="bar-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="bar-count">{pct}%</div>
      </div>
    </section>
  )
}
