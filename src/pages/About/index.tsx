import { Link } from 'react-router-dom'
import {
  IconShieldCheck,
  IconUsers,
  IconBolt,
  IconCertificate,
  IconMapPin,
  IconBrandWhatsapp,
} from '@tabler/icons-react'

const METRICS = [
  { value: '+15',    label: 'Años de experiencia' },
  { value: '+500',   label: 'Vehículos vendidos'  },
  { value: '+1,200', label: 'Clientes satisfechos' },
  { value: '6',      label: 'Marcas disponibles'  },
]

const VALUES = [
  {
    icon: <IconShieldCheck size={22} />,
    title: 'Confianza',
    desc: 'Cada vehículo pasa por una inspección rigurosa antes de llegar a tus manos. Transparencia total en historial, precio y condición.',
  },
  {
    icon: <IconUsers size={22} />,
    title: 'Servicio personalizado',
    desc: 'Nuestro equipo te asesora desde la búsqueda hasta la entrega. Atención humana, sin presión y adaptada a tu presupuesto.',
  },
  {
    icon: <IconCertificate size={22} />,
    title: 'Garantía certificada',
    desc: 'Respaldamos cada venta con garantía certificada y soporte posventa. Tu tranquilidad es nuestra responsabilidad.',
  },
  {
    icon: <IconBolt size={22} />,
    title: 'Especialistas en eléctricos',
    desc: 'Taller propio con técnicos certificados en vehículos híbridos y eléctricos BYD y Toyota. La tecnología del futuro, hoy.',
  },
  {
    icon: <IconMapPin size={22} />,
    title: 'Zona occidental',
    desc: 'Ubicados en Palmares de Alajuela, cerca de quienes más nos necesitan. Más de 15 años siendo el concesionario de confianza del occidente.',
  },
  {
    icon: <IconBrandWhatsapp size={22} />,
    title: 'Atención inmediata',
    desc: 'Respuesta rápida por WhatsApp para cotizaciones, citas de taller y consultas. Porque tu tiempo vale.',
  },
]

const BRANDS = ['Toyota', 'BYD', 'Hyundai', 'Lexus', 'Ford', 'Suzuki']

export default function About() {
  return (
    <>
      {/* Page hero */}
      <div className="cat-hero">
        <div className="cat-hero-body">
          <span className="sec-label">Quiénes somos</span>
          <h1 className="cat-hero-title">Toyo de Occidente</h1>
          <p className="cat-hero-sub">Concesionario y taller certificado en Palmares de Alajuela, Costa Rica</p>
        </div>
      </div>

      {/* Story + metrics */}
      <div className="container">
        <div className="about-story">
          <div>
            <span className="sec-label">Nuestra historia</span>
            <h2 className="sec-title" style={{ marginBottom: '1.5rem' }}>
              Más de 15 años al servicio<br />de la zona occidental
            </h2>
            <p className="about-story-lead">
              Somos un concesionario multi-marca con sede en Palmares de Alajuela. Nacimos
              con la misión de ofrecer vehículos de calidad acompañados de un servicio honesto,
              cercano y accesible para las familias de la región occidente de Costa Rica.
            </p>
            <p className="about-story-muted">
              A lo largo de los años crecimos junto a nuestros clientes: primero como punto
              de venta Toyota, luego incorporando marcas líderes en movilidad eléctrica e híbrida
              como BYD, Hyundai y Lexus. Hoy contamos con un taller propio certificado y un equipo
              técnico especializado para darte el mejor servicio antes, durante y después de tu compra.
            </p>
            <div className="about-brands-wrap" style={{ marginTop: '1.75rem' }}>
              {BRANDS.map(b => (
                <Link key={b} to="/catalogo" className="about-brand-chip">{b}</Link>
              ))}
            </div>
          </div>

          <div className="about-metrics">
            {METRICS.map(({ value, label }) => (
              <div key={label} className="about-metric">
                <div className="about-metric-n">{value}</div>
                <div className="about-metric-l">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <section className="sec sec-gray">
        <div className="container">
          <div className="sec-header-center">
            <span className="sec-label">Nuestros valores</span>
            <h2 className="sec-title">Por qué elegirnos</h2>
            <p className="sec-sub">Lo que nos diferencia no es solo el inventario, sino la experiencia completa.</p>
          </div>
          <div className="about-values">
            {VALUES.map(({ icon, title, desc }) => (
              <div key={title} className="about-val-card">
                <div className="about-val-icon" aria-hidden>{icon}</div>
                <div className="about-val-title">{title}</div>
                <div className="about-val-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="container">
        <div className="about-cta">
          <h2 className="about-cta-title">¿Listo para encontrar tu vehículo ideal?</h2>
          <p className="about-cta-sub">Explora nuestro inventario o contáctanos directamente.</p>
          <div className="about-cta-btns">
            <Link to="/catalogo" className="btn btn-blue">Ver catálogo</Link>
            <Link to="/contacto" className="btn" style={{ borderColor: 'rgba(255,255,255,.35)', color: 'rgba(255,255,255,.8)' }}>
              Contactar
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
