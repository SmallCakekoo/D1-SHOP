import { useId, useState } from 'react'
import { newsletter } from '../../data/footer'
import AppLink from '../ui/AppLink'

const P = 'd1tiendas-commons-components-1-x-'

export default function FooterNewsletter() {
  const emailId = useId()
  const checkId = useId()
  const [email, setEmail] = useState('')
  const [accepted, setAccepted] = useState(false)
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setEmail('')
    setAccepted(false)
  }

  return (
    <div className={`${P}containerLayout ${P}containerLayout--news-letter ${P}containerLayout--footer ${P}containerLayout--sanity w-100`}>
      <div
        className={`${P}containerLayout ${P}containerLayout--max-width ${P}containerLayout--news-letter ${P}containerLayout--news-letter-content ${P}containerLayout--footer ${P}containerLayout--section-space-left ${P}containerLayout--section-space-right ${P}containerLayout--sanity flex items-center justify-between flex-column flex-row-ns pb6 pb0-ns`}
      >
        <div className={`${P}containerImage ${P}containerImage--news-letter ${P}containerImage--sanity`}>
          <img
            src={newsletter.image}
            alt=""
            loading="lazy"
            className={`${P}imageElement vtex-store-components-3-x-imageElement`}
          />
        </div>
        <div className={`${P}containerLayout ${P}containerLayout--news-letter ${P}containerLayout--sanity flex flex-column w-100 mt6 mt0-ns`}>
          <form className={`${P}newsletterForm`} onSubmit={onSubmit}>
            <div className={`${P}containerLayout ${P}containerLayout--newsletter-form-content ${P}containerLayout--sanity flex flex-column`}>
              <section className={`${P}renderWrapper ${P}renderWrapper--newsletter-message ${P}renderWrapper--sanity sanity`}>
                <div className={`${P}container flex tl items-center justify-center t-body c-on-base`}>
                  <div className={`${P}wrapper`}>
                    <h4 className={`${P}heading t-heading-4 ${P}headingLevel4 vtex-rich-text-0-x-heading-level-4`}>
                      Suscríbete <span className={`b ${P}strong`}>Déjanos tu correo y recibe promociones únicas</span>
                    </h4>
                  </div>
                </div>
              </section>
              <div
                className={`${P}containerLayout ${P}containerLayout--newsletter-content-form-input ${P}containerLayout--newsletter-content-form-input-container ${P}containerLayout--sanity flex flex-row pb5`}
              >
                <div className={`${P}emailInputContainer`}>
                  <label className="vtex-input w-100">
                    <div className="vtex-input-prefix__group flex flex-row items-stretch overflow-hidden br2 bw1 b--solid b--muted-4 hover-b--muted-3 h-regular">
                      <input
                        id={emailId}
                        name="newsletter"
                        type="email"
                        required
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => {
                          setSent(false)
                          setEmail(e.target.value)
                        }}
                        className="vtex-styleguide-9-x-input ma0 border-box vtex-styleguide-9-x-hideDecorators vtex-styleguide-9-x-noAppearance br2 w-100 bn outline-0 bg-base c-on-base b--muted-4 hover-b--muted-3 t-body ph5"
                      />
                    </div>
                  </label>
                </div>
                <div className={`${P}formSubmitContainer`}>
                  <button
                    type="submit"
                    className="vtex-button bw1 ba fw5 v-mid relative pa0 lh-solid br2 min-h-regular t-action bg-action-primary b--action-primary c-on-action-primary hover-bg-action-primary hover-b--action-primary hover-c-on-action-primary pointer"
                  >
                    <div className="vtex-button__label flex items-center justify-center h-100 ph6">Suscribirme</div>
                  </button>
                </div>
              </div>
              {sent && (
                <p className="t-small c-action-primary mt0 mb3" role="status">
                  ¡Gracias! Quedaste suscrito a nuestras promociones.
                </p>
              )}
              <div className={`${P}confirmationCheckboxContainer`}>
                <div className="vtex-checkbox__line-container flex items-start relative pointer">
                  <div className="vtex-checkbox__container relative w1 h1 mr3">
                    <input
                      id={checkId}
                      name="newsletter-confirmation"
                      type="checkbox"
                      required
                      checked={accepted}
                      onChange={(e) => setAccepted(e.target.checked)}
                      className="vtex-checkbox__input h1 w1 relative pointer"
                    />
                  </div>
                  <label htmlFor={checkId} className="vtex-checkbox__label w-100 c-on-base pointer">
                    Autorizo de manera previa, expresa e informada a D1 S.A.S. a tratar mis datos personales para las
                    finalidades establecidas en la{' '}
                    <AppLink className={`${P}labelLink ${P}labelLink--first`} href={newsletter.dataAuthorizationHref}>
                      Autorización de Tratamiento de Datos Personales
                    </AppLink>{' '}
                    y de conformidad con la{' '}
                    <AppLink className={`${P}labelLink ${P}labelLink--second`} href={newsletter.dataPolicyHref}>
                      Política de Tratamiento de Datos Personales de D1 S.A.S.
                    </AppLink>
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
