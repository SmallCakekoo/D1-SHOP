import { useState } from 'react'
import Icon from '../../ui/Icon'

const S = 'd1tiendas-shipping-coverage-0-x-'

export default function CoverageButton({ mobile = false }) {
  const [address] = useState('')

  return (
    <div className="d1tiendas-commons-components-1-x-containerLayout d1tiendas-commons-components-1-x-containerLayout--coverage-container">
      <div className={`${S}containerCoverage ${mobile ? `${S}containerCoverage--mobile` : ''} flex items-center w-100`}>
        <button
          type="button"
          aria-label="Cambiar dirección de envío"
          className={`${S}btnCoverage bg-transparent pa3 flex items-center justify-start br3 f6 overflow-hidden db pointer`}
        >
          <div className={`${S}btnIconCoverage br-100 flex items-center justify-center`}>
            <Icon id="mpa-stores" className={`${S}iconCoverage`} />
          </div>
          <div className="w-70 flex flex-column">
            <span className={`${S}btnCoverageText t-small tl`}>Dirección de envío</span>
            <span className={`${S}btnCoverageText ${S}btnCoverageText--address b t-small truncate tl mt2`}>
              {address}
            </span>
          </div>
          <div className={`${S}btnIconCoverageInteraction br-100 flex items-center justify-center`}>
            <Icon
              id="nav-arrow-outline--right"
              size={20}
              className={`${S}iconCoverage ${S}iconCoverage--inactive`}
            />
          </div>
        </button>
      </div>
    </div>
  )
}
