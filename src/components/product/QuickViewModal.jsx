import { useEffect, useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'
import Icon from '../ui/Icon'
import ProductGallery from './ProductGallery'
import ProductInfo from './ProductInfo'
import { productDetails } from '../../data/productDetails'
import { asset } from '../../utils/asset'
import { productPath } from '../../utils/links'

const P = 'd1tiendas-commons-components-1-x-'
const STACK = 'vtex-stack-layout-0-x-'

// El PLU de D1 es el número final de la URL del producto ("...-12008569/p").
const pluFrom = (href) => (String(href).match(/(\d{6,9})(?:\/p)?$/) || [])[1]

// Vista rápida: la misma información de la página de producto dentro de un modal.
export default function QuickViewModal({ product, onClose }) {
  const closeRef = useRef(null)

  // Si tenemos el detalle completo (más fotos, PLU, precio por unidad) lo usamos; si no, lo que muestra la tarjeta.
  const detail = useMemo(() => {
    const path = productPath(product.href)
    const full = path ? productDetails[path] : null
    return {
      name: full?.name ?? product.name,
      brand: full?.brand ?? product.brand,
      plu: full?.plu ?? pluFrom(product.href),
      price: full?.price ?? product.price,
      pum: full?.pum,
      href: product.href,
      images: full?.images ?? [asset(product.image).replace('-197-197', '-800-800').replace('width=197&height=197', 'width=800&height=800')],
    }
  }, [product])

  useEffect(() => {
    const previous = document.activeElement
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      previous?.focus?.()
    }
  }, [onClose])

  return createPortal(
    <div
      className="styles_overlay__CLSq- vtex-modal__overlay"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Vista rápida: ${detail.name}`}
        className="styles_modal__gNwvD vtex-modal__modal br2 w-100 vtex-styleguide-9-x-mh100 flex flex-column"
        style={{ padding: 0 }}
      >
        <div className="flex justify-content relative pv5 pv6-ns pl6 pr8 pl8-ns vtex-styleguide-9-x-shadowTransition">
          <span className="f3 c-on-base w-100">
            <span className={`${P}modalQuickView__title ${P}modal__title`} />
          </span>
          <button
            ref={closeRef}
            type="button"
            aria-label="Cerrar vista rápida"
            className="vtex-modal__close-icon absolute top-0 right-0 pa5 pa6-ns pointer ml-auto items-center flex bn bg-transparent"
            onClick={onClose}
          >
            <Icon id="sti-close--line" size={18} />
          </button>
        </div>

        <div className="ph6 ph8-ns overflow-auto flex-shrink-1 flex-grow-1 pb8 vtex-styleguide-9-x-scrollBar">
          <div className={`${P}productContext ${P}productContext--available`}>
            <div
              className={`${P}containerLayout ${P}containerLayout--pdp-container-main ${P}containerLayout--quick-view flex flex-column flex-row-ns justify-between items-start`}
            >
              <div className={`${P}containerLayout ${P}containerLayout--product-images-quick-view flex w-100 w-50-ns`}>
                <div className={`${STACK}stackContainer relative`} role="group" aria-label="Sección flotante">
                  <div className={`${STACK}stackItem ${STACK}stackItem--first ${STACK}stackItem--mobile`}>
                    <ProductGallery images={detail.images} name={detail.name} />
                  </div>
                  {product.tags?.length > 0 && (
                    <div
                      className={`${STACK}stackItem absolute top-0 left-0 w-auto h-auto ${STACK}stackItem--product-summary-tag-colors`}
                    >
                      <div className={`${P}containerLayout ${P}containerLayout--product-summary-tag-colors flex items-center`}>
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
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <ProductInfo product={detail} onAdded={onClose} />
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
