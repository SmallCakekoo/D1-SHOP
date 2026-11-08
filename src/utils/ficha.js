import { fichas } from '../data/fichas'

export const NO_INFORMADO = 'No informado'

// Cantidad que aparece en el nombre ("350 Grs", "900 Ml", "x3 uds"). Si no hay, queda sin informar.
const CANTIDAD = /(\d+(?:[.,]\d+)?)\s*(kg|grs?|gramos|g|ml|lt|l|und|uds?|un|u)\b/i
const pluDe = (href) => (String(href).match(/(\d{6,9})(?:\/p)?$/) || [])[1]

// Todos los productos usan los mismos campos, en el mismo orden (cambio 5).
export function construirFicha(product) {
  const extra = fichas[product.href] ?? {}
  const desdeNombre = product.name.match(CANTIDAD)?.[0]
  const campos = [
    { clave: 'marca', etiqueta: 'Marca', valor: product.brand },
    { clave: 'plu', etiqueta: 'PLU', valor: product.plu ?? pluDe(product.href) },
    { clave: 'presentacion', etiqueta: 'Presentación', valor: extra.presentacion ?? desdeNombre },
    { clave: 'descripcion', etiqueta: 'Descripción', valor: extra.descripcion },
    { clave: 'conservacion', etiqueta: 'Conservación', valor: extra.conservacion },
    { clave: 'origen', etiqueta: 'Origen', valor: extra.origen },
    { clave: 'componentes', etiqueta: 'Componentes', valor: extra.componentes },
  ]
  return {
    campos: campos.map((c) => ({ ...c, valor: c.valor && c.valor.length !== 0 ? c.valor : NO_INFORMADO })),
    nota: extra.nota,
  }
}
