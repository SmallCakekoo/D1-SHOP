import { useEffect, useMemo } from 'react'
import ProductListing from '../components/category/ProductListing'
import ProductShelf from '../components/home/ProductShelf'
import AppLink from '../components/ui/AppLink'
import { notFoundBanner } from '../data/searchIndex'
import { priceValue } from '../utils/links'
import { promotedProducts, searchProducts } from '../utils/search'

const P = 'd1tiendas-commons-components-1-x-'
const R = 'vtex-search-result-3-x-'
const SITE = 'https://www.d1.com.co'

// Sin resultados el sitio real muestra un banner y un estante de promociones.
function NotFound() {
  const shelf = {
    id: 'not-found-shelf',
    titleLead: 'Promociones que',
    titleStrong: 'te encantarán',
    seeMoreLabel: 'Ver mas',
    seeMoreHref: `${SITE}/extraordinarios`,
    image: null,
    products: promotedProducts(),
  }

  return (
    <div className={`${R}notFound--layout flex flex-column flex-grow-1`}>
      <div className={`${P}containerLayout ${P}containerLayout--not-found--container ${P}containerLayout--max-width w-100 pt5 pb7`}>
        <section className={`${P}content_not_found`}>
          <div
            role="region"
            aria-label="Carrusel de imágenes promocionales"
            className={`${P}containerLayout ${P}containerLayout--max-width ${P}containerLayout--banners-home ${P}containerLayout--sanity pv6 ph4`}
          >
            <AppLink href={`${SITE}/`} className={`${P}imageElementLink vtex-store-components-3-x-imageElementLink`}>
              <img
                src={notFoundBanner}
                alt=""
                className={`${P}imageElement vtex-store-components-3-x-imageElement`}
                style={{ maxHeight: 420, width: '100%', objectFit: 'contain' }}
              />
            </AppLink>
          </div>
          <ProductShelf shelf={shelf} />
        </section>
      </div>
    </div>
  )
}

function ShowMore({ query, shown, total }) {
  const href = `${SITE}/${encodeURIComponent(query)}?map=ft&_q=${encodeURIComponent(query)}`
  return (
    <div className={`${R}buttonShowMore--layout w-100 flex flex-column items-center`}>
      <p className="t-small c-muted-1 mv3">
        Mostrando {shown} de {total} productos
      </p>
      <div className={`${R}buttonShowMore w-100 flex justify-center`}>
        <a
          href={href}
          className="vtex-button bw1 ba fw5 v-mid relative pa0 lh-solid br2 min-h-small t-action--small bg-action-primary b--action-primary c-on-action-primary hover-bg-action-primary hover-b--action-primary hover-c-on-action-primary pointer no-underline"
        >
          <div className="vtex-button__label flex items-center justify-center h-100 ph5">Ver más productos</div>
        </a>
      </div>
    </div>
  )
}

export default function SearchPage({ query }) {
  const results = useMemo(() => searchProducts(query), [query])

  useEffect(() => {
    document.title = `${query} | D1`
    window.scrollTo(0, 0)
  }, [query])

  const { products, total, complete } = results
  const listing = useMemo(() => {
    const prices = products.map((p) => priceValue(p.price))
    const brands = [...new Set(products.map((p) => p.brand))].filter(Boolean)
    return {
      priceRange: {
        min: prices.length ? Math.floor(Math.min(...prices) / 100) * 100 : 0,
        max: prices.length ? Math.ceil(Math.max(...prices) / 100) * 100 : 0,
      },
      filters: [
        { title: 'Marca', options: brands },
        { title: 'Precio', options: [] },
      ],
    }
  }, [products])

  return (
    <div className="vtex-render__container-id-search">
      {products.length === 0 ? (
        <>
          <p role="status" className="vtex-store-components-3-x-visuallyHidden">
            No encontramos resultados para {query}
          </p>
          <NotFound />
        </>
      ) : (
        <ProductListing
          key={query}
          title={query}
          products={products}
          filters={listing.filters}
          priceRange={listing.priceRange}
          footer={complete ? null : <ShowMore query={query} shown={products.length} total={total} />}
        />
      )}
    </div>
  )
}
