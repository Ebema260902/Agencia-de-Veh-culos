import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { IconCar, IconSearch, IconX, IconAdjustmentsHorizontal, IconArrowsSort } from '@tabler/icons-react'
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
const BADGE_CLASS: Record<string, string> = {
  Nuevo: 'cb-new', Eléctrico: 'cb-ev', Híbrido: 'cb-hybrid',
}

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

const fmtPrice = (p?: number) => p ? `$${p.toLocaleString('en-US')}` : 'Consultar precio'

const FUELS: Fuel[] = ['Gasolina', 'Diésel', 'Eléctrico', 'Híbrido']
const TRANSMISSIONS = ['Automático', 'Manual']
const SORT_OPTIONS = [
  { value: 'brand',    label: 'Marca A–Z'         },
  { value: 'year_d',  label: 'Año: más nuevo'     },
  { value: 'year_a',  label: 'Año: más antiguo'   },
  { value: 'price_a', label: 'Precio: menor'      },
  { value: 'price_d', label: 'Precio: mayor'      },
]

export default function CatalogPage() {
  const [all, setAll]         = useState<(Vehicle & { price?: number })[]>([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch]           = useState('')
  const [brands, setBrands]           = useState<string[]>([])
  const [fuels, setFuels]             = useState<string[]>([])
  const [trans, setTrans]             = useState<string[]>([])
  const [yearMin, setYearMin]         = useState('')
  const [yearMax, setYearMax]         = useState('')
  const [sort, setSort]               = useState('brand')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    supabase.from('cars').select('*').then(({ data, error }) => {
      if (!error && data) setAll((data as CarRow[]).map(toVehicle))
      setLoading(false)
    })
  }, [])

  const allBrands = useMemo(() => [...new Set(all.map(v => v.brand))].sort(), [all])
  const allYears  = useMemo(() => [...new Set(all.map(v => v.year).filter(Boolean))].sort((a, b) => b - a), [all])

  const toggle = (list: string[], item: string, set: (v: string[]) => void) =>
    set(list.includes(item) ? list.filter(x => x !== item) : [...list, item])

  const clearAll = () => {
    setSearch(''); setBrands([]); setFuels([]); setTrans([])
    setYearMin(''); setYearMax('')
  }

  const activeChips: { key: string; label: string; onRemove: () => void }[] = [
    ...(search ? [{ key: 'q', label: `"${search}"`, onRemove: () => setSearch('') }] : []),
    ...brands.map(b => ({ key: `b-${b}`, label: b, onRemove: () => toggle(brands, b, setBrands) })),
    ...fuels.map(f  => ({ key: `f-${f}`, label: f,  onRemove: () => toggle(fuels, f, setFuels) })),
    ...trans.map(t  => ({ key: `t-${t}`, label: t,  onRemove: () => toggle(trans, t, setTrans) })),
    ...(yearMin ? [{ key: 'ymin', label: `Desde ${yearMin}`, onRemove: () => setYearMin('') }] : []),
    ...(yearMax ? [{ key: 'ymax', label: `Hasta ${yearMax}`, onRemove: () => setYearMax('') }] : []),
  ]

  const filtered = useMemo(() => {
    let res = all.filter(v => {
      const q = search.toLowerCase()
      if (q && !`${v.brand} ${v.model}`.toLowerCase().includes(q)) return false
      if (brands.length && !brands.includes(v.brand)) return false
      if (fuels.length  && !fuels.includes(v.fuel))   return false
      if (trans.length  && !trans.some(t => v.transmission.toLowerCase().includes(t.toLowerCase()))) return false
      if (yearMin && v.year < Number(yearMin)) return false
      if (yearMax && v.year > Number(yearMax)) return false
      return true
    })
    if (sort === 'brand')   res = [...res].sort((a, b) => a.brand.localeCompare(b.brand))
    if (sort === 'year_d')  res = [...res].sort((a, b) => b.year  - a.year)
    if (sort === 'year_a')  res = [...res].sort((a, b) => a.year  - b.year)
    if (sort === 'price_a') res = [...res].sort((a, b) => (a.price ?? 0) - (b.price ?? 0))
    if (sort === 'price_d') res = [...res].sort((a, b) => (b.price ?? 0) - (a.price ?? 0))
    return res
  }, [all, search, brands, fuels, trans, yearMin, yearMax, sort])

  return (
    <>
      {/* Page hero */}
      <div className="cat-hero">
        <div className="cat-hero-body">
          <span className="sec-label">Inventario completo</span>
          <h1 className="cat-hero-title">Catálogo de vehículos</h1>
          <p className="cat-hero-sub">Encuentra tu próximo vehículo entre nuestra selección completa</p>
        </div>
      </div>

      <div className="cat-wrap">
        {/* Search bar */}
        <div className="cat-searchbar">
          <IconSearch size={16} className="cat-search-icon" aria-hidden />
          <input
            className="cat-search-input"
            type="text"
            placeholder="Buscar por marca o modelo…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button className="cat-search-clear" onClick={() => setSearch('')} aria-label="Limpiar">
              <IconX size={14} />
            </button>
          )}
        </div>

        <div className="cat-layout">
          {/* Sidebar */}
          <aside className={`cat-sidebar ${sidebarOpen ? 'cat-sidebar--open' : ''}`}>
            <div className="cat-sidebar-head">
              <span className="cat-sidebar-title">Filtros</span>
              {activeChips.length > 0 && (
                <button className="cat-clear-link" onClick={clearAll}>Limpiar todo</button>
              )}
            </div>

            {/* Marca */}
            <div className="cat-filter-group">
              <div className="cat-filter-label">Marca</div>
              {allBrands.map(b => (
                <label key={b} className="cat-check">
                  <input
                    type="checkbox"
                    checked={brands.includes(b)}
                    onChange={() => toggle(brands, b, setBrands)}
                  />
                  <span>{b}</span>
                </label>
              ))}
            </div>

            {/* Combustible */}
            <div className="cat-filter-group">
              <div className="cat-filter-label">Combustible</div>
              {FUELS.map(f => (
                <label key={f} className="cat-check">
                  <input
                    type="checkbox"
                    checked={fuels.includes(f)}
                    onChange={() => toggle(fuels, f, setFuels)}
                  />
                  <span>{f}</span>
                </label>
              ))}
            </div>

            {/* Transmisión */}
            <div className="cat-filter-group">
              <div className="cat-filter-label">Transmisión</div>
              {TRANSMISSIONS.map(t => (
                <label key={t} className="cat-check">
                  <input
                    type="checkbox"
                    checked={trans.includes(t)}
                    onChange={() => toggle(trans, t, setTrans)}
                  />
                  <span>{t}</span>
                </label>
              ))}
            </div>

            {/* Año */}
            <div className="cat-filter-group">
              <div className="cat-filter-label">Año</div>
              <div className="cat-year-row">
                <select className="cat-year-sel" value={yearMin} onChange={e => setYearMin(e.target.value)}>
                  <option value="">Desde</option>
                  {allYears.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <span className="cat-year-sep">–</span>
                <select className="cat-year-sel" value={yearMax} onChange={e => setYearMax(e.target.value)}>
                  <option value="">Hasta</option>
                  {allYears.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>
          </aside>

          {/* Main */}
          <div className="cat-main">
            {/* Results bar */}
            <div className="cat-results-bar">
              <div className="cat-results-left">
                <button
                  className="cat-mob-filter-btn"
                  onClick={() => setSidebarOpen(o => !o)}
                  aria-label="Filtros"
                >
                  <IconAdjustmentsHorizontal size={15} />
                  Filtros
                </button>
                <span className="cat-count">
                  {loading ? 'Cargando…' : `${filtered.length} vehículo${filtered.length !== 1 ? 's' : ''}`}
                </span>
              </div>
              <div className="cat-sort">
                <IconArrowsSort size={14} className="cat-sort-icon" aria-hidden />
                <select
                  className="cat-sort-sel"
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                >
                  {SORT_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active chips */}
            {activeChips.length > 0 && (
              <div className="cat-chips">
                {activeChips.map(chip => (
                  <span key={chip.key} className="cat-chip">
                    {chip.label}
                    <button onClick={chip.onRemove} aria-label={`Quitar ${chip.label}`}>
                      <IconX size={11} />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Grid */}
            <div className="cat-grid">
              {loading ? (
                Array.from({ length: 9 }).map((_, i) => (
                  <article key={i} className="ccard ccard-skeleton" />
                ))
              ) : filtered.length === 0 ? (
                <div className="cat-empty">
                  <IconCar size={48} aria-hidden />
                  <p>No se encontraron vehículos con esos filtros.</p>
                  <button className="btn btn-outline" onClick={clearAll}>Limpiar filtros</button>
                </div>
              ) : filtered.map(v => (
                <article key={v.id} className="cat-card">
                  <Link to={`/catalogo/${v.id}`} className="cat-card-img-link">
                    <div className="cat-card-img">
                      {v.badge && (
                        <span className={`cbadge ${BADGE_CLASS[v.badge] ?? ''}`}>{v.badge}</span>
                      )}
                      {v.image
                        ? <img src={v.image} alt={`${v.brand} ${v.model}`} loading="lazy" />
                        : <IconCar size={52} aria-hidden />
                      }
                    </div>
                  </Link>
                  <div className="cat-card-body">
                    <div className="cat-card-brand">{v.brand}</div>
                    <div className="cat-card-model">{v.model}</div>
                    <div className="cat-card-meta">{v.year} · {v.transmission} · {v.fuel}</div>
                  </div>
                  <div className="cat-card-foot">
                    <span className={`cat-card-price${v.price ? ' cat-card-price--val' : ''}`}>{fmtPrice(v.price)}</span>
                    <Link to={`/catalogo/${v.id}`} className="clink">Ver detalles →</Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div id="contacto-cat" className="cat-cta">
          <div className="cat-cta-body">
            <h2 className="cat-cta-title">¿Encontraste tu vehículo ideal?</h2>
            <p className="cat-cta-sub">Contáctanos para más información, prueba de manejo o financiamiento.</p>
            <div className="cat-cta-btns">
              <a
                href="https://wa.me/+50686088696"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa"
              >
                Contactar por WhatsApp
              </a>
              <a href="/#contacto" className="btn btn-outline cat-cta-outline">
                Ir al formulario
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
