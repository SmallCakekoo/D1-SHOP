import { Link } from 'react-router-dom'
import Icon from '../ui/Icon'

const B = 'vtex-breadcrumb-1-x-'
const LINK = 'dib pv1 link ph2 c-muted-2 hover-c-link'

export default function CategoryBreadcrumb({ title, to }) {
  return (
    <nav aria-label="Ruta de navegación" className={`${B}container pv3`}>
      <Link to="/" aria-label="Link a la página de inicio" className={`${B}link ${B}homeLink ${LINK} v-mid`}>
        <Icon id="nav-home" size={26} />
      </Link>
      <span className={`${B}arrow ${B}arrow--1 ph2 c-muted-2`}>
        <Icon id="nav-caret--right" size={8} className="vtex-breadcrumb-1-x-caretIcon" />
        <Link to={to} className={`${B}link ${B}link--1 ${LINK}`}>
          {title}
        </Link>
      </span>
    </nav>
  )
}
