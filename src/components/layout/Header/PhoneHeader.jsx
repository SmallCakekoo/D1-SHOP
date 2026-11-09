import { Link, useLocation, useNavigate } from 'react-router-dom'
import Icon from '../../ui/Icon'
import { ArrowLeftIcon, CartOutlineIcon } from '../../ui/InlineIcons'
import SearchBar from './SearchBar'
import { useCart } from '../../../context/useCart'
import '../../../styles/encabezado-movil.css'

const money = (n) => (n > 0 ? `$${n.toLocaleString('es-CO')}` : '$0.00')

// Encabezado del teléfono (≤ 768 px): una sola fila fija con logo, buscador y carrito con su total.
// En la página de producto el logo se cambia por la flecha de volver (el inicio sigue en la barra inferior).
// El selector de dirección y los accesos secundarios (Tiendas, Mis listas, Perfil) viven en la barra inferior.
export default function PhoneHeader({ conVolver = false }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { count, total, openCart } = useCart()

  // Si se llegó directo a la página (sin historial dentro de la tienda), volver lleva al inicio.
  const volver = () => (location.key !== 'default' ? navigate(-1) : navigate('/'))

  return (
    <header className="d1-phone-header">
      <div className="d1-phone-header__row">
        {conVolver ? (
          <button type="button" className="d1-phone-header__back" aria-label="Volver" onClick={volver}>
            <ArrowLeftIcon width={24} height={24} />
          </button>
        ) : (
          <Link to="/" className="d1-phone-header__logo" aria-label="Ir al inicio">
            <Icon id="bnd-logo" size={40} />
          </Link>
        )}
        <div className="d1-phone-header__search">
          <SearchBar id="search-input-phone" />
        </div>
        <button type="button" className="d1-phone-header__cart" aria-label={`Carrito, ${count} productos`} onClick={openCart}>
          <span className="d1-phone-header__cart-icon">
            <CartOutlineIcon width={26} height={26} />
            {count > 0 && <span className="d1-phone-header__badge">{count}</span>}
          </span>
          <span className="d1-phone-header__total">{money(total)}</span>
        </button>
      </div>
    </header>
  )
}
