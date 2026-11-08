import { resenasDe } from '../../utils/resenas'
import '../../styles/resenas.css'

// Estrellas + cantidad (cambio 4). DATOS DE PRUEBA: ver data/resenas.js.
export default function Stars({ href, link }) {
  const { promedio, cantidad } = resenasDe(href)
  const llenas = Math.round(promedio)
  const etiqueta = `${promedio.toFixed(1).replace('.', ',')} de 5 estrellas, ${cantidad} reseñas`
  const contenido = (
    <>
      <span className="d1-stars__row" aria-hidden="true">
        {'★★★★★'.split('').map((s, i) => (
          <span key={i} className={i < llenas ? 'd1-star d1-star--on' : 'd1-star'}>{s}</span>
        ))}
      </span>
      <span className="d1-stars__count">({cantidad})</span>
    </>
  )
  return link ? (
    <a href="#resenas" className="d1-stars" aria-label={etiqueta}>{contenido}</a>
  ) : (
    <span className="d1-stars" role="img" aria-label={etiqueta}>{contenido}</span>
  )
}
