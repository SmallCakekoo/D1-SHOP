import { Link } from 'react-router-dom'
import { internalPath } from '../../utils/links'

// Enlace de la tienda: navega dentro de la app si la página existe aquí (productos, categorías, búsquedas, Remerca...).
// Lo que no existe en esta copia apunta a "#": ningún enlace sale hacia el sitio real.
// Los mailto:, tel: y enlaces a terceros (redes, tiendas de apps) se dejan como están.
export default function AppLink({ href, children, ...props }) {
  const internal = internalPath(href)
  if (internal) {
    return (
      <Link to={internal} {...props}>
        {children}
      </Link>
    )
  }
  const afuera = /^(mailto:|tel:|https?:\/\/)/.test(href ?? '')
  return (
    <a href={afuera ? href : '#'} {...props}>
      {children}
    </a>
  )
}
