import Price from '../ui/Price'
import ReturnPolicySummary from '../ui/ReturnPolicySummary'
import { estaAgotado } from '../../utils/stock'
import Stars from './Stars'
import '../../styles/agotado.css'
import { useCart } from '../../context/useCart'

const P = 'd1tiendas-commons-components-1-x-'
const V = 'vtex-store-components-3-x-'
const BTN =
  'vtex-button bw1 ba fw5 v-mid relative pa0 lh-solid br2 min-h-regular t-action bg-action-primary b--action-primary c-on-action-primary hover-bg-action-primary hover-b--action-primary hover-c-on-action-primary pointer w-100'

function CartButton({ modifier, label, onClick, disabled }) {
  if (disabled) {
    return (
      <div className="w-100">
        <button type="button" disabled className={`d1-btn-agotado ${BTN.replace('pointer', '')}`}>
          <div className="vtex-button__label flex items-center justify-center h-100 ph6 w-100 border-box">Agotado</div>
        </button>
      </div>
    )
  }
  return (
    <div
      className={`${P}customAddToCartButton ${P}customAddToCartButton--custom-add-to-cart-button-pdp ${P}customAddToCartButton--${modifier} ${P}customAddToCartButtonModal ${P}customAddToCartButtonModal--custom-add-to-cart-button-pdp w-100`}
    >
      <button type="button" className={BTN} onClick={onClick}>
        <div className="vtex-button__label flex items-center justify-center h-100 ph6 w-100 border-box">{label}</div>
      </button>
    </div>
  )
}

// onAdded: se llama después de agregar (la vista rápida lo usa para cerrarse).
export default function ProductInfo({ product, onAdded }) {
  const { addItem, openCart } = useCart()
  const agotado = estaAgotado(product.href)
  const item = {
    name: product.name,
    brand: product.brand,
    href: product.href,
    image: product.images[0],
    price: product.price,
  }

  return (
    <div className={`${P}containerLayout ${P}containerLayout--product-info-pdp flex flex-column w-100 w-50-ns`}>
      <div className={`${P}containerLayout ${P}containerLayout--product-info-pdp-basics flex flex-column w-100`}>
        <div className={`${V}productBrandContainer`}>
          <span className={`${V}productBrandName`}>{product.brand}</span>
        </div>
        <h1 className={`${V}productNameContainer mv0 t-heading-4`}>
          <span className={`${V}productBrand`}>{product.name}</span>
        </h1>
        <Stars href={product.href} link={!onAdded} />
        {product.plu && (
          <span className="vtex-product-identifier-0-x-product-identifier vtex-product-identifier-0-x-product-identifier--skuReferenceId c-muted-1">
            <span className="vtex-product-identifier-0-x-product-identifier__label">PLU</span>
            <span className="vtex-product-identifier-0-x-product-identifier__separator">: </span>
            <span className="vtex-product-identifier-0-x-product-identifier__value">{product.plu}</span>
          </span>
        )}
      </div>

      <div className={`${P}containerLayout ${P}containerLayout--product-info-pdp-shop flex flex-column w-100`}>
        <div className={`${P}containerLayout ${P}containerLayout--product-price flex flex-column items-start justify-start`}>
          <div className={`${P}containerLayout ${P}containerLayout--prices-savings flex items-center justify-start`}>
            <Price value={product.price} />
          </div>
        </div>
        {product.pum && (
          <div className={`flex w-100 ${P}containerPUM`}>
            {product.pum.label}&nbsp;<span className={`${P}PUM__value`}>{product.pum.value}</span>)
          </div>
        )}
        {agotado && (
          <p className="d1-aviso-agotado" role="status">
            Este producto está agotado por ahora. Puedes seguir viendo otros productos.
          </p>
        )}
        <CartButton
          modifier="agregar-al-carrito"
          disabled={agotado}
          label="Agregar al Carrito"
          onClick={() => {
            addItem(item)
            onAdded?.()
          }}
        />
        {!agotado && <CartButton
          modifier="comprar-ahora"
          label="Comprar ahora"
          onClick={() => {
            addItem(item)
            onAdded?.()
            openCart()
          }}
        />}
        <ReturnPolicySummary />
      </div>
    </div>
  )
}
