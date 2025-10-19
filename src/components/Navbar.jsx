import React from 'react'

import teamIcon from '../assets/navvar/button_team.png'
import calendarIcon from '../assets/navvar/button_calender.png'
import homeIcon from '../assets/navvar/button_home.png'
import paintIcon from '../assets/navvar/button_paint.png'
import settingIcon from '../assets/navvar/button_setting.png'

export default function Navbar({ onNavigate }) {
  const items = [
    { key: 'team', label: '팀플레이스', icon: teamIcon },
    { key: 'calendar', label: '내캘린더', icon: calendarIcon },
    { key: 'home', label: '엘리베이터', icon: homeIcon },
    { key: 'paint', label: '꾸미기', icon: paintIcon },
    { key: 'settings', label: '설정', icon: settingIcon },
  ]
  const handleClick = (key) => {
    if (onNavigate) onNavigate(key)
  }
  return (
    <nav className="navbar">
      {items.map((it) => (
        <button key={it.key} className="nav-item" onClick={() => handleClick(it.key)}>
          <img src={it.icon} alt="" className="nav-icon" />
          <span className="nav-label">{it.label}</span>
        </button>
      ))}
    </nav>
  )
}
