import React, { useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const defaultQuests = [
  { id: 'q1', text: 'TOEFL 교재 끝내기', sub: 'chapter 2-1', done: false },
  { id: 'q2', text: '빅데이터 개인 프로젝트', sub: '자료조사', done: false },
  { id: 'q3', text: '기상 직후 홈트 30분', sub: '', done: false },
]

function todayKey() {
  const d = new Date()
  return `quests:${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
}

export default function QuestList({ onProgressChange }) {
  const [items, setItems] = useLocalStorage(todayKey(), defaultQuests)

  const progress = useMemo(() => {
    if (!items?.length) return 0
    const done = items.filter(i => i.done).length
    return (done / items.length) * 100
  }, [items])

  React.useEffect(() => {
    const total = items?.length ?? 0
    const done = items?.filter(i => i.done).length ?? 0
    onProgressChange?.({ percent: progress, done, total })
  }, [progress, onProgressChange, items])

  const toggle = (id) => {
    setItems(items.map(i => i.id === id ? { ...i, done: !i.done } : i))
  }

  const doneCount = items?.filter(i => i.done).length ?? 0
  const total = items?.length ?? 0

  return (
    <section className="card card-quests">
      <h2 className="card-title">오늘의 퀘스트</h2>
      <div className="bar-row">
        <div className="bar">
          <div className="bar-fill" style={{ width: `${Math.round(progress)}%` }} />
        </div>
        <div className="bar-count">{doneCount}/{total}</div>
      </div>
      <ul className="quest-list fancy">
        {items.map(i => (
          <li key={i.id} className={`quest-item ${i.done ? 'done' : ''}`}>
            <div className="quest-texts">
              <span className="quest-text">{i.text}</span>
              {i.sub ? <span className="quest-sub">{i.sub}</span> : null}
            </div>
            <button
              className={`quest-checkbox ${i.done ? 'checked' : ''}`}
              aria-label="완료"
              onClick={() => toggle(i.id)}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
