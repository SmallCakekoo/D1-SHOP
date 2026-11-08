import { Link, useLocation } from 'react-router-dom'
import { HomeIcon, ListIcon, MenuIcon, StoreIcon, UserIcon } from '../ui/InlineIcons'
import '../../styles/barra-inferior.css'

// Evento que escucha el menú de categorías del encabezado (components/layout/Header/CategoriesMenu.jsx).
export const ABRIR_CATEGORIAS = 'd1:abrir-categorias'

// Barra de navegación inferior fija, solo en móvil (≤ 768 px; en escritorio el CSS la oculta).
export default function BottomNav() {
  const { pathname } = useLocation()
  const activo = (ruta) => pathname === ruta

  const item = (ruta, etiqueta, Icono) => (
    <li>
      <Link to={ruta} className={`d1-bn__item ${activo(ruta) ? 'd1-bn__item--on' : ''}`} aria-current={activo(ruta) ? 'page' : undefined}>
        <Icono width={24} height={24} />
        <span>{etiqueta}</span>
      </Link>
    </li>
  )

  return (
    <nav className="d1-bottom-nav" aria-label="Navegación principal">
      <ul>
        {item('/', 'Inicio', HomeIcon)}
        {item('/account', 'Mis listas', ListIcon)}
        <li className="d1-bn__center">
          <Link to="/tiendas" className={`d1-bn__fab ${activo('/tiendas') ? 'd1-bn__fab--on' : ''}`} aria-current={activo('/tiendas') ? 'page' : undefined}>
            <StoreIcon width={26} height={26} />
            <span>Tiendas</span>
          </Link>
        </li>
        <li>
          <button type="button" className="d1-bn__item" onClick={() => window.dispatchEvent(new Event(ABRIR_CATEGORIAS))}>
            <MenuIcon width={24} height={24} />
            <span>Categorías</span>
          </button>
        </li>
        {item('/login', 'Perfil', UserIcon)}
      </ul>
    </nav>
  )
}
