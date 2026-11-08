import Icon from '../ui/Icon'
import NearestStore from '../stores/NearestStore'
import { appLinks, contact, socialLinks } from '../../data/footer'

const P = 'd1tiendas-commons-components-1-x-'

function Title({ children, align = 'tl' }) {
  return (
    <section className={`${P}renderWrapper ${P}renderWrapper--contact-info ${P}renderWrapper--footer ${P}renderWrapper--sanity sanity`}>
      <div className={`${P}container flex ${align} items-start justify-start t-small c-on-base`}>
        <div className={`${P}wrapper`}>
          <p className={`lh-copy ${P}paragraph`}>
            <span className={`b ${P}strong`}>{children}</span>
          </p>
        </div>
      </div>
    </section>
  )
}

function ContactLink({ href, icon, children }) {
  return (
    <li className={`${P}menuItem list ${P}menuItem--isClosed`}>
      <div className={`${P}styledLinkContainer mh6 pv2`}>
        <a href={href} className={`${P}styledLink no-underline pointer t-body c-on-base`}>
          <div className={`${P}styledLinkContent flex justify-between nowrap`}>
            <span className={`${P}styledLinkIcon mh2`}>
              <Icon id={icon} />
            </span>
            {children}
          </div>
        </a>
      </div>
    </li>
  )
}

export default function FooterContact() {
  return (
    <div
      className={`${P}containerLayout ${P}containerLayout--contact-info ${P}containerLayout--sanity flex flex-column w-100 w-auto-ns ph4 ph0-ns pb6 pb0-ns`}
    >
      <div aria-label="Logotipo de la empresa" className={`${P}containerLayout flex w-100 ph4 ph0-ns`}>
        <Icon id="bnd-logo" size={50} />
      </div>

      <div
        aria-label="Información de contacto"
        className={`${P}containerLayout ${P}containerLayout--footer ${P}containerLayout--contact-info-container ${P}containerLayout--sanity`}
      >
        <Title>Atención al cliente</Title>
        <nav className={`${P}menuContainerNav`}>
          <ul className={`${P}menuContainer list flex pl0 mv0 flex-column`}>
            <ContactLink href={contact.phone.href} icon="mpa-phone">
              {contact.phone.label}
            </ContactLink>
            <ContactLink href={contact.email.href} icon="mpa-mail">
              {contact.email.label}
            </ContactLink>
          </ul>
        </nav>
      </div>

      <NearestStore />

      <div
        aria-label="Redes sociales"
        className={`${P}containerLayout ${P}containerLayout--networks-links ${P}containerLayout--sanity flex flex-column flex-row-ns items-center`}
      >
        <Title align="tc">Síguenos</Title>
        <div className={`${P}containerLayout ${P}containerLayout--networks-links-content ${P}containerLayout--sanity flex align-center ml0 ml4-ns`}>
          {socialLinks.map((social) => (
            <div
              key={social.id}
              className={`${P}containerLayout ${P}containerLayout--networks-link ${P}containerLayout--sanity flex items-center`}
            >
              <section className={`${P}renderWrapper ${P}renderWrapper--icon-networks ${P}renderWrapper--sanity sanity`}>
                <a href={social.href} aria-label={social.label} className={`${P}link`}>
                  <div className={`${P}childrenContainer`}>
                    <Icon id={social.id} />
                  </div>
                </a>
              </section>
            </div>
          ))}
        </div>
      </div>

      <div
        aria-label="Descarga nuestra aplicación"
        className={`${P}containerLayout ${P}containerLayout--download-app-container ${P}containerLayout--sanity flex flex-row flex-column-ns`}
      >
        <Title>Descarga nuestra app</Title>
        <div className={`${P}containerLayout ${P}containerLayout--download-app ${P}containerLayout--sanity flex w-70 w-auto-ns items-center justify-center justify-start-ns`}>
          {appLinks.map((app) => (
            <a key={app.label} href={app.href} aria-label={app.label} className={`${P}link`}>
              <div className={`${P}childrenContainer`}>
                <div className={`${P}containerImage`}>
                  <img
                    src={app.image}
                    alt={app.alt}
                    loading="lazy"
                    style={{ maxHeight: 31 }}
                    className={`${P}imageElement vtex-store-components-3-x-imageElement`}
                  />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
