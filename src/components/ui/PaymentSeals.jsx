import Icon from './Icon'
import { sellosPago } from '../../data/pagoSeguro'
import '../../styles/pago-seguro.css'

// Franja de sellos de pago seguro (cambio 1). Se usa en el carrito y en el checkout.
export default function PaymentSeals({ compact = false }) {
  return (
    <ul className={`d1-seals ${compact ? 'd1-seals--compact' : ''}`} aria-label="Pago seguro">
      {sellosPago.map((s) => (
        <li key={s.titulo} className="d1-seal">
          <Icon id={s.icon} size={compact ? 18 : 24} />
          <span>
            <strong>{s.titulo}</strong>
            {!compact && <small>{s.detalle}</small>}
          </span>
        </li>
      ))}
    </ul>
  )
}
