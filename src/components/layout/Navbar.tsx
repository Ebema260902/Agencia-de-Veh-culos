import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { IconBrandWhatsapp, IconMenu2, IconX } from '@tabler/icons-react'
import logoImg from '@/assets/images/logocolor2.png'

const WA = 'https://wa.me/+50686088696'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const prefix = isHome ? '' : '/'

  // Close drawer on route change
  useEffect(() => { setOpen(false) }, [pathname])

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const anchorLinks = [
    { href: isHome ? '#' : '/',      label: 'Inicio'    },
    { href: '/catalogo',            label: 'Catálogo', isRoute: true },
    { href: `${prefix}#servicios`,  label: 'Servicios' },
    { href: `${prefix}#taller`,     label: 'Taller'    },
    { href: `${prefix}#contacto`,   label: 'Contacto'  },
  ]

  return (
    <>
      <nav className="nav">
        <Link to="/" className="nav-logo">
          <img src={logoImg} alt="Toyo de Occidente" className="nav-logo-img" />
        </Link>

        {/* Desktop links */}
        <div className="nav-links">
          {anchorLinks.map(({ href, label, isRoute }) =>
            isRoute ? (
              <NavLink
                key={href}
                to={href}
                className={({ isActive }) => `nav-link${isActive ? ' nav-link--active' : ''}`}
              >
                {label}
              </NavLink>
            ) : (
              <a key={href} href={href} className="nav-link">{label}</a>
            )
          )}
        </div>

        {/* Desktop WhatsApp */}
        <a className="nav-wa nav-wa--desk" href={WA} target="_blank" rel="noopener noreferrer">
          <IconBrandWhatsapp size={15} aria-hidden />
          WhatsApp
        </a>

        {/* Hamburger */}
        <button
          className="nav-burger"
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          {open ? <IconX size={22} /> : <IconMenu2 size={22} />}
        </button>
      </nav>

      {/* Mobile drawer overlay */}
      {open && <div className="nav-overlay" onClick={() => setOpen(false)} />}

      <div className={`nav-drawer ${open ? 'nav-drawer--open' : ''}`}>
        <div className="nav-drawer-links">
          {anchorLinks.map(({ href, label, isRoute }) =>
            isRoute ? (
              <NavLink
                key={href}
                to={href}
                className={({ isActive }) => `nav-drawer-link${isActive ? ' nav-drawer-link--active' : ''}`}
                onClick={() => setOpen(false)}
              >
                {label}
              </NavLink>
            ) : (
              <a
                key={href}
                href={href}
                className="nav-drawer-link"
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            )
          )}
        </div>
        <a className="btn btn-wa nav-drawer-wa" href={WA} target="_blank" rel="noopener noreferrer">
          <IconBrandWhatsapp size={17} aria-hidden />
          Contactar por WhatsApp
        </a>
      </div>
    </>
  )
}
