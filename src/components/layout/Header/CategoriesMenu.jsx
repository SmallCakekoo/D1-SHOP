import { useEffect, useRef, useState } from 'react'
import Icon from '../../ui/Icon'
import { departments } from '../../../data/navigation'
import { ABRIR_CATEGORIAS } from '../BottomNav'

const P = 'd1tiendas-commons-components-1-x-'

export default function CategoriesMenu({ compact = false }) {
  const [open, setOpen] = useState(false)
  const botonRef = useRef(null)

  // La barra inferior móvil abre este menú. Hay dos copias del encabezado al hacer scroll: responde la que se ve.
  useEffect(() => {
    const abrir = () => {
      const r = botonRef.current?.getBoundingClientRect()
      if (r && r.bottom > 0 && r.top < window.innerHeight) setOpen(true)
    }
    window.addEventListener(ABRIR_CATEGORIAS, abrir)
    return () => window.removeEventListener(ABRIR_CATEGORIAS, abrir)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div className={`${P}navigation`}>
      <nav aria-label="Menú principal de categorías">
        <div className="mw9 center">
          <div className={`${P}navigationContainer flex flex-wrap flex-nowrap-l`}>
            <div className={`${P}navigationDepartments`}>
              <button
                ref={botonRef}
                type="button"
                aria-expanded={open}
                aria-label="Categorías"
                aria-controls="desktop-navigation-menu"
                aria-haspopup="true"
                className={`${P}navigationDepartmentsButton pa4 br3 bn ma0 w-100 db pointer bg-white c-on-base b lh-copy flex items-center`}
                onClick={() => setOpen((v) => !v)}
              >
                <Icon id="hpa-hamburguer-menu" size={compact ? 28 : 24} className={`${P}menuIcon`} />
                {!compact && (
                  <span className={`${P}navigationDepartmentsText f5 truncate pl2 dib`}>
                    Categorías
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className={`${P}hoverMenuContainer`}>
          <div
            id="desktop-navigation-menu"
            aria-modal="true"
            aria-label="Menú de categorías"
            className={`fixed z-2 top-0 left-0 right-0 bottom-0 bg-black-60 overflow-hidden ${
              open ? '' : 'dn o-0'
            }`}
          >
            <div className={`${P}navigationHoverMenu z-1 flex h-100`}>
              <div
                className={`${P}navigationContainerMenu w-90 w-40-m w-30-l w-20-xxl bg-white z-1 h-100`}
              >
                <div className={`${P}navigationHeader ma0 pa3 w-100 db b flex items-center justify-between`}>
                  <span id="menu-title" className={`${P}navigationHeader__title f5 fw7`}>
                    Categorías
                  </span>
                  <button
                    type="button"
                    aria-label="Cerrar menú de categorías"
                    className={`${P}closeButton flex items-center w-auto db ma0 bg-transparent lh-title pv0 bn tr pointer`}
                    onClick={() => setOpen(false)}
                  >
                    <Icon id="sti-close--line" size={28} className="vtex-menu-close-icon" />
                  </button>
                </div>
                <ul
                  aria-labelledby="menu-title"
                  className={`${P}navigationHoverMenuContainer flex h-100 flex-column list ma0`}
                >
                  {departments.map((dep) => (
                    <li key={dep.label}className={`${P}navigationMenuItem ma0 w-100 db h-100-ns`}>
                      <button
                        type="button"
                        aria-haspopup="true"
                        className={`${P}navigationMenuItemLink bn c-on-base db w-100 pointer no-underline tl flex items-center pa4 pr2 pl6 lh-title bg-transparent`}
                      >
                        <Icon id={dep.icon} className="vtex-icon-menu--department" />
                        <span className={`${P}navigationMenuItemLinkText dib pl3`}>{dep.label}</span>
                        {dep.hasChildren && (
                          <span className="fs-normal flex-auto tr pr2 f7">
                            <Icon
                              id="nav-thin-caret--right"
                              size={12}
                              className={`${P}navigationMenuItemNavIcon`}
                            />
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                aria-label="Cerrar menú"
                className={`${P}menuOverlay absolute w-100 h-100 z-0 top-0 left-0 right-0 bottom-0`}
                onClick={() => setOpen(false)}
              />
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
