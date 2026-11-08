import { useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Breadcrumb from '../components/product/Breadcrumb'
import ProductGallery from '../components/product/ProductGallery'
import ProductInfo from '../components/product/ProductInfo'
import ProductDescription from '../components/product/ProductDescription'
import ProductReviews from '../components/product/ProductReviews'
import ProductSheet from '../components/product/ProductSheet'
import { kitDetails } from '../data/kitDetails'
import { productDetails } from '../data/productDetails'
import { shelves } from '../data/shelves'
import { categories } from '../data/categories'
import { asset } from '../utils/asset'
import { productPath } from '../utils/links'

const P = 'd1tiendas-commons-components-1-x-'

// Detalle completo si lo tenemos; si no, lo mínimo que muestran los estantes de la home.
function findProduct(path) {
  const detail = productDetails[path]
  if (detail) return { ...detail, href: path }

  const lists = [...shelves.map((s) => s.products), ...Object.values(categories).map((c) => c.products)]
  for (const products of lists) {
    const found = products.find((p) => productPath(p.href) === path)
    if (found) {
      return {
        name: found.name,
        brand: found.brand,
        price: found.price,
        href: path,
        images: [asset(found.image)],
        breadcrumb: [],
      }
    }
  }
  return null
}

export default function ProductPage() {
  const { pathname } = useLocation()
  const product = useMemo(() => findProduct(pathname), [pathname])

  useEffect(() => {
    document.title = product ? `${product.name} | D1` : 'Producto no encontrado | D1'
    window.scrollTo(0, 0)
  }, [product])

  if (!product) {
    return (
      <div className={`${P}containerLayout ${P}containerLayout--max-width pa4 tc`}>
        <h1 className="t-heading-4">No encontramos este producto</h1>
        <Link to="/" className="link b">
          Volver al inicio
        </Link>
      </div>
    )
  }

  return (
    <div className="vtex-render__container-id-pdp">
      <div className={`${P}containerLayout ${P}containerLayout--pdp-container ${P}containerLayout--max-width flex flex-column pa4`}>
        <Breadcrumb trail={product.breadcrumb} current={product.name} />
        <div className={`${P}containerLayout ${P}containerLayout--pdp-container-main flex flex-column flex-row-ns justify-between items-start`}>
          <div className={`${P}containerLayout ${P}containerLayout--product-images flex w-100 w-50-ns`}>
            <ProductGallery images={product.images} name={product.name} />
          </div>
          <ProductInfo product={product} />
        </div>
        <ProductSheet product={product} />
        {/* Las condiciones de compra de los kits de donación siguen disponibles tal como estaban. */}
        {kitDetails[product.href] && <ProductDescription html={product.descriptionHtml} />}
        <ProductReviews href={product.href} />
      </div>
    </div>
  )
}
