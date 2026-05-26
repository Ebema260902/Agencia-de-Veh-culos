import { useState } from 'react'
import { IconMapPin, IconPhone, IconMail, IconClock, IconBrandWhatsapp } from '@tabler/icons-react'
import type { ContactFormData } from '@/types'

const INFO = [
  { icon: <IconMapPin size={18} />, label: 'Dirección', value: 'Palmares de Alajuela, Costa Rica' },
  { icon: <IconPhone  size={18} />, label: 'Teléfono',  value: '+506 8608-8696'                    },
  { icon: <IconMail   size={18} />, label: 'Correo',    value: 'info@toyodeoccidente.com'           },
  { icon: <IconClock  size={18} />, label: 'Horario',   value: 'Lun–Sáb · 8:00am – 6:00pm'        },
] as const

const EMPTY: ContactFormData = { name: '', contact: '', reason: '', message: '' }

export default function ContactSection() {
  const [form, setForm] = useState<ContactFormData>(EMPTY)

  const set = (field: keyof ContactFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = `Hola, soy ${form.name}.\nContacto: ${form.contact}\nAsunto: ${form.reason}\n${form.message}`
    window.open(`https://wa.me/+50686088696?text=${encodeURIComponent(text)}`, '_blank')
    setForm(EMPTY)
  }

  return (
    <section id="contacto" className="sec sec-gray">
      <div className="container">
        <div className="sec-header-center">
          <span className="sec-label">Contacto</span>
          <h2 className="sec-title">Estamos para ayudarte</h2>
          <p className="sec-sub">Escríbenos o visítanos en Palmares de Alajuela.</p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            {INFO.map(({ icon, label, value }) => (
              <div key={label} className="contact-row">
                <div className="contact-icon" aria-hidden>{icon}</div>
                <div>
                  <div className="contact-lbl">{label}</div>
                  <div className="contact-val">{value}</div>
                </div>
              </div>
            ))}

            <a
              className="btn btn-wa btn-full"
              style={{ marginTop: '.5rem' }}
              href="https://wa.me/+50686088696"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandWhatsapp size={17} aria-hidden />
              Chatear por WhatsApp
            </a>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <input className="form-field" type="text" placeholder="Nombre completo" value={form.name} onChange={set('name')} required />
            <input className="form-field" type="text" placeholder="Teléfono o correo" value={form.contact} onChange={set('contact')} required />
            <select className="form-field" value={form.reason} onChange={set('reason')} required>
              <option value="">¿En qué podemos ayudarte?</option>
              <option>Compra de vehículo</option>
              <option>Cita al taller</option>
              <option>Financiamiento</option>
              <option>Otro</option>
            </select>
            <textarea className="form-field" placeholder="Tu mensaje..." value={form.message} onChange={set('message')} />
            <button type="submit" className="btn btn-blue btn-full">Enviar mensaje</button>
          </form>
        </div>
      </div>
    </section>
  )
}
