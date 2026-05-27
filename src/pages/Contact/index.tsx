import ContactSection from '@/components/sections/ContactSection'
import { IconMapPin } from '@tabler/icons-react'

export default function Contact() {
  return (
    <>
      {/* Page hero */}
      <div className="cat-hero">
        <div className="cat-hero-body">
          <span className="sec-label">Atención personalizada</span>
          <h1 className="cat-hero-title">Contáctanos</h1>
          <p className="cat-hero-sub">Escríbenos, llámanos o visítanos en Palmares de Alajuela</p>
        </div>
      </div>

      {/* Reuse the full contact section */}
      <ContactSection />

      {/* Map placeholder */}
      <div className="container" style={{ paddingBottom: '5rem' }}>
        <div className="contact-pg-map">
          <IconMapPin size={20} aria-hidden />
          <span>Palmares de Alajuela, Costa Rica · Mapa disponible próximamente</span>
        </div>
      </div>
    </>
  )
}
