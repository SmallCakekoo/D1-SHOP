import { Link } from 'react-router-dom'
import Icon from './Icon'
import { resumenDevolucion } from '../../data/politicas'
import '../../styles/ayuda.css'

// Resumen corto de la política de devolución (cambio 2). Va en la ficha de producto y en el carrito.
export default function ReturnPolicySummary({ onNavigate }) {
  return (
    <section className="d1-returns" aria-label="Devoluciones">
      <h3 className="d1-returns__title">
        <Icon id="hpa-check-circle" size={18} /> Devoluciones fáciles
      </h3>
      <ul>
        {resumenDevolucion.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <Link to="/devoluciones" onClick={onNavigate} className="d1-returns__link">
        Ver la política completa
      </Link>
    </section>
  )
}
