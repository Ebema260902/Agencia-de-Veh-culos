import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="page">
      <h1>404 — Página no encontrada</h1>
      <Link to="/">Volver al inicio</Link>
    </section>
  )
}
