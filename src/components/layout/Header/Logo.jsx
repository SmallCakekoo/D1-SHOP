import { Link } from 'react-router-dom'
import Icon from '../../ui/Icon'

export default function Logo() {
  return (
    <Link
      to="/"
      aria-label="Ir al inicio"
      className="vtex-store-link-0-x-link vtex-store-link-0-x-link--logo-header"
    >
      <div className="vtex-store-link-0-x-childrenContainer vtex-store-link-0-x-childrenContainer--logo-header">
        <Icon id="bnd-logo" size={42} className="vtex-store-icons-0-x-icon--logo" />
      </div>
    </Link>
  )
}
