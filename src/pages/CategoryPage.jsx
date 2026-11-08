import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import CategoryBreadcrumb from '../components/category/CategoryBreadcrumb'
import ProductListing from '../components/category/ProductListing'
import { categories } from '../data/categories'

const P = 'd1tiendas-commons-components-1-x-'

export default function CategoryPage() {
  const { slug } = useParams()
  const category = categories[slug]

  useEffect(() => {
    document.title = category ? `${category.title} | D1` : 'Página no encontrada | D1'
    window.scrollTo(0, 0)
  }, [category])

  if (!category) {
    return (
      <div className={`${P}containerLayout ${P}containerLayout--max-width pa4 tc`}>
        <h1 className="t-heading-4">No encontramos esta página</h1>
        <Link to="/" className="link b">
          Volver al inicio
        </Link>
      </div>
    )
  }

  return (
    <div className="vtex-render__container-id-search-result-layout">
      <ProductListing
        key={category.slug}
        title={category.title}
        products={category.products}
        filters={category.filters}
        priceRange={category.priceRange}
        sortOptions={category.sortOptions}
        breadcrumb={<CategoryBreadcrumb title={category.title} to={`/${category.slug}`} />}
      />
    </div>
  )
}
