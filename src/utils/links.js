import { categories } from '../data/categories'

// Base solo para poder interpretar rutas relativas; no es un sitio real.
const BASE = 'http://app.local'

const parse = (href) => {
  try {
    return new URL(href, BASE).pathname
  } catch {
    return null
  }
}

// Devuelve el path interno si la URL de d1.com.co es una página de producto (termina en /p).
export const productPath = (href) => {
  const pathname = parse(href)
  return pathname && pathname.endsWith('/p') ? pathname : null
}

// Devuelve "/slug" si la URL apunta a una categoría que esta app ya tiene.
export const categoryPath = (href) => {
  const pathname = parse(href)
  const slug = pathname ? pathname.replace(/^\/|\/$/g, '') : ''
  return slug && !slug.includes('/') && categories[slug] ? `/${slug}` : null
}

// Páginas fijas que la app ya tiene. /account y /login muestran el login (sin sesión el sitio real redirige igual).
const STATIC_PAGES = { '/login': '/login', '/account': '/login', '/tiendas': '/tiendas' }
export const staticPath = (href) => {
  const pathname = parse(href)
  return pathname ? STATIC_PAGES[pathname.replace(/\/$/, '')] ?? null : null
}

// Búsquedas del sitio ("/queso?map=ft&_q=queso"): se resuelven aquí con el término de búsqueda.
export const searchPath = (href) => {
  try {
    const url = new URL(href, BASE)
    const query = url.searchParams.get('_q')
    return query ? `${url.pathname}?map=ft&_q=${encodeURIComponent(query)}` : null
  } catch {
    return null
  }
}

export const internalPath = (href) =>
  searchPath(href) ?? productPath(href) ?? categoryPath(href) ?? staticPath(href)

// Ruta de búsqueda para un texto escrito por la persona.
export const searchUrl = (text) => {
  const slug = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return `/${slug || 'buscar'}?map=ft&_q=${encodeURIComponent(text)}`
}

// "$ 12.900" -> 12900
export const priceValue = (price) => Number(String(price).replace(/\D/g, '')) || 0
