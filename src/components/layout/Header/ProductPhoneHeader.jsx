import { useLocation, useNavigate } from 'react-router-dom'
import Icon from '../../ui/Icon'
import { ArrowLeftIcon } from '../../ui/InlineIcons'
import SearchBar from './SearchBar'
import CoverageButton from './CoverageButton'
import { useCart } from '../../../context/useCart'
import '../../../styles/producto-movil.css'

const money = (n) => (n > 0 ? `$${n.toLocaleString('es-CO')}` : '$0.00')

// Encabezado compacto y fijo de la página de producto en el teléfono: volver, buscador y total del carrito.
export default function ProductPhoneHeader() {
  const navigate = useNavigate()
  const location = useLocation()
  const { count, total, openCart } = useCart()

  // Si se llegó directo a la página (sin historial dentro de la tienda), volver lleva al inicio.
  const volver = () => (location.key !== 'default' ? navigate(-1) : navigate('/'))

  return (
    <header className="d1-pdp-header">
      <div className="d1-pdp-header__row">
        <button type="button" className="d1-pdp-header__back" aria-label="Volver" onClick={volver}>
          <ArrowLeftIcon width={24} height={24} />
        </button>
        <div className="d1-pdp-header__search">
          <SearchBar id="search-input-pdp" />
        </div>
        <button type="button" className="d1-pdp-header__cart" aria-label={`Carrito, ${count} productos`} onClick={openCart}>
          <span className="d1-pdp-header__cart-icon">
            <Icon id="hpa-cart" size={24} />
            {count > 0 && <span className="d1-pdp-header__badge">{count}</span>}
          </span>
          <span className="d1-pdp-header__total">{money(total)}</span>
        </button>
      </div>
      <CoverageButton mobile />
    </header>
  )
}
