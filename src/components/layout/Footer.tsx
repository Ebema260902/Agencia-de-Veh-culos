import { IconBrandFacebook, IconBrandInstagram, IconBrandWhatsapp } from '@tabler/icons-react'

const NAV   = [['Catálogo','#catalogo'],['Servicios','#servicios'],['Taller','#taller'],['Contacto','#contacto']] as const
const BRANDS = ['Toyota','BYD','Hyundai','Lexus','Ford','Suzuki'] as const

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-body">
        <div>
          <div className="footer-name">Toyo de Occidente</div>
          <div className="footer-desc">
            Concesionario y taller certificado en Palmares de Alajuela.
            Más de 15 años al servicio de la zona occidental de Costa Rica.
          </div>
          <div className="footer-socials">
            <a className="footer-social" href="https://www.facebook.com/ToyodeOccidente/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><IconBrandFacebook size={15} /></a>
            <a className="footer-social" href="https://www.instagram.com/toyodeoccidentecr/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><IconBrandInstagram size={15} /></a>
            <a className="footer-social" href="https://wa.me/+50686088696" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><IconBrandWhatsapp size={15} /></a>
          </div>
        </div>

        <div>
          <div className="footer-col-title">Navegación</div>
          {NAV.map(([label, href]) => <a key={href} className="footer-col-link" href={href}>{label}</a>)}
        </div>

        <div>
          <div className="footer-col-title">Marcas</div>
          {BRANDS.map(b => <a key={b} className="footer-col-link" href="#">{b}</a>)}
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">© {new Date().getFullYear()} Toyo de Occidente. Todos los derechos reservados.</span>
        <span className="footer-copy">Palmares de Alajuela, Costa Rica</span>
      </div>

    </footer>
  )
}
