import { useState } from 'react'
import Icon from '../../ui/Icon'
import { shippingOptions } from '../../../data/navigation'

const S = 'd1tiendas-shipping-coverage-0-x-'

export default function ShippingOptions() {
  const [active, setActive] = useState(null)

  return (
    <div
      className={`${S}changeShippingOptionContainer ${S}changeShippingOptionContainer--summary w-100 f6 flex`}
    >
      <div className={`flex pv2 ph4 ${S}changeShippingOptionContent`}>
        <div className="flex items-center">
          <div className={`flex ${S}changeShippingOptionButtons`}>
            {shippingOptions.map(({ id, label, icon }) => (
              <div
                key={id}
                className={`${S}shippingOptionButton ${S}shippingOptionButton--${id} ${S}shippingOptionButton--initial ${S}shippingOptionButton--summary ${
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
                        <Icon id={icon} size={16} className={`${S}shippingOptionIconInactive`} />
                      </div>
                      <div>{label}</div>
                    </span>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
