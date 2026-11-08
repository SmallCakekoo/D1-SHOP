import Stars from './Stars'
import { resenasDe } from '../../utils/resenas'
import '../../styles/resenas.css'

// Lista de reseñas del producto (cambio 4). Todas son de ejemplo y se marcan como tales.
export default function ProductReviews({ href }) {
  const { lista, promedio, cantidad } = resenasDe(href)
  return (
    <section id="resenas" className="d1-reviews" aria-labelledby="resenas-titulo">
      <h2 id="resenas-titulo">Reseñas</h2>
      <p className="d1-reviews__resumen">
        <strong>{promedio.toFixed(1).replace('.', ',')}</strong> de 5 · {cantidad} reseñas
        <Stars href={href} />
      </p>
      <p className="d1-reviews__prueba">Copia de prueba: estas reseñas son de ejemplo, no son de clientes reales.</p>
      <ul>
        {lista.map((r) => (
          <li key={r.autor + r.fecha}>
            <div className="d1-reviews__head">
              <span className="d1-stars__row" role="img" aria-label={`${r.estrellas} de 5 estrellas`}>
                {'★★★★★'.split('').map((s, i) => (
                  <span key={i} className={i < r.estrellas ? 'd1-star d1-star--on' : 'd1-star'}>{s}</span>
                ))}
              </span>
              <strong>{r.autor}</strong>
              <span className="d1-reviews__badge">Reseña de ejemplo</span>
            </div>
            <p>{r.texto}</p>
            <small>{new Date(r.fecha).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}</small>
          </li>
        ))}
      </ul>
    </section>
  )
}
