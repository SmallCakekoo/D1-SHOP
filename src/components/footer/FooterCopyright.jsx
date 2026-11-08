import { paymentMethodsImage } from '../../data/footer'

const P = 'd1tiendas-commons-components-1-x-'
const R = 'vtex-rich-text-0-x-'
const YEAR = new Date().getFullYear()

export default function FooterCopyright() {
  return (
    <div className={`${P}containerLayout ${P}containerLayout--copyright ${P}containerLayout--footer w-100`}>
      <div
        className={`${P}containerLayout ${P}containerLayout--max-width ${P}containerLayout--copyright-content ${P}containerLayout--footer ${P}containerLayout--section-space-left ${P}containerLayout--section-space-right flex items-center justify-between flex-column flex-row-ns pa4`}
      >
        <section className={`${P}renderWrapper ${P}renderWrapper--copyright ${P}renderWrapper--footer sanity`}>
          <div className={`${P}container ${P}container--copyright ${P}container--footer flex tl items-start justify-start t-small c-on-base`}>
            <div className={`${P}wrapper ${P}wrapper--copyright ${P}wrapper--footer`}>
              <p className={`lh-copy ${P}paragraph ${P}paragraph--copyright ${P}paragraph--footer`}>
                <span className={`b ${P}strong ${P}strong--copyright ${P}strong--footer`}>
                  {YEAR} © D1
                </span>
              </p>
            </div>
          </div>
        </section>
        <div className={`${P}containerLayout ${P}containerLayout--payments ${P}containerLayout--footer flex items-center justify-between flex-column flex-row-ns`}>
          <div className={`${R}container ${R}container--payments ${R}container--footer flex tc items-start justify-start t-small c-on-base`}>
            <div className={`${R}wrapper ${R}wrapper--payments ${R}wrapper--footer`}>
              <p className={`lh-copy ${R}paragraph ${R}paragraph--payments ${R}paragraph--footer`}>
                <span className={`b ${R}strong ${R}strong--payments ${R}strong--footer`}>Medios de pago</span>
              </p>
            </div>
          </div>
          <div className={`${P}containerImage ${P}containerImage--payment-methods`}>
            <img
              src={paymentMethodsImage}
              alt="Medios de pago"
              loading="lazy"
              className={`${P}imageElement ${P}imageElement--payment-methods vtex-store-components-3-x-imageElement vtex-store-components-3-x-imageElement--payment-methods`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
