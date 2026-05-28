import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { IconBrandWhatsapp, IconBrandFacebook, IconBrandInstagram, IconMenu2, IconX } from '@tabler/icons-react'
import logoImg from '@/assets/images/logoToyo.png'

const WA = 'https://wa.me/+50686088696'
const FB = 'https://www.facebook.com/ToyodeOccidente/'
const IG = 'https://www.instagram.com/toyodeoccidentecr/'

const navItems = [
  { to: '/',         label: 'Inicio',    end: true  },
  { to: '/catalogo', label: 'Catálogo',  end: false },
  { to: '/nosotros', label: 'Nosotros',  end: false },
  { to: '/contacto', label: 'Contacto',  end: false },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const renderLink = (item: typeof navItems[number], mobile = false) => {
    const base = mobile ? 'nav-drawer-link' : 'nav-link'
    return (
      <NavLink
        key={item.to}
        to={item.to}
        end={item.end}
        className={({ isActive }) => `${base}${isActive ? ` ${base}--active` : ''}`}
        onClick={mobile ? () => setOpen(false) : undefined}
      >
        {item.label}
      </NavLink>
    )
  }

  return (
    <>
      <nav className="nav">
        <Link to="/" className="nav-logo">
          <img src={logoImg} alt="Toyo de Occidente" className="nav-logo-img" />
        </Link>

        <div className="nav-links">
          {navItems.map(item => renderLink(item))}
        </div>

        <div className="nav-socials">
          <a className="nav-social" href={FB} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <IconBrandFacebook size={16} />
          </a>
          <a className="nav-social" href={IG} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <IconBrandInstagram size={16} />
          </a>
          <a className="nav-social" href={WA} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <IconBrandWhatsapp size={16} />
          </a>
        </div>

        <button
          className="nav-burger"
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          {open ? <IconX size={22} /> : <IconMenu2 size={22} />}
        </button>
      </nav>

      {open && <div className="nav-overlay" onClick={() => setOpen(false)} />}

      <div className={`nav-drawer ${open ? 'nav-drawer--open' : ''}`}>
        <div className="nav-drawer-links">
          {navItems.map(item => renderLink(item, true))}
        </div>
        <a className="btn btn-wa nav-drawer-wa" href={WA} target="_blank" rel="noopener noreferrer">
          <IconBrandWhatsapp size={17} aria-hidden />
          Contactar por WhatsApp
        </a>
      </div>
    </>
  )
}
