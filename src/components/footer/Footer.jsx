import FooterDeals from './FooterDeals'
import FooterNewsletter from './FooterNewsletter'
import FooterMenu from './FooterMenu'
import FooterContact from './FooterContact'
import FooterCopyright from './FooterCopyright'
import Icon from '../ui/Icon'
import '../../styles/footer.css'
import { useIsDesktop } from '../../hooks/useMediaQuery'

const P = 'd1tiendas-commons-components-1-x-'

export default function Footer() {
  const isDesktop = useIsDesktop()

  return (
    <>
      <div className="vtex-store-footer-2-x-footerLayoutSpacer flex flex-grow-1" />
      <footer className="vtex-store-footer-2-x-footerLayout">
        <div className={`${P}containerLayout ${P}containerLayout--footer-menu flex flex-column items-center`}>
          <section className={`${P}content_footer`}>
            <FooterDeals />
            <FooterNewsletter />
            <div className="d1-footer-gap" aria-hidden="true" />
            {isDesktop ? (
              <div
                className={`${P}containerLayout ${P}containerLayout--footer-menu ${P}containerLayout--max-width ${P}containerLayout--section-space-left ${P}containerLayout--section-space-right ${P}containerLayout--sanity flex justify-between pa4`}
              >
                <FooterContact />
                <FooterMenu />
              </div>
            ) : (
              <>
                <div aria-label="Logotipo de la empresa" className={`${P}containerLayout flex w-100 ph4 ph0-ns`}>
                  <Icon id="bnd-logo" size={50} />
                </div>
                <FooterMenu />
                <FooterContact />
              </>
            )}
          </section>
        </div>
        <FooterCopyright />
      </footer>
    </>
  )
}
