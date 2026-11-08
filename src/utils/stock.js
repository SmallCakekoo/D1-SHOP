import { agotadosDePrueba } from '../data/inventario'
import { productPath } from './links'

// Acepta la URL absoluta de las tarjetas o el path de la página de producto.
export const estaAgotado = (href) => {
  const path = href ? productPath(href) : null
  return path ? agotadosDePrueba.has(path) : false
}
