import { useMemo, useState } from 'react'
import CategoryFilters from './CategoryFilters'
import SortDropdown from './SortDropdown'
import ProductCard from '../home/ProductCard'
import Icon from '../ui/Icon'
import { useIsDesktop } from '../../hooks/useMediaQuery'
import { priceValue } from '../../utils/links'

const P = 'd1tiendas-commons-components-1-x-'
const R = 'vtex-search-result-3-x-'
const SORT_OPTIONS = ['Relevancia', 'Ventas', 'Más reciente', 'Precio más alto', 'Precio más bajo']

// Cambio 6: orden alfabético. Se agrega a las opciones de cualquier listado.
const ALFABETICO = ['Nombre: A a Z', 'Nombre: Z a A']
const porNombre = (a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' })

function applySort(products, sort) {
  if (sort === 'Nombre: A a Z') return [...products].sort(porNombre)
  if (sort === 'Nombre: Z a A') return [...products].sort((a, b) => porNombre(b, a))
  if (sort === 'Precio más alto') return [...products].sort((a, b) => priceValue(b.price) - priceValue(a.price))
  if (sort === 'Precio más bajo') return [...products].sort((a, b) => priceValue(a.price) - priceValue(b.price))
  return products
}

function FilterDrawer({ onClose, count, children }) {
  return (
    <div className="d1-filter-drawer" role="dialog" aria-modal="true" aria-label="Filtros">
      <div className="d1-filter-drawer__header">
        <button type="button" aria-label="Cerrar filtros" className="bn bg-transparent pointer" onClick={onClose}>
          <Icon id="sti-close--line" size={28} />
        </button>
      </div>
      <div className="d1-filter-drawer__body">{children}</div>
      <div className="d1-filter-drawer__footer">
        <button
          type="button"
          className="vtex-button bw1 ba fw5 v-mid relative pa0 lh-solid br2 min-h-regular t-action bg-action-primary b--action-primary c-on-action-primary pointer w-100"
          onClick={onClose}
        >
          <div className="vtex-button__label flex items-center justify-center h-100 ph6">
            Ver {count} {count === 1 ? 'producto' : 'productos'}
          </div>
        </button>
      </div>
    </div>
  )
}

// Listado con filtros, orden y grilla. Lo usan la categoría y los resultados de búsqueda.
// El contenedor padre debe remontarlo (key) cuando cambie la lista de productos.
export default function ProductListing({
  title,
  products,
  filters,
  priceRange,
  sortOptions: sortOptionsProp = SORT_OPTIONS,
  breadcrumb = null,
  footer = null,
}) {
  const isDesktop = useIsDesktop()
  const sortOptions = [...sortOptionsProp, ...ALFABETICO.filter((o) => !sortOptionsProp.includes(o))]
  const [sort, setSort] = useState('Relevancia')
  const [selected, setSelected] = useState({})
  const [price, setPrice] = useState([priceRange.min, priceRange.max])
  const [drawer, setDrawer] = useState(false)

  const visible = useMemo(() => {
    const brands = selected['Marca'] ?? []
    const filtered = products.filter((p) => {
      const value = priceValue(p.price)
      return (brands.length === 0 || brands.includes(p.brand)) && value >= price[0] && value <= price[1]
    })
    return applySort(filtered, sort)
  }, [products, selected, price, sort])

  const toggle = (group, option) =>
    setSelected((current) => {
      const list = current[group] ?? []
      return { ...current, [group]: list.includes(option) ? list.filter((o) => o !== option) : [...list, option] }
    })

  const filterPanel = (
    <CategoryFilters
      filters={filters}
      bounds={priceRange}
      state={{ selected, price }}
      onToggle={toggle}
      onPrice={setPrice}
    />
  )
  const counter = (
    <span>
      {visible.length}{' '}
      <span className={`${R}totalProductsMessage c-muted-2`}>{visible.length === 1 ? 'producto' : 'productos'}</span>
    </span>
  )

  return (
    <>
      <section className="vtex-store-components-3-x-container ph3 ph5-m ph2-xl mw9 center vtex-search-result-3-x-searchResultContainer pt3-m pt5-l">
        <div
          className={`${P}containerLayout ${P}containerLayout--search__result__container ${P}containerLayout--max-width ${P}containerLayout--section-space-left ${P}containerLayout--section-space-right w-100`}
        >
          {breadcrumb}

          <div className={`${P}containerLayout ${P}containerLayout--search__result flex flex-column flex-row-ns`}>
            {isDesktop && (
              <div className={`${P}containerLayout ${P}containerLayout--search__filters ${P}containerLayout--w-100 flex flex-column`}>
                <div className="vtex-sticky-layout-0-x-wrapper vtex-sticky-layout-0-x-wrapper--search__filters--sticky">
                  <div className="vtex-sticky-layout-0-x-container vtex-sticky-layout-0-x-container--search__filters--sticky z-999 relative left-0 right-0">
                    {filterPanel}
                  </div>
                </div>
              </div>
            )}

            <div className={`${P}containerLayout ${P}containerLayout--search__content flex flex-column w-100`}>
              {isDesktop ? (
                <div className={`${P}containerLayout ${P}containerLayout--search__title--desktop flex justify-between`}>
                  <div className={`${P}containerLayout ${P}containerLayout--search__title-col--desktop flex justify-between items-center`}>
                    <h1 className={`${R}galleryTitle--layout t-heading-1`}>{title}</h1>
                    <div className={`${R}totalProducts--layout pv5 ph9 bn-ns bt-s b--muted-5 tc-s tl t-action--small`}>
                      {counter}
                    </div>
                  </div>
                  <SortDropdown options={sortOptions} value={sort} onChange={setSort} />
                </div>
              ) : (
                <>
                  <h1 className={`${R}galleryTitle--layout t-heading-1`}>{title}</h1>
                  <div className={`${P}containerLayout ${P}containerLayout--search__products--order-by flex justify-between pv5`}>
                    <div className={`${R}filters--layout`}>
                      <div className={`${R}filters`}>
                        <div className={`flex items-center justify-center flex-auto h-100 ${R}filtersWrapperMobile`}>
                          <button
                            type="button"
                            className={`${R}filterPopupButton ph3 pv5 mv0 pointer flex justify-center items-center bn`}
                            onClick={() => setDrawer(true)}
                          >
                            <span className={`${R}filterPopupTitle c-on-base t-action--small ml-auto`}>Filtros</span>
                            <span className={`${R}filterPopupArrowIcon ml-auto pl3 pt2`}>
                              <Icon id="mpa-filter-settings" size={16} />
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <SortDropdown options={sortOptions} value={sort} onChange={setSort} />
                  </div>
                  <div className={`${P}containerLayout ${P}containerLayout--search__products--total-products flex`}>
                    <div className={`${R}totalProducts--layout pv5 ph9 bn-ns bt-s b--muted-5 tc-s tl t-action--small`}>
                      {counter}
                    </div>
                  </div>
                </>
              )}

              {visible.length === 0 ? (
                <p className="t-body c-muted-1 pa5">No hay productos que coincidan con los filtros.</p>
              ) : (
                <div className={`${R}gallery ${R}gallery--grid flex flex-row flex-wrap items-stretch bn ph1 na4 pl9-l`}>
                  {visible.map((product) => (
                    <div
                      key={product.href}
                      className={`${R}galleryItem ${R}galleryItem--normal ${R}galleryItem--grid pa4`}
                      style={{ flexBasis: isDesktop ? '25%' : '50%', maxWidth: isDesktop ? '25%' : '50%' }}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              )}
              {footer}
            </div>
          </div>
        </div>
      </section>

      {!isDesktop && drawer && (
        <FilterDrawer count={visible.length} onClose={() => setDrawer(false)}>
          {filterPanel}
        </FilterDrawer>
      )}
    </>
  )
}
