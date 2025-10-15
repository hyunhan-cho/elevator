import React, { useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const defaultQuests = [
  { id: 'q1', text: 'TOEFL chapter 2-1 풀기', done: false },
  { id: 'q2', text: '빅데이터 개인 프로젝트', done: false },
  { id: 'q3', text: '기상 직후 홈트 30분', done: false },
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
    onProgressChange?.(progress)
  }, [progress, onProgressChange])

  const toggle = (id) => {
    setItems(items.map(i => i.id === id ? { ...i, done: !i.done } : i))
  }

  return (
    <section className="panel">
      <h2 className="panel-title">오늘의 퀘스트</h2>
      <ul className="quest-list">
        {items.map(i => (
          <li key={i.id} className={`quest ${i.done ? 'done' : ''}`}>
            <label>
              <input type="checkbox" checked={i.done} onChange={() => toggle(i.id)} />
              <span>{i.text}</span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  )
}
