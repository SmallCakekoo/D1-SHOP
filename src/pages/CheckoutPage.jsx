import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PaymentSeals from '../components/ui/PaymentSeals'
import { CheckCircleIcon } from '../components/ui/InlineIcons'
import { useCart } from '../context/useCart'
import { asset } from '../utils/asset'
import { explicacionSeguridad, metodosPago } from '../data/pagoSeguro'
import '../styles/pago-seguro.css'

const money = (n) => `$ ${n.toLocaleString('es-CO')}`

// Checkout de la copia (cambio 1). No pide tarjeta, no usa claves y no se conecta a ningún servicio.
export default function CheckoutPage() {
  const { items, total, count } = useCart()
  const [metodo, setMetodo] = useState('pse')
  const [confirmado, setConfirmado] = useState(false)

  useEffect(() => {
    document.title = 'Pago | D1'
    window.scrollTo(0, 0)
  }, [])

  if (confirmado) {
    return (
      <div className="d1-checkout d1-checkout--done" role="status">
        <CheckCircleIcon width={56} height={56} />
        <h1>Pedido confirmado</h1>
        <p>Gracias por tu compra. Te avisaremos cuando tu pedido esté en camino.</p>
        <Link to="/" className="d1-checkout__btn">Volver al inicio</Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="d1-checkout d1-checkout--done">
        <h1>Tu carrito está vacío</h1>
        <p>Agrega productos para ver el resumen de tu pago.</p>
        <Link to="/" className="d1-checkout__btn">Empezar a comprar</Link>
      </div>
    )
  }

  return (
    <div className="d1-checkout">
      <h1>Pago seguro</h1>
      <PaymentSeals />

      <div className="d1-checkout__grid">
        <section aria-labelledby="co-metodo">
          <h2 id="co-metodo">1. Elige cómo pagar</h2>
          <fieldset className="d1-checkout__methods">
            <legend className="vtex-store-components-3-x-visuallyHidden">Método de pago</legend>
            {metodosPago.map((m) => (
              <label key={m.id} className={`d1-method ${metodo === m.id ? 'd1-method--on' : ''}`}>
                <input type="radio" name="metodo" value={m.id} checked={metodo === m.id} onChange={() => setMetodo(m.id)} />
                <span>
                  <strong>{m.nombre}</strong>
                  <small>{m.detalle}</small>
                </span>
              </label>
            ))}
          </fieldset>

          <h2>2. Cómo cuidamos tu pago</h2>
          <div className="d1-checkout__faq">
            {explicacionSeguridad.map((e) => (
              <details key={e.titulo}>
                <summary>{e.titulo}</summary>
                <p>{e.texto}</p>
              </details>
            ))}
          </div>
        </section>

        <aside aria-labelledby="co-resumen" className="d1-checkout__summary">
          <h2 id="co-resumen">Resumen ({count} {count === 1 ? 'producto' : 'productos'})</h2>
          <ul>
            {items.map((i) => (
              <li key={i.href}>
                <img src={asset(i.image)} alt="" width="48" height="48" />
                <span>{i.name} × {i.quantity}</span>
              </li>
            ))}
          </ul>
          <p className="d1-checkout__total"><span>Total</span><strong>{money(total)}</strong></p>
          <button type="button" className="d1-checkout__btn" onClick={() => setConfirmado(true)}>
            Confirmar pedido
          </button>
        </aside>
      </div>
    </div>
  )
}
