import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../ui/Icon'
import QuickViewModal from '../product/QuickViewModal'
import Price from '../ui/Price'
import { asset } from '../../utils/asset'
import { productPath } from '../../utils/links'
import { useCart } from '../../context/useCart'

const S = 'vtex-product-summary-2-x-'
const P = 'd1tiendas-commons-components-1-x-'
const STACK = 'vtex-stack-layout-0-x-'
const LIST = 'd1tiendas-shopping-list-0-x-AddToMyListButton'
const ROUND = 'pointer w2 h2 bn br-100 bg-white pa0 flex justify-center items-center'

// Capa flotante del stack (etiquetas, insignias, botones) con las clases del tema original.
function StackLayer({ name, z, children }) {
  return (
    <div
      className={`${STACK}stackItem ${STACK}stackItem--stack-prodsum absolute top-0 left-0 w-auto h-auto ${STACK}stackItem--${name} ${STACK}stackItem--stack-prodsum--${name}`}
      style={{ zIndex: z }}
    >
      {children}
    </div>
  )
}

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const [inList, setInList] = useState(false)
  const [favorite, setFavorite] = useState(false)
  const [quickView, setQuickView] = useState(false)

  const closeQuickView = useCallback(() => setQuickView(false), [])

  const stop = (handler) => (e) => {
    e.preventDefault()
    e.stopPropagation()
    handler()
  }

  return (
    <section
      aria-label={product.name}
      className={`${S}container ${S}container--shelf ${S}containerNormal ${S}containerNormal--shelf br3 h-100 w-100 flex flex-column justify-between center tc overflow-hidden`}
      style={{ maxWidth: 300 }}
    >
      <Link
        to={productPath(product.href) ?? '/'}
        aria-label={product.name}
        className={`${S}clearLink ${S}clearLink--shelf h-100 flex flex-column`}
      >
        <article className={`${S}element ${S}element--shelf pointer pt3 pb4 flex flex-column h-100`}>
          <div className={`${P}productContext ${P}productContext--available`}>
            <div
              role="group"
              aria-label="Sección flotante"
              className={`${STACK}stackContainer ${STACK}stackContainer--stack-prodsum relative`}
            >
              <div
                className={`${STACK}stackItem ${STACK}stackItem--stack-prodsum ${STACK}stackItem--first ${STACK}stackItem--stack-prodsum--first`}
                style={{ zIndex: 1 }}
              >
                <div className={`${S}imageContainer ${S}imageWrapper db w-100 center`}>
                  <div className="vtex-store-components-3-x-discountContainer relative dib">
                    <div className={`dib relative ${S}imageContainer ${S}imageStackContainer ${S}hoverEffect`}>
                      <img
                        src={asset(product.image)}
                        alt={product.name}
                        loading="lazy"
                        className={`${S}imageNormal ${S}image`}
                        style={{ width: '100%', height: 197, objectFit: 'contain', maxHeight: 'unset', maxWidth: 197 }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <StackLayer name="product-summary-tag-colors" z={2}>
                <div className={`${P}containerLayout ${P}containerLayout--product-summary-tag-colors flex items-center`}>
                  {product.tags?.length > 0 && (
                    <div className={`flex w-100 flex-wrap ${P}containerTagColors ${P}containerTagColors--product-summary-tags-colors`}>
                      {product.tags.map((tag) => (
                        <div
                          key={tag.name}
                          className={`${P}tagColor ${P}tagColor--product-summary-tags-colors ${P}tagColor-${tag.name} ${P}tagColor--product-summary-tags-colors-${tag.name}`}
                        >
                          <img src={tag.image} alt={tag.name} width="50" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </StackLayer>

              <StackLayer name="product-summary-express-unavailable-badge" z={3}>
                <div
                  className={`${P}containerLayout ${P}containerLayout--product-summary-express-unavailable-badge flex items-center`}
                />
              </StackLayer>

              <StackLayer name="product-summary-buttons" z={4}>
                <div className={`${P}containerLayout ${P}containerLayout--product-summary-buttons flex items-center`}>
                  <button
                    type="button"
                    title="Abrir vista rápida"
                    className={`${P}quickViewButton ${ROUND}`}
                    onClick={stop(() => setQuickView(true))}
                  >
                    <Icon id="hpa-quickview" size={16} className="vtex-store-link-0-x-icon--quickview" />
                    <span className="dn">Abrir</span>
                  </button>
                  <button
                    type="button"
                    title="Agregar a lista"
                    aria-pressed={inList}
                    className={`${LIST} ${ROUND}`}
                    onClick={stop(() => setInList((v) => !v))}
                  >
                    <Icon
                      id={inList ? 'hpa-shoppinglist-active' : 'hpa-shoppinglist'}
                      size={16}
                      className="vtex-store-link-0-x-icon--shoppinglist"
                    />
                    <span className="dn">Agregar a lista</span>
                  </button>
                  <button
                    type="button"
                    title="Agregar a favoritos"
                    aria-pressed={favorite}
                    className={`${LIST} ${ROUND}`}
                    onClick={stop(() => setFavorite((v) => !v))}
                  >
                    <Icon
                      id={favorite ? 'hpa-wishlist-active' : 'hpa-wishlist'}
                      size={16}
                      className="vtex-store-link-0-x-icon--wishlist"
                    />
                    <span className="dn">Agregar a favoritos</span>
                  </button>
                </div>
              </StackLayer>
            </div>

            <div className={`${P}containerLayout ${P}containerLayout--product-info mt3 flex flex-column items-start`}>
              <div className={`${S}productBrandContainer`}>
                <span className={`${S}productBrandName`}>{product.brand}</span>
              </div>
              <div className={`${S}nameContainer flex items-start justify-center pv6`}>
                <h3 className={`${S}productNameContainer mv0 ${S}nameWrapper overflow-hidden c-on-base f5`}>
                  <span className={`${S}productBrand ${S}brandName t-body`}>{product.name}</span>
                </h3>
              </div>
              <div
                className={`${P}containerLayout ${P}containerLayout--product-summary-highlights flex w-100 items-center scroll-invisible`}
              />
              <div className={`${P}containerLayout ${P}containerLayout--product-summary-price flex flex-column items-start justify-start`}>
                <div className={`${P}containerLayout ${P}containerLayout--summary-discount flex items-center justify-start`} />
                <div className={`${P}containerLayout ${P}containerLayout--summary-prices-savings flex items-center justify-start`}>
                  <Price value={product.price} />
                </div>
              </div>
              <div
                className={`${P}customAddToCartButton ${P}customAddToCartButton--card-summary ${P}customAddToCartButton--agregar ${P}customAddToCartButton--card-summary--agregar ${P}customAddToCartButtonModal ${P}customAddToCartButtonModal--card-summary w-100`}
              >
                <button
                  type="button"
                  className="bg-action-primary b--action-primary c-on-action-primary pointer w-100 vtex-button bw1 ba fw5 v-mid relative pa0 lh-solid br2 min-h-regular t-action"
                  onClick={stop(() => addItem(product))}
                >
                  <div className="vtex-button__label flex items-center justify-center h-100 ph6 w-100 border-box">Agregar</div>
                </button>
              </div>
            </div>
          </div>
        </article>
      </Link>
      {/* Fuera del Link: los clics dentro del modal no deben navegar a la página del producto. */}
      {quickView && <QuickViewModal product={product} onClose={closeQuickView} />}
    </section>
  )
}
