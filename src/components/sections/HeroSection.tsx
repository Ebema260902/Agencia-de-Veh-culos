import fondoImg from '@/assets/images/Ejemplos/FondoLanding1.png'

export default function HeroSection() {
  return (
    <>
      <section className="hero">
        <img src={fondoImg} alt="" className="hero-bg" aria-hidden />
        <div className="hero-overlay" aria-hidden />

        <div className="hero-body">
          <div className="hero-body-content">
            <p className="hero-label">Concesionario certificado · Palmares, Alajuela</p>
            <h1 className="hero-title">
              Encuentra tu<br />
              <em className="hero-title-red">vehículo ideal</em>
            </h1>
            <p className="hero-sub">
              Venta, servicio y financiamiento en Costa Rica.
            </p>
            <a className="hero-cta" href="#catalogo">Ver catálogo</a>
          </div>
        </div>
      </section>
    </>
  )
}
