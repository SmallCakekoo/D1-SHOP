import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import Icon from '../ui/Icon'
import Price from '../ui/Price'
import AppLink from '../ui/AppLink'
import { asset } from '../../utils/asset'
import { useCart } from '../../context/useCart'

const M = 'vtex-minicart-2-x-'
const P = 'd1tiendas-commons-components-1-x-'
const CO = 'd1tiendas-store-checkout-1-x-'
const R = 'vtex-rich-text-0-x-'
const BTN = 'vtex-button bw1 ba fw5 v-mid relative pa0 lh-solid br2 min-h-regular t-action bg-action-primary b--action-primary c-on-action-primary hover-bg-action-primary hover-b--action-primary hover-c-on-action-primary pointer w-100'

const SUGGESTED = [
  { label: 'Despensa', href: 'https://www.d1.com.co/despensa' },
  { label: 'Aseo y limpieza', href: 'https://www.d1.com.co/hogar/aseo-y-limpieza' },
  { label: 'Cuidado personal y belleza', href: 'https://www.d1.com.co/cuidado-personal-y-belleza' },
  { label: 'Mascotas', href: 'https://www.d1.com.co/mascotas' },
  { label: 'Fruver', href: 'https://www.d1.com.co/frutas-y-verduras' },
  { label: 'Temporada', href: 'https://www.d1.com.co/extraordinario-de-temporada' },
]

const money = (n) => `$ ${n.toLocaleString('es-CO')}`

function EmptyState({ onStart }) {
  return (
    <div className={`${M}minicartEmptyStateContainer h-100 flex flex-column justify-center`}>
      <div className={`${P}containerLayout ${P}containerLayout--minicart-empty-container flex flex-column items-center relative ph6`}>
        <Icon id="hpa-cart" size={90} />
        <div className={`${R}container ${R}container--minicart-empty-text flex tc items-center justify-center t-small c-on-base`}>
          <div className={`${R}wrapper ${R}wrapper--minicart-empty-text`}>
            <p className={`lh-copy ${R}paragraph ${R}paragraph--minicart-empty-text`}>
              <span className={`b ${R}strong ${R}strong--minicart-empty-text`}>Tú carrito está vacío... por ahora</span>
            </p>
            <p className={`lh-copy ${R}paragraph ${R}paragraph--minicart-empty-text`}>
              Explora nuestras increíbles ofertas y llena tu carrito con lo que necesitas
            </p>
          </div>
        </div>
        <section className={`${P}highlightContent ${P}highlightContent--minicart-categories`}>
          <div
            aria-label="fila de contenido destacado"
            className={`${P}containerLayout ${P}containerLayout--minicart-categories w-100 pt1 pb2 mb2 flex items-center scroll-invisible`}
          >
            {SUGGESTED.map((item) => (
              <article key={item.label} className={`${P}cardLayout ${P}cardLayout--minicart-categories`}>
                <AppLink
                  href={item.href}
                  className={`${P}cardLayout__content ${P}cardLayout__content--minicart-categories db link`}
                  onClick={onStart}
                >
                  <div className={`${P}container ${P}container--minicart-categories flex tc items-center justify-center t-body c-on-base`}>
                    <div className={`${P}wrapper ${P}wrapper--minicart-categories`}>
                      <p className={`lh-copy ${P}paragraph ${P}paragraph--minicart-categories`}>{item.label}</p>
                    </div>
                  </div>
                </AppLink>
              </article>
            ))}
          </div>
        </section>
      </div>
      <Link
        to="/"
        className="vtex-store-drawer-0-x-closeIconButton vtex-store-drawer-0-x-closeIconButton--empty-button pa4 pointer bg-transparent transparent bn pointer"
        onClick={onStart}
      >
        Empieza a comprar
      </Link>
    </div>
  )
}

