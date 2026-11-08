import { Link } from 'react-router-dom'
import Icon from '../ui/Icon'

const B = 'vtex-breadcrumb-1-x-'
const LINK = 'dib pv1 link ph2 c-muted-2 hover-c-link'

export default function Breadcrumb({ trail, current }) {
  return (
    <div className="d1tiendas-commons-components-1-x-containerLayout d1tiendas-commons-components-1-x-containerLayout--product-breadcrumb">
      <nav aria-label="Ruta de navegación" className={`${B}container ${B}container--product pv3`}>
        <Link to="/" aria-label="Inicio" className={`${B}link ${B}link--product ${B}homeLink ${B}homeLink--product ${LINK} v-mid`}>
          <Icon id="nav-home" />
        </Link>
        {trail.map((item, i) => (
          <span key={item.href} className={`${B}arrow ${B}arrow--product ${B}arrow--${i + 1} ph2 c-muted-2`}>
            <Icon id="nav-caret--right" size={8} className="vtex-breadcrumb-1-x-caretIcon" />
            <a href={item.href} className={`${B}link ${B}link--product ${B}link--${i + 1} ${LINK}`}>
              {item.label}
            </a>
          </span>
        ))}
        <span className={`${B}arrow ${B}arrow--product ${B}termArrow ${B}termArrow--product ph2 c-muted-2`}>
          <Icon id="nav-caret--right" size={8} className="vtex-breadcrumb-1-x-caretIcon" />
        </span>
        <span className={`${B}term ${B}term--product ph2 c-on-base`}>{current}</span>
      </nav>
    </div>
  )
}
