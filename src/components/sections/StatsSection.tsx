const STATS = [
  { value: '+500',   label: 'Vehículos vendidos'  },
  { value: '15+',    label: 'Años de experiencia'  },
  { value: '+1,200', label: 'Clientes satisfechos' },
  { value: '100%',   label: 'Garantía certificada' },
]

export default function StatsSection() {
  return (
    <div className="stats">
      <div className="stats-grid">
        {STATS.map(({ value, label }) => (
          <div key={label} className="stat">
            <div className="stat-n">{value}</div>
            <div className="stat-l">{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
