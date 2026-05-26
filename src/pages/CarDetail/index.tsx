import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  IconArrowLeft, IconBrandWhatsapp, IconCar,
  IconGasStation, IconManualGearbox, IconCalendar,
  IconBolt, IconShare, IconChevronRight,
} from '@tabler/icons-react'
import { supabase } from '@/lib/supabase'
import type { Vehicle, Fuel } from '@/types'

interface CarRow {
  id: string
  brand: string
  model: string | null
  year: number | null
  price: number | null
  fuel: string | null
  transmission: string | null
  image_url: string | null
  badge: number | null
}

const BADGE_LABEL: Record<number, string> = { 1: 'Nuevo', 2: 'Eléctrico', 3: 'Híbrido' }
const BADGE_CLASS: Record<string, string>  = { Nuevo: 'cb-new', Eléctrico: 'cb-ev', Híbrido: 'cb-hybrid' }

function toVehicle(r: CarRow): Vehicle & { price?: number } {
  return {
    id: r.id, brand: r.brand, model: r.model ?? '', year: r.year ?? 0,
    transmission: r.transmission ?? 'Automática', fuel: (r.fuel as Fuel) ?? 'Gasolina',
    badge: r.badge ? (BADGE_LABEL[r.badge] as Vehicle['badge']) : undefined,
    image: r.image_url ?? undefined, price: r.price ?? undefined,
  }
}

const WA_NUMBER = '+50686088696'

