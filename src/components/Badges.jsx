import React from 'react'
import { useEffect, useRef, useState } from 'react'

// 실제 제공된 배지 이미지 사용
const BADGE_IMAGES = [
	'/images/badges/badge_10.png',
	'/images/badges/badge_50.png',
	'/images/badges/badge_100.png',
]

const BADGE_TITLES = ['10', '50', '100']

export default function Badges({ currentFloor = 1 }) {
	// 2층부터 1개씩 누적: 2F -> 1개, 3F -> 2개, 4F -> 3개
	const count = Math.max(0, Math.min(BADGE_IMAGES.length, currentFloor - 1))
	const owned = count > 0 ? BADGE_IMAGES.slice(0, count) : []

	// 획득 알림: 이전 보유 개수 대비 증가분이 있으면 토스트 노출
	const prevCountRef = useRef(0)
	const [toasts, setToasts] = useState([])

	useEffect(() => {
		const prev = prevCountRef.current
		if (count > prev) {
			for (let i = prev; i < count; i++) {
				const idx = Math.min(i, BADGE_TITLES.length - 1)
				const toast = { id: `${Date.now()}-${i}`, src: BADGE_IMAGES[idx], title: `${BADGE_TITLES[idx]} 배지 획득!` }
				setToasts((q) => [...q, toast])
				setTimeout(() => {
					setToasts((q) => q.filter((t) => t.id !== toast.id))
				}, 2400)
			}
			prevCountRef.current = count
		} else if (count < prev) {
			// 내려간 경우엔 이전값만 갱신 (알림 없음)
			prevCountRef.current = count
		}
	}, [count])

	return (
		<section className="panel">
			<h2 className="panel-title">획득한 뱃지</h2>
			<div className="earned-badges-row">
				{owned.map((src, i) => (
					<img
						key={src}
						className="earned-badge-img"
						src={src}
						alt={`획득 뱃지 ${i + 1}`}
						loading="lazy"
						decoding="async"
					/>
				))}
			</div>

			{/* 토스트 레이어 */}
			{toasts.length > 0 && (
				<div className="toast-layer">
					{toasts.map((t) => (
						<div key={t.id} className="badge-toast">
							<img src={t.src} alt="badge" className="badge-toast-img" />
							<span>{t.title}</span>
						</div>
					))}
				</div>
			)}
		</section>
	)
}

