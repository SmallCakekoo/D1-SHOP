import { agotadosDePrueba } from '../data/inventario'
import { productPath } from './links'

// Acepta la URL absoluta de las tarjetas o el path de la página de producto.
export const estaAgotado = (href) => {
  const path = href ? productPath(href) : null
  return path ? agotadosDePrueba.has(path) : false
}

// Regla única de dónde se muestran los agotados (pulido 3).
//  - 'home': la portada solo ofrece lo que se puede comprar, así que los oculta.
//  - 'busqueda', 'categoria' y 'producto': los muestra con la etiqueta "Agotado".
export const CONTEXTOS_SIN_AGOTADOS = ['home']
export const seMuestraEn = (href, contexto) => !(CONTEXTOS_SIN_AGOTADOS.includes(contexto) && estaAgotado(href))
