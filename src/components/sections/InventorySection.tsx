import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IconCar, IconSearch } from '@tabler/icons-react'
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

const BADGE_LABEL: Record<number, Vehicle['badge']> = {
  1: 'Nuevo', 2: 'Eléctrico', 3: 'Híbrido',
}

const BADGE: Record<string, string> = {
  Nuevo: 'cb-new', Eléctrico: 'cb-ev', Híbrido: 'cb-hybrid',
}

const BRANDS = ['Toyota', 'BYD', 'Hyundai', 'Lexus', 'Ford', 'Suzuki']
const MODELS  = ['Hilux', 'Prado', 'Dolphin', 'Shark', 'Tucson', 'Hiace']
const YEARS   = [2026, 2025, 2024, 2023]
const FUELS: Fuel[] = ['Gasolina', 'Diésel', 'Eléctrico', 'Híbrido']

interface Filters { brand: string; model: string; year: string; fuel: string }
const EMPTY: Filters = { brand: '', model: '', year: '', fuel: '' }

function toVehicle(row: CarRow): Vehicle & { price?: number } {
  return {
    id: row.id,
    brand: row.brand,
    model: row.model ?? '',
    year: row.year ?? 0,
    transmission: row.transmission ?? 'Automática',
    fuel: (row.fuel as Fuel) ?? 'Gasolina',
    badge: row.badge ? BADGE_LABEL[row.badge] : undefined,
    image: row.image_url ?? undefined,
    price: row.price ?? undefined,
  }
}

const fmtPrice = (p?: number) =>
  p ? `$${p.toLocaleString('en-US')}` : 'Consultar precio'

export default function InventorySection() {
  const [allVehicles, setAllVehicles] = useState<(Vehicle & { price?: number })[]>([])
  const [loading, setLoading] = useState(true)
  const [draft,  setDraft]  = useState<Filters>(EMPTY)
  const [active, setActive] = useState<Filters>(EMPTY)

  useEffect(() => {
    supabase
      .from('cars')
      .select('*')
      .limit(6)
      .then(({ data, error }) => {
        if (!error && data) setAllVehicles((data as CarRow[]).map(toVehicle))
        setLoading(false)
      })
  }, [])

  const set = (key: keyof Filters) =>
    (e: React.ChangeEvent<HTMLSelectElement>) =>
      setDraft(f => ({ ...f, [key]: e.target.value }))

  const search = () => setActive({ ...draft })

  const vehicles = allVehicles.filter(v =>
    (!active.brand || v.brand === active.brand) &&
    (!active.model || v.model === active.model) &&
    (!active.year  || v.year  === Number(active.year)) &&
    (!active.fuel  || v.fuel  === active.fuel)
  )

  return (
    <section id="catalogo" className="sec sec-gray">

      
      <div className="container">

        {/* Heading */}
        <div className="inv-header">
          <div className="sec-header">
            <span className="sec-label">Catálogo</span>
            <h2 className="sec-title">Nuestros vehículos</h2>
            <p className="sec-sub">Nuevos y usados · actualizados constantemente</p>
          </div>
          <Link to="/catalogo" className="btn btn-outline">Ver todos</Link>
        </div>

        {/* Filter bar */}
        <div className="filter-bar">
          <select className="filter-sel" value={draft.brand} onChange={set('brand')}>
            <option value="">Marca</option>
            {BRANDS.map(b => <option key={b}>{b}</option>)}
          </select>
          <select className="filter-sel" value={draft.model} onChange={set('model')}>
            <option value="">Modelo</option>
            {MODELS.map(m => <option key={m}>{m}</option>)}
          </select>
          <select className="filter-sel" value={draft.year} onChange={set('year')}>
            <option value="">Año</option>
            {YEARS.map(y => <option key={y}>{y}</option>)}
          </select>
          <select className="filter-sel" value={draft.fuel} onChange={set('fuel')}>
            <option value="">Combustible</option>
            {FUELS.map(f => <option key={f}>{f}</option>)}
          </select>
          <button className="filter-btn" onClick={search}>
            <IconSearch size={13} aria-hidden />
            Buscar
          </button>
        </div>

        {/* Grid */}
        <div className="cars">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <article key={i} className="ccard ccard-skeleton" />
            ))
          ) : vehicles.length === 0 ? (
            <p className="no-results">No se encontraron vehículos con esos filtros.</p>
          ) : vehicles.map(v => (
            <article key={v.id} className="ccard">
              <div className="cimg">
                {v.badge && <span className={`cbadge ${BADGE[v.badge]}`}>{v.badge}</span>}
                {v.image
                  ? <img src={v.image} alt={`${v.brand} ${v.model}`} className="cimg-photo" />
                  : <IconCar size={56} aria-hidden />
                }
              </div>
              <div className="cbody">
                <div className="cname">{v.brand} {v.model}</div>
                <div className="cmeta">{v.year} · {v.transmission} · {v.fuel}</div>
              </div>
              <div className="cfoot">
                <span className={`cprice${v.price ? ' cprice--val' : ''}`}>{fmtPrice(v.price)}</span>
                <Link to={`/catalogo/${v.id}`} className="clink">Ver detalles →</Link>
              </div>
            </article>
          ))}
        </div>

        <div className="ver-btn">
          <Link to="/catalogo" className="btn btn-outline">Ver todos los vehículos</Link>
        </div>
      </div>
    </section>
  )
}
