import React from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

function buildMonthMatrix(date = new Date()) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const first = new Date(year, month, 1)
  const last = new Date(year, month + 1, 0)
  // Monday-first index (Mon=0,...,Sun=6)
  const firstWeekday = (first.getDay() + 6) % 7 // Sunday=0 -> 6, Monday=1 -> 0
  const totalDays = last.getDate()
  const cells = []
  for (let i = 0; i < firstWeekday; i++) cells.push(null)
  for (let d = 1; d <= totalDays; d++) cells.push(new Date(year, month, d))
  // fill to full weeks (rows of 7)
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

const weekdayLabels = ['mon','tue','wed','thu','fri','sat','sun']

// 오늘 키와 기본 퀘스트: QuestList와 동일 스키마로 유지
function todayKey() {
  const d = new Date()
  return `quests:${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
}

const defaultQuests = [
  { id: 'q1', text: 'TOEFL 교재 끝내기', sub: 'chapter 2-1', done: false },
  { id: 'q2', text: '빅데이터 개인 프로젝트', sub: '자료조사', done: false },
  { id: 'q3', text: '기상 직후 홈트 30분', sub: '', done: false },
]

export default function MonthProjects({ onProgressChange }) {
  const today = new Date()
  const cells = buildMonthMatrix(today)
  const isToday = (d) => d && d.getFullYear()===today.getFullYear() && d.getMonth()===today.getMonth() && d.getDate()===today.getDate()

  // 오늘 퀘스트(QuestList와 동일 저장소 사용)
  const [items, setItems] = useLocalStorage(todayKey(), defaultQuests)
  const doneCount = items?.filter(i => i.done).length ?? 0
  const total = items?.length ?? 0
  const progress = total > 0 ? (doneCount / total) * 100 : 0

  React.useEffect(() => {
    onProgressChange?.({ percent: progress, done: doneCount, total })
  }, [progress, doneCount, total, onProgressChange])

  const toggle = (id) => {
    setItems((prev) => (prev || []).map(i => i.id === id ? { ...i, done: !i.done } : i))
  }

  return (
    // 단일 카드 요소로 통합 (제목 + 요일바 + 캘린더 + 리스트)
    <section className="card card-month">
      <h2 className="card-title month-title">이번 달의 프로젝트</h2>
      <div className="month-weekdays">
        {weekdayLabels.map((lb) => (
          <span key={lb} className="month-wd">{lb}</span>
        ))}
      </div>
      <div className="month-grid">
        {cells.map((d, i) => (
          <div key={i} className={"day" + (isToday(d) ? ' today' : '')}>
            {d ? <span className="day-num">{d.getDate()}</span> : ''}
          </div>
        ))}
      </div>
      {/* 프로젝트 리스트: 같은 카드 내부에 유지 */}
      <div className="project-list">
        {(items || []).map((i) => (
          <div key={i.id} className={`project-item ${i.done ? 'done' : ''}`} onClick={() => toggle(i.id)}>
            {i.text}
          </div>
        ))}
      </div>
    </section>
  )
}