function CartLine({ item, onQuantity, onRemove }) {
  return (
    <li className={`${CO}productListItem ${CO}productListItem--bag flex items-center pv4`}>
      <img
        src={asset(item.image)}
        alt={item.name}
        width="64"
        height="64"
        style={{ objectFit: 'contain' }}
        className="mr4"
      />
      <div className="flex flex-column flex-auto">
        <span className="t-small c-muted-1">{item.brand}</span>
        <span className="t-body c-on-base b">{item.name}</span>
        <div className="flex items-center justify-between mt3">
          <div className={`${CO}quantitySelectorWrapperContainer flex items-center`} role="group" aria-label={`Cantidad de ${item.name}`}>
            <button type="button" aria-label="Quitar uno" className="bn bg-transparent pointer ph3 f4 c-action-primary" onClick={() => onQuantity(item.quantity - 1)}>
              −
            </button>
            <span className={`${CO}quantitySelectorWrapperContainerQuantity ph3`} aria-live="polite">
              {item.quantity}
            </span>
            <button type="button" aria-label="Agregar uno" className="bn bg-transparent pointer ph3 f4 c-action-primary" onClick={() => onQuantity(item.quantity + 1)}>
              +
            </button>
          </div>
          <Price value={item.price} />
        </div>
      </div>
      <button type="button" aria-label={`Quitar ${item.name} del carrito`} className={`${CO}deleteIcon bn bg-transparent pointer ml3`} onClick={onRemove}>
        <Icon id="sti-close--line" size={20} />
      </button>
    </li>
  )
}

export default function MiniCart() {
  const { items, count, total, isOpen, closeCart, setQuantity, removeItem } = useCart()

  useEffect(() => {
    if (!isOpen) return undefined
    const onKey = (e) => e.key === 'Escape' && closeCart()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeCart])

  if (!isOpen) return null

  return createPortal(
    <>
      <div className={`${M}overlay`} onClick={closeCart} aria-hidden="true" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 998 }} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Carrito"
        className={`${M}drawer ${M}opened right-0 fixed top-0 bottom-0 bg-base z-999 flex flex-column`}
        style={{ width: '85%', maxWidth: 430, minWidth: 280, zIndex: 999 }}
      >
        <div className={`${M}drawerContent overflow-y-auto`}>
          <div className={`flex ${M}closeIconContainer`}>
            <button type="button" aria-label="Cerrar carrito" className={`${M}closeIconButton pa4 pointer bg-transparent transparent bn pointer`} onClick={closeCart}>
              <Icon id="sti-close--line" size={30} />
            </button>
          </div>
          <div className={`${M}childrenContainer flex flex-grow-1`}>
            <div className={`${M}minicartSideBarContentWrapper flex flex-column w-100 h-100`}>
              <h3 className={`${M}minicartTitle t-heading-3 mv2 ph4 ph6-l c-on-base`}>Carrito</h3>
              {items.length === 0 ? (
                <EmptyState onStart={closeCart} />
              ) : (
                <>
                  <ul className={`${M}minicartProductListContainer list ma0 ph4 ph6-l overflow-y-auto`}>
                    {items.map((item) => (
                      <CartLine
                        key={item.href}
                        item={item}
                        onQuantity={(q) => setQuantity(item.href, q)}
                        onRemove={() => removeItem(item.href)}
                      />
                    ))}
                  </ul>
                  <div className={`${CO}minicartSummary`} style={{ padding: '16px' }}>
                    <div
                      className={`${CO}summaryItemContainer flex justify-between`}
                      style={{ display: 'flex', justifyContent: 'space-between', gap: 12, width: '100%' }}
                    >
                      <span className={`${CO}summaryItemLabel`}>
                        Total ({count} {count === 1 ? 'producto' : 'productos'})
                      </span>
                      <span className={`${CO}summaryItemPrice b`}>{money(total)}</span>
                    </div>
                    <a
                      href="https://www.d1.com.co/checkout#/cart"
                      className={`${CO}minicartCheckoutButton ${BTN} mt4 no-underline flex items-center justify-center`}
                    >
                      <span className="vtex-button__label flex items-center justify-center h-100 ph6">Ir a pagar</span>
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>,
    document.body,
  )
}
