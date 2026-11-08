import { resenasDePrueba } from '../data/resenas'
import { productPath } from './links'

// Reparte de forma estable (siempre igual para el mismo producto) entre 3 y 6 reseñas de prueba.
const hash = (text) => [...text].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7)

export function resenasDe(href) {
  const path = (href && productPath(href)) || String(href ?? '')
  const h = hash(path)
  const cantidad = 3 + (h % 4)
  const inicio = h % resenasDePrueba.length
  const lista = Array.from({ length: cantidad }, (_, i) => resenasDePrueba[(inicio + i) % resenasDePrueba.length])
  const promedio = lista.reduce((t, r) => t + r.estrellas, 0) / lista.length
  return { lista, promedio, cantidad }
}
