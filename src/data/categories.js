import { categoryExtraordinario } from './categoryExtraordinario'

// Categorías disponibles en la app, por slug (primer segmento del path en d1.com.co).
// El rango de precio es el del catálogo completo según los filtros del sitio original.
export const categories = {
  [categoryExtraordinario.slug]: {
    ...categoryExtraordinario,
    priceRange: { min: 900, max: 199900 },
  },
}
