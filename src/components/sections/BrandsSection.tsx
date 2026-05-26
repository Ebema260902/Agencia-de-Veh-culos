const BRANDS = ['Toyota', 'BYD', 'Hyundai', 'Lexus', 'Ford', 'Suzuki'] as const

export default function BrandsSection() {
  return (
    <div className="brands">
      <span className="brands-label">Marcas</span>
      <div className="brands-list">
        {BRANDS.map(brand => (
          <a key={brand} href="#inventario" className="brand-chip">{brand}</a>
        ))}
      </div>
    </div>
  )
}
