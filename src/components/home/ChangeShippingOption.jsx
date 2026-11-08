import { useState } from 'react'
import Icon from '../ui/Icon'

const P = 'd1tiendas-commons-components-1-x-'
const S = 'd1tiendas-shipping-coverage-0-x-'

const OPTIONS = [
  { id: 'programado', icon: 'shipping-program', title: 'Envío Programado', text: 'Elige el día / hora y recibelo en casa' },
  { id: 'express', icon: 'shipping-express', title: 'Envío D1 Express', text: 'Recibe en minutos. Hasta 24 productos' },
]

// Selector expandido de tipo de envío (se muestra en la home en móvil).
export default function ChangeShippingOption() {
  const [active, setActive] = useState(null)

  return (
    <div
      className={`${P}containerLayout ${P}containerLayout--max-width ${P}containerLayout--changeShippingOption ${P}containerLayout--section-space-left ${P}containerLayout--section-space-right ${P}containerLayout--sanity`}
    >
      <section className={`${P}renderWrapper ${P}renderWrapper--title-mix-colors ${P}renderWrapper--sanity sanity`}>
        <div className={`${P}container flex tl items-start justify-start t-body c-on-base`}>
          <div className={`${P}wrapper`}>
            <p className={`lh-copy ${P}paragraph`}>
              <span className={`b ${P}strong`}>Selecciona el tipo de envío:</span>
            </p>
          </div>
        </div>
      </section>
      <div className={`${S}changeShippingOptionContainer ${S}changeShippingOptionContainer--expanded w-100 f6 flex`}>
        <div className={`flex pv2 ph4 ${S}changeShippingOptionContent`}>
          <div className="flex items-center">
            <div className={`flex ${S}changeShippingOptionButtons`}>
              {OPTIONS.map(({ id, icon, title, text }) => (
                <div
                  key={id}
                  className={`${S}shippingOptionButton ${S}shippingOptionButton--${id} ${S}shippingOptionButton--initial ${S}shippingOptionButton--expanded ${
                    active === id ? `${S}shippingOptionButton--active` : ''
                  }`}
                >
                  <button
                    type="button"
                    className="bg-transparent b--transparent c-action-primary pointer vtex-button bw1 ba fw5 v-mid relative pa0 lh-solid br2 min-h-regular t-action"
                    onClick={() => setActive(id)}
                  >
                    <div className="vtex-button__label flex items-center justify-center h-100 ph6">
                      <span className="flex items-center nr2">
                        <div className="mr3 nl3 flex items-center">
                          <Icon id={icon} size={id === 'programado' ? 20 : 24} />
                        </div>
                        <div>
                          <div className={`${S}container flex tl items-start justify-start t-body c-on-base`}>
                            <div className={`${S}wrapper`}>
                              <p className={`lh-copy ${S}paragraph`}>
                                <span className={`b ${S}strong`}>{title}</span>
                                <br />
                                {text}
                              </p>
                            </div>
                          </div>
                        </div>
                      </span>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
