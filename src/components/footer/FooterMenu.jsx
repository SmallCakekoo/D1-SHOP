import { useId, useState } from 'react'
import Icon from '../ui/Icon'
import { footerGroups } from '../../data/footer'
import { useIsDesktop } from '../../hooks/useMediaQuery'

const P = 'd1tiendas-commons-components-1-x-'

function Title({ children }) {
  return (
    <section className={`${P}renderWrapper ${P}renderWrapper--footer ${P}renderWrapper--sanity sanity`}>
      <div className={`${P}container flex tl items-start justify-start t-small c-on-base`}>
        <div className={`${P}wrapper`}>
          <p className={`lh-copy ${P}paragraph`}>
            <span className={`b ${P}strong`}>{children}</span>
          </p>
        </div>
      </div>
    </section>
  )
}

export function FooterLinks({ links }) {
  return (
    <nav className={`${P}menuContainerNav`}>
      <ul className={`${P}menuContainer list flex pl0 mv0 flex-column`}>
        {links.map((link) => (
          <li key={link.href} className={`${P}menuItem list ${P}menuItem--isClosed`}>
            <div className={`${P}styledLinkContainer mh6 pv2`}>
              <a href={link.href} className={`${P}styledLink no-underline pointer t-body c-on-base`}>
                <div className={`${P}styledLinkContent flex justify-between nowrap`}>{link.label}</div>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function Accordion({ group }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  const state = open ? 'visible' : 'hidden'

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        className={`${P}trigger ${P}trigger--${state}`}
        onClick={() => setOpen((v) => !v)}
      >
        <Title>{group.title}</Title>
        <Icon id={open ? 'hpa-up-arrow' : 'hpa-down-arrow'} size={16} />
      </button>
      <div id={id} hidden={!open} className={`${P}content ${P}content--${state}`}>
        <FooterLinks links={group.links} />
      </div>
    </>
  )
}

export default function FooterMenu() {
  const isDesktop = useIsDesktop()

  if (isDesktop) {
    // En escritorio las columnas van como hermanas del bloque de contacto, siempre abiertas.
    return footerGroups.map((group) => (
      <div
        key={group.title}
        className={`${P}containerLayout ${P}containerLayout--footer ${P}containerLayout--column ${P}containerLayout--sanity`}
      >
        <Title>{group.title}</Title>
        <FooterLinks links={group.links} />
      </div>
    ))
  }

  return (
    <div
      aria-label="Menú de navegación del pie de página"
      className={`${P}containerLayout ${P}containerLayout--footer ${P}containerLayout--sanity flex flex-column w-100 mb4 ph4`}
    >
      {footerGroups.map((group) => (
        <Accordion key={group.title} group={group} />
      ))}
    </div>
  )
}
