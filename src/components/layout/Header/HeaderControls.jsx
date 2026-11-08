import { useNavigate } from 'react-router-dom'
import Icon from '../../ui/Icon'
import AppLink from '../../ui/AppLink'
import { headerLinks } from '../../../data/navigation'
import { useCart } from '../../../context/useCart'

const L = 'vtex-store-link-0-x-'
const slug = (label) => (label === 'Tiendas' ? 'map' : 'lists')
const BUTTON = 'bg-transparent b--transparent c-action-primary pointer vtex-button bw1 ba fw5 v-mid relative pa0 lh-solid br2 min-h-regular t-action'

function LoginButton() {
  const navigate = useNavigate()
  return (
    <div className="vtex-login-2-x-container flex items-center fr">
      <div className="vtex-login-2-x-buttonLink">
        <button type="button" className={BUTTON} onClick={() => navigate('/login')}>
          <div className="vtex-button__label flex items-center justify-center h-100 ph6">
            <span className="flex items-center nr2">
              <div className="mr3 nl3 flex items-center">
                <div className="gray flex items-center">
                  <Icon id="hpa-profile" size={16} className="vtex-login-2-x-profileIcon vtex-login-2-x-profileIcon--login" />
                </div>
              </div>
              <div>
                <span className="vtex-login-2-x-label t-action--small pl4 gray dn db-l">Perfil</span>
              </div>
            </span>
          </div>
        </button>
      </div>
    </div>
  )
}

function MiniCart() {
  const { count, openCart } = useCart()
  return (
    <aside className="vtex-minicart-2-x-minicartWrapperContainer fr flex items-center">
      <div className="vtex-minicart-2-x-minicartContainer flex flex-column">
        <div className="pa4 pointer vtex-minicart-2-x-openIconContainer">
          <button
            type="button"
            aria-label={`Carrito, ${count} productos`}
            className="vtex-button bw1 ba fw5 v-mid relative pa0 lh-solid br2 min-h-regular t-action icon-button dib bg-transparent b--transparent c-action-primary pointer"
            style={{ fontSize: 0 }}
            onClick={openCart}
          >
            <div className="vtex-button__label flex items-center justify-center h-100 ph4">
              <span className="vtex-minicart-2-x-minicartIconContainer gray relative">
                <Icon id="hpa-cart" className="vtex-minicart-2-x-minicartIcon" />
                {count > 0 && (
                  <span className="vtex-minicart-2-x-minicartQuantityBadge">{count}</span>
                )}
              </span>
            </div>
          </button>
        </div>
      </div>
    </aside>
  )
}

export default function HeaderControls() {
  return (
    <div className="d1tiendas-commons-components-1-x-containerLayout d1tiendas-commons-components-1-x-containerLayout--controls-header flex flex-row items-center">
      {headerLinks.map((link) => (
        <AppLink
          key={link.label}
          href={link.href}
          className={`${L}link ${L}link--${slug(link.label)} ${L}link--header-icon-link`}
        >
          <span className={`${L}label ${L}label--${slug(link.label)} ${L}label--header-icon-link`}>
            {link.label}
          </span>
          <div className={`${L}childrenContainer ${L}childrenContainer--${slug(link.label)} ${L}childrenContainer--header-icon-link`}>
            <Icon id={link.icon} className={`${L}icon--${link.icon === 'hpa-map' ? 'map' : 'shoppinglist'}`} />
          </div>
        </AppLink>
      ))}
      <LoginButton />
      <MiniCart />
    </div>
  )
}
