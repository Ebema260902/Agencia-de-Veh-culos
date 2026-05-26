const ITEMS = [
  { value: '+500', label: 'Vehículos entregados'   },
  { value: '15+',  label: 'Años en el mercado'     },
  { value: '98%',  label: 'Satisfacción del cliente'},
  { value: '24/7', label: 'Soporte por WhatsApp'   },
] as const

export default function RedBarSection() {
  return (
    <div id="taller" className="redbar">
      {ITEMS.map(({ value, label }) => (
        <div key={label} className="redbar-item">
          <div className="redbar-n">{value}</div>
          <div className="redbar-l">{label}</div>
        </div>
      ))}
    </div>
  )
}
