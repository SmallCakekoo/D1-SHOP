import Slider from '../ui/Slider'
import ProductCard from './ProductCard'
import { asset } from '../../utils/asset'
import { seMuestraEn } from '../../utils/stock'
import AppLink from '../ui/AppLink'

const P = 'd1tiendas-commons-components-1-x-'
const BREAKPOINTS = [[0, 2], [768, 3], [1024, 4]]

export default function ProductShelf({ shelf, contexto = 'home' }) {
  // Pulido 3: la portada no muestra productos agotados (regla en utils/stock.js).
  const products = shelf.products.filter((p) => seMuestraEn(p.href, contexto))
  if (products.length === 0) return null
  const title = `${shelf.titleLead} ${shelf.titleStrong}`

  return (
    <div className={`${P}containerLayout ${P}containerLayout--sanity`}>
      <div
        aria-label={title}
        className={`${P}containerLayout ${P}containerLayout--max-width ${P}containerLayout--shelf ${P}containerLayout--section-space-top ${P}containerLayout--section-space-bottom ${P}containerLayout--sanity w-100`}
      >
        <div className={`${P}containerLayout ${P}containerLayout--shelf-header ${P}containerLayout--sanity flex w-100 justify-between items-center pb7 section-space-left section-space-right`}>
          <section className={`${P}renderWrapper ${P}renderWrapper--title-mix-colors ${P}renderWrapper--sanity sanity`}>
            <div className={`${P}container flex tl items-start justify-start t-body c-on-base`}>
              <div className={`${P}wrapper`}>
                <p className={`lh-copy ${P}paragraph`}>
                  {shelf.titleLead} <span className={`b ${P}strong`}>{shelf.titleStrong}</span>
                </p>
              </div>
            </div>
          </section>
          <section className={`${P}renderWrapper ${P}renderWrapper--section-link ${P}renderWrapper--view-all ${P}renderWrapper--sanity sanity`}>
            <AppLink href={shelf.seeMoreHref} className={`${P}link`}>
              <span className={`${P}label`}>{shelf.seeMoreLabel}</span>
            </AppLink>
          </section>
        </div>

        <div className={`${P}containerLayout ${shelf.image ? `${P}containerLayout--shelf-with-image` : ''} ${P}containerLayout--sanity flex flex-column flex-row-ns w-100 justify-between items-center items-start-ns`}>
          {shelf.image && (
            <div className={`${P}containerImage`}>
              <AppLink href={shelf.imageHref} className={`${P}imageElementLink vtex-store-components-3-x-imageElementLink`}>
                <img
                  src={asset(shelf.image)}
                  alt={shelf.imageAlt}
                  title={shelf.imageAlt}
                  className={`${P}imageElement vtex-store-components-3-x-imageElement`}
                />
              </AppLink>
            </div>
          )}
          <div className={`${P}containerLayout ${P}containerLayout--wrapperSlider ${P}containerLayout--sanity`}>
            <Slider id={shelf.id} breakpoints={BREAKPOINTS}>
              {products.map((product) => (
                <ProductCard key={product.href} product={product} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  )
}
