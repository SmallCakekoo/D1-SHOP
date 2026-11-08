import { searchIndex } from '../data/searchIndex'
import { shelves } from '../data/shelves'
import { categories } from '../data/categories'
import { productDetails } from '../data/productDetails'

const SITE = 'https://www.d1.com.co'
const IMG = 'https://d1tiendas.vtexassets.com/arquivos/ids'

const normalize = (text) =>
  String(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim()

const money = (n) => `$ ${n.toLocaleString('es-CO')}`

const fromIndex = ([name, brand, path, imageId, version, price]) => ({
  name,
  brand,
  href: `${SITE}${path}/p`,
  image: `${IMG}/${imageId}-197-197?v=${version}&width=197&height=197&aspect=true`,
  price: money(price),
})

// Productos que la app conoce por otras vías (estantes de la home, categorías y detalles).
function localCatalog() {
  const all = [
    ...shelves.flatMap((s) => s.products),
    ...Object.values(categories).flatMap((c) => c.products),
    ...Object.entries(productDetails).map(([path, p]) => ({
      name: p.name,
      brand: p.brand,
      href: `${SITE}${path}`,
      image: p.images[0],
      price: p.price,
    })),
  ]
  const seen = new Set()
  return all.filter((p) => !seen.has(p.href) && seen.add(p.href))
}

// Busca el término en las búsquedas populares ya guardadas y, si no está, en el catálogo local.
// "total" es la cantidad que reporta el sitio real cuando la conocemos.
export function searchProducts(query) {
  const q = normalize(query)
  if (!q) return { products: [], total: 0, complete: true }

  const indexed = searchIndex[q]
  if (indexed) {
    return { products: indexed.items.map(fromIndex), total: indexed.total, complete: indexed.items.length >= indexed.total }
  }

  const tokens = q.split(/\s+/)
  const products = localCatalog().filter((p) => {
    const haystack = normalize(`${p.name} ${p.brand}`)
    return tokens.every((t) => haystack.includes(t))
  })
  return { products, total: products.length, complete: true }
}

// Productos de la sección "Promociones que te encantarán" cuando no hay resultados.
export const promotedProducts = () => searchIndex.aseo.items.slice(0, 8).map(fromIndex)
