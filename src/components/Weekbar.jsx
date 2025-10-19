import React from 'react'

function getWeekDays(base = new Date()) {
  const day = base.getDay() || 7; // Sunday=0 -> 7
  const monday = new Date(base);
  monday.setDate(base.getDate() - (day - 1));
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    days.push(d);
  }
  return days;
}

const labels = ['mon','tue','wed','thu','fri','sat','sun']

export default function Weekbar({ done = 0, total = 0 }) {
  const [anchor, setAnchor] = React.useState(new Date())
  const days = getWeekDays(anchor)
  const today = new Date()
  const isToday = (d) => d.getFullYear()===today.getFullYear() && d.getMonth()===today.getMonth() && d.getDate()===today.getDate();
  const todayDone = done > 0 && total > 0;
  const dayKey = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const isPast = (d) => dayKey(d) < dayKey(today);
  const isFuture = (d) => dayKey(d) > dayKey(today);

  const keyForDate = (d) => `quests:${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
  const getStatus = (d) => {
    try {
      const raw = localStorage.getItem(keyForDate(d))
      if (!raw) return 'none'
      const list = JSON.parse(raw)
      if (!Array.isArray(list) || list.length===0) return 'none'
      const doneCnt = list.filter(i => i && i.done).length
      const ratio = doneCnt / list.length
      if (ratio === 0) return 'fail'
      if (ratio >= 1) return 'good'
      return 'ok'
    } catch {
      return 'none'
    }
  }

  return (
    <section className="weekbar">
      <div className="weekbar-labels">
        {labels.map((lb) => (
          <span key={lb} className="weekbar-label">{lb}</span>
        ))}
      </div>
      <div className="weekbar-body">
        <button className="weekbar-arrow" aria-label="이전 주" onClick={() => setAnchor(new Date(anchor.setDate(anchor.getDate()-7)))}>{'<'}</button>
        <div className="weekbar-chips">
          {days.map((d, i) => {
            const cls = ['chip']
            const status = getStatus(d)
            if (isPast(d)) {
              cls.push('past')
              // Figma spec: success=red, not achieved=blue (partial treated as not achieved)
              if (status === 'good') cls.push('pass')
              else cls.push('fail')
            } else if (isToday(d)) {
              cls.push('today')
            } else if (isFuture(d)) {
              cls.push('future')
            }
            return (
              <div key={i} className={cls.join(' ')}>
                {d.getDate()}
              </div>
            )
          })}
        </div>
        <button className="weekbar-arrow" aria-label="다음 주" onClick={() => setAnchor(new Date(anchor.setDate(anchor.getDate()+7)))}>{'>'}</button>
      </div>
    </section>
  )
}
