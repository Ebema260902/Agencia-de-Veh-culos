import { IconTool, IconSettings, IconBolt, IconCar, IconCreditCard, IconCalendar } from '@tabler/icons-react'
import type { ReactNode } from 'react'

interface Service { icon: ReactNode; title: string; description: string }

const SERVICES: Service[] = [
  { icon: <IconTool size={22} />,       title: 'Mantenimiento',        description: 'Cambio de aceite, filtros y revisión general con repuestos de calidad.' },
  { icon: <IconSettings size={22} />,   title: 'Reparación mecánica',  description: 'Motor, transmisión, frenos y sistema eléctrico con diagnóstico computarizado.' },
  { icon: <IconBolt size={22} />,       title: 'Vehículos eléctricos', description: 'Especialistas en BYD y Toyota híbrido/eléctrico.' },
  { icon: <IconCar size={22} />,        title: 'Inspección vehicular',  description: 'Revisión completa de 50 puntos para garantizar tu seguridad.' },
  { icon: <IconCreditCard size={22} />, title: 'Financiamiento',        description: 'Planes de crédito flexibles con las mejores tasas del mercado.' },
  { icon: <IconCalendar size={22} />,   title: 'Citas al taller',       description: 'Agenda por WhatsApp o en línea y recibe atención prioritaria.' },
]

export default function ServicesSection() {
  return (
    <section id="servicios" className="sec sec-white">
      <div className="container">
        <div className="sec-header-center">
          <span className="sec-label">Servicios</span>
          <h2 className="sec-title">Te cuidamos en el taller</h2>
          <p className="sec-sub">Técnicos certificados para tu tranquilidad</p>
        </div>

        <div className="svcs">
          {SERVICES.map(({ icon, title, description }) => (
            <div key={title} className="svc-card">
              <div className="svc-icon" aria-hidden>{icon}</div>
              <div className="svc-title">{title}</div>
              <div className="svc-desc">{description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
