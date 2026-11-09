import { Link } from 'react-router-dom'
import { footerDeals } from '../../data/footer'

const P = 'd1tiendas-commons-components-1-x-'

export default function FooterDeals() {
  return (
    <div className={`${P}containerLayout ${P}containerLayout--deals ${P}containerLayout--footer ${P}containerLayout--sanity w-100 pv9 ph4 ph0-ns`}>
      <div
        className={`${P}containerLayout ${P}containerLayout--max-width ${P}containerLayout--footer-deals-content ${P}containerLayout--section-space-left ${P}containerLayout--section-space-right ${P}containerLayout--sanity center flex flex-column flex-row-ns items-center justify-between pa0 pv4-ns`}
      >
        {footerDeals.map((deal) => (
          <div
            key={deal.title}
            className={`${P}containerLayout ${P}containerLayout--footer-deals--service ${P}containerLayout--sanity flex items-center flex-column`}
          >
            <div className={`${P}containerImage ${P}containerImage--title-mix-colors ${P}containerImage--sanity`}>
              <img
                src={deal.image}
                alt=""
                loading="lazy"
                className={`${P}imageElement vtex-store-components-3-x-imageElement`}
              />
            </div>
            <section className={`${P}renderWrapper sanity`}>
              <div className={`${P}container flex tc items-center justify-center t-body c-on-base`}>
                <div className={`${P}wrapper`}>
                  <p className={`lh-copy ${P}paragraph`}>
                    <span className={`b ${P}strong`}>{deal.title}</span>
                    <br />
                    {deal.text}
                  </p>
                </div>
              </div>
            </section>
            {deal.link && (
              <Link to={deal.link.to} className="d1-deal-link">
                {deal.link.label}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
