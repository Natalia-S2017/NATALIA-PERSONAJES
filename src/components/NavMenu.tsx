import { useState } from 'react'
import { createPortal } from 'react-dom'
import { NavLink, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'

export default function NavMenu() {
  const { t } = useLang()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const links = [
    { to: '/', label: t('Inicio', 'Home') },
    { to: '/mario', label: 'Mario' },
    { to: '/pacman', label: 'Pac-Man' },
    { to: '/crash', label: 'Crash Bandicoot' },
    { to: '/creditos', label: t('Créditos', 'Credits') },
  ]

  const go = (to: string) => { setOpen(false); navigate(to) }

  const overlay = open ? createPortal(
    <div className="mobile-menu-overlay" onClick={() => setOpen(false)}>
      <nav className="mobile-menu" onClick={e => e.stopPropagation()}>
        <p className="mobile-menu-title">{t('Menú', 'Menu')}</p>
        {links.map(({ to, label }) => (
          <button key={to} className="mobile-menu-link" onClick={() => go(to)}>
            {label}
          </button>
        ))}
      </nav>
    </div>,
    document.body
  ) : null

  return (
    <>
      {/* Nav de escritorio */}
      <nav className="nav-menu nav-desktop">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Botón hamburguesa (solo móvil) */}
      <button
        className={`hamburger${open ? ' hamburger--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label="Menú"
      >
        <span /><span /><span />
      </button>

      {overlay}
    </>
  )
}
