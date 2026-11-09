import { useState } from 'react'
import Icon from '../ui/Icon'

const D = 'vtex-disclosure-layout-1-x-'

export default function ProductDescription({ html, titulo = 'Descripción', abiertaPorDefecto = false }) {
  const [open, setOpen] = useState(abiertaPorDefecto)

  return (
    <div className="d1tiendas-commons-components-1-x-containerLayout flex flex-column pa4">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="product-description"
        className={`${D}trigger ${D}trigger--specifications-pdp`}
        onClick={() => setOpen((v) => !v)}
      >
        <div className="vtex-rich-text-0-x-container vtex-rich-text-0-x-container--specifications-pdp flex tl items-start justify-start t-body c-on-base">
          <div className="vtex-rich-text-0-x-wrapper vtex-rich-text-0-x-wrapper--specifications-pdp">
            <p className="lh-copy vtex-rich-text-0-x-paragraph vtex-rich-text-0-x-paragraph--specifications-pdp">
              {titulo}
            </p>
          </div>
        </div>
        <Icon id={open ? 'hpa-up-arrow' : 'hpa-down-arrow'} size={16} />
      </button>
      <div id="product-description" hidden={!open} className={`${D}content ${D}content--specifications-pdp`}>
        <div className="vtex-store-components-3-x-productDescriptionContainer">
          {/* HTML propio del catálogo (src/data/productDetails.js), no contenido de usuario. */}
          <div
            className="vtex-store-components-3-x-productDescriptionText c-muted-1"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </div>
  )
}
