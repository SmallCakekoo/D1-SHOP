import { CardIcon, CheckCircleIcon, LockIcon } from './InlineIcons'
import { sellosPago } from '../../data/pagoSeguro'
import '../../styles/pago-seguro.css'

const ICONOS = { lock: LockIcon, check: CheckCircleIcon, card: CardIcon }

// Franja de sellos de pago seguro (cambio 1). Se usa en el carrito y en el checkout.
export default function PaymentSeals({ compact = false }) {
  return (
    <ul className={`d1-seals ${compact ? 'd1-seals--compact' : ''}`} aria-label="Pago seguro">
      {sellosPago.map((s) => {
        const Icono = ICONOS[s.icon]
        return (
          <li key={s.titulo} className="d1-seal">
            <span className="d1-seal__icon">
              <Icono />
            </span>
            <span className="d1-seal__text">
              <strong>{s.titulo}</strong>
              {!compact && <small>{s.detalle}</small>}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