export default function CarDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [car, setCar]         = useState<(Vehicle & { price?: number }) | null>(null)
  const [related, setRelated] = useState<(Vehicle & { price?: number })[]>([])
  const [loading, setLoading] = useState(true)
  const [imgLoaded, setImgLoaded] = useState(false)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setImgLoaded(false)
    supabase.from('cars').select('*').eq('id', id).single()
      .then(({ data, error }) => {
        if (error || !data) { setLoading(false); return }
        const v = toVehicle(data as CarRow)
        setCar(v)
        supabase.from('cars').select('*').eq('brand', v.brand).neq('id', id).limit(3)
          .then(({ data: rel }) => {
            if (rel) setRelated((rel as CarRow[]).map(toVehicle))
            setLoading(false)
          })
      })
  }, [id])

  const waMessage = car
    ? `Hola, me interesa el ${car.brand} ${car.model} ${car.year}. ¿Podría obtener más información?`
    : ''

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: `${car?.brand} ${car?.model}`, url: window.location.href })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  if (loading) return <CarDetailSkeleton />

  if (!car) return (
    <div className="cd-not-found">
      <IconCar size={56} />
      <h2>Vehículo no encontrado</h2>
      <Link to="/catalogo" className="btn btn-blue">Ver catálogo</Link>
    </div>
  )

  const badge = car.badge ? BADGE_LABEL[Object.keys(BADGE_LABEL).find(k => BADGE_LABEL[+k] === car.badge) as unknown as number] ?? car.badge : null

  const SPECS = [
    { icon: <IconCalendar size={18} />,        label: 'Año',          value: String(car.year)   },
    { icon: <IconGasStation size={18} />,      label: 'Combustible',  value: car.fuel           },
    { icon: <IconManualGearbox size={18} />,   label: 'Transmisión',  value: car.transmission   },
    { icon: <IconBolt size={18} />,            label: 'Marca',        value: car.brand          },
  ]

  return (
    <>
      {/* Breadcrumb */}
      <div className="cd-breadcrumb">
        <div className="cd-breadcrumb-inner">
          <Link to="/">Inicio</Link>
          <IconChevronRight size={13} />
          <Link to="/catalogo">Catálogo</Link>
          <IconChevronRight size={13} />
          <span>{car.brand} {car.model}</span>
        </div>
      </div>

      <div className="cd-wrap">
        {/* Back link */}
        <button className="cd-back" onClick={() => navigate(-1)}>
          <IconArrowLeft size={16} />
          Volver
        </button>

        {/* Hero */}
        <div className="cd-hero">
          {/* Image */}
          <div className="cd-hero-img">
            {car.badge && (
              <span className={`cbadge cd-badge ${BADGE_CLASS[car.badge] ?? ''}`}>{car.badge}</span>
            )}
            {car.image ? (
              <>
                {!imgLoaded && <div className="cd-img-placeholder"><IconCar size={64} /></div>}
                <img
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  className={`cd-img${imgLoaded ? ' cd-img--loaded' : ''}`}
                  onLoad={() => setImgLoaded(true)}
                />
              </>
            ) : (
              <div className="cd-img-placeholder"><IconCar size={64} /></div>
            )}
          </div>

          {/* Info panel */}
          <div className="cd-info">
            <div className="cd-info-brand">{car.brand}</div>
            <h1 className="cd-info-model">{car.model}</h1>
            <div className="cd-info-year">{car.year}</div>

            {/* Spec pills */}
            <div className="cd-spec-pills">
              {SPECS.map(s => (
                <div key={s.label} className="cd-spec-pill">
                  <span className="cd-spec-pill-icon">{s.icon}</span>
                  <div>
                    <div className="cd-spec-pill-label">{s.label}</div>
                    <div className="cd-spec-pill-val">{s.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cd-price-row">
              <span className="cd-price-label">Precio</span>
              <span className="cd-price-val">
                {car.price ? `$${car.price.toLocaleString('en-US')}` : 'Consultar'}
              </span>
            </div>

            {/* CTAs */}
            <div className="cd-ctas">
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa cd-cta-main"
              >
                <IconBrandWhatsapp size={18} />
                Consultar por WhatsApp
              </a>
              <a href="/#contacto" className="btn btn-outline cd-cta-sec">
                Enviar formulario
              </a>
            </div>

            <button className="cd-share" onClick={handleShare}>
              <IconShare size={14} />
              Compartir vehículo
            </button>
          </div>
        </div>

        {/* Specs table */}
        <section className="cd-specs-section">
          <h2 className="cd-section-title">Especificaciones</h2>
          <div className="cd-specs-grid">
            {[
              ['Marca',         car.brand         ],
              ['Modelo',        car.model         ],
              ['Año',           String(car.year)  ],
              ['Combustible',   car.fuel          ],
              ['Transmisión',   car.transmission  ],
              ['Estado',        car.badge ?? '—'  ],
            ].map(([label, value]) => (
              <div key={label} className="cd-spec-row">
                <span className="cd-spec-row-label">{label}</span>
                <span className="cd-spec-row-val">{value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Related cars */}
        {related.length > 0 && (
          <section className="cd-related">
            <div className="cd-related-head">
              <h2 className="cd-section-title">Más vehículos {car.brand}</h2>
              <Link to="/catalogo" className="cd-related-all">Ver todos →</Link>
            </div>
            <div className="cd-related-grid">
              {related.map(v => (
                <Link key={v.id} to={`/catalogo/${v.id}`} className="cd-rel-card">
                  <div className="cd-rel-img">
                    {v.badge && (
                      <span className={`cbadge ${BADGE_CLASS[v.badge] ?? ''}`}>{v.badge}</span>
                    )}
                    {v.image
                      ? <img src={v.image} alt={`${v.brand} ${v.model}`} loading="lazy" />
                      : <IconCar size={36} />
                    }
                  </div>
                  <div className="cd-rel-body">
                    <div className="cd-rel-brand">{v.brand}</div>
                    <div className="cd-rel-model">{v.model}</div>
                    <div className="cd-rel-meta">{v.year} · {v.fuel}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Sticky CTA — mobile only */}
      <div className="cd-sticky-cta">
        <div className="cd-sticky-inner">
          <div>
            <div className="cd-sticky-name">{car.brand} {car.model}</div>
            <div className="cd-sticky-sub">Consultar precio</div>
          </div>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-wa"
          >
            <IconBrandWhatsapp size={16} />
            WhatsApp
          </a>
        </div>
      </div>
    </>
  )
}

function CarDetailSkeleton() {
  return (
    <div className="cd-wrap">
      <div className="cd-skeleton-back" />
      <div className="cd-hero">
        <div className="cd-hero-img ccard-skeleton" style={{ borderRadius: 12 }} />
        <div className="cd-info cd-info-skeleton">
          {[80, 200, 60, 120, 100].map((w, i) => (
            <div key={i} className="ccard-skeleton" style={{ height: 20, width: w, borderRadius: 6, marginBottom: 12 }} />
          ))}
        </div>
      </div>
    </div>
  )
}
