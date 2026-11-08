import { Link } from 'react-router-dom'
import { internalPath } from '../../utils/links'

// Enlace a d1.com.co: navega dentro de la app si la página existe aquí (productos, categorías y Remerca),
// y abre el sitio original en cualquier otro caso.
export default function AppLink({ href, children, ...props }) {
  const internal = internalPath(href)
  if (internal) {
    return (
      <Link to={internal} {...props}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} {...props}>
      {children}
    </a>
  )
}
