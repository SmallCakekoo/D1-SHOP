import Icon from '../ui/Icon'
import { asset } from '../../utils/asset'

export default function RemercaHero() {
  return (
    <div>
      <div className="d1tiendas-commons-components-1-x-containerLayout d1tiendas-commons-components-1-x-containerLayout--remerca-hero d1tiendas-commons-components-1-x-containerLayout--sanity flex flex-column flex-row-ns justify-between items-center pa4 pa7-ns" aria-label="Regala el mercado" role="region">
        <div className="d1tiendas-commons-components-1-x-containerLayout d1tiendas-commons-components-1-x-containerLayout--remerca-hero-content d1tiendas-commons-components-1-x-containerLayout--sanity flex flex-column w-100 w-60-ns pr7-ns">
          <section className="d1tiendas-commons-components-1-x-renderWrapper d1tiendas-commons-components-1-x-renderWrapper--remerca-eyebrow d1tiendas-commons-components-1-x-renderWrapper--sanity sanity">
            <div className="d1tiendas-commons-components-1-x-container flex tl items-start justify-start t-small c-on-base">
              <div className="d1tiendas-commons-components-1-x-wrapper">
                <p className="lh-copy d1tiendas-commons-components-1-x-paragraph">
                  Bono Remerca D1
                </p>
              </div>
            </div>
          </section>
          <section className="d1tiendas-commons-components-1-x-renderWrapper d1tiendas-commons-components-1-x-renderWrapper--remerca-title d1tiendas-commons-components-1-x-renderWrapper--navy d1tiendas-commons-components-1-x-renderWrapper--sanity sanity">
            <div className="d1tiendas-commons-components-1-x-container flex tl items-start justify-start t-heading-1 c-on-base">
              <div className="d1tiendas-commons-components-1-x-wrapper">
                <p className="lh-copy d1tiendas-commons-components-1-x-paragraph">
                  Regala el mercado
                </p>
              </div>
            </div>
          </section>
          <section className="d1tiendas-commons-components-1-x-renderWrapper d1tiendas-commons-components-1-x-renderWrapper--remerca-title d1tiendas-commons-components-1-x-renderWrapper--sanity sanity">
            <div className="d1tiendas-commons-components-1-x-container flex tl items-start justify-start t-heading-1 c-action-primary">
              <div className="d1tiendas-commons-components-1-x-wrapper">
                <p className="lh-copy d1tiendas-commons-components-1-x-paragraph">
                  que nunca sobra
                </p>
              </div>
            </div>
          </section>
          <section className="d1tiendas-commons-components-1-x-renderWrapper d1tiendas-commons-components-1-x-renderWrapper--remerca-description d1tiendas-commons-components-1-x-renderWrapper--sanity sanity">
            <div className="d1tiendas-commons-components-1-x-container flex tl items-start justify-start t-body c-on-base">
              <div className="d1tiendas-commons-components-1-x-wrapper">
                <p className="lh-copy d1tiendas-commons-components-1-x-paragraph">
                  Bono Remerca D1 es un{' '}
                  <span className="b d1tiendas-commons-components-1-x-strong">
                    código con saldo prepagado
                  </span>
                  {' '}que se usa como medio de pago en las{' '}
                  <span className="b d1tiendas-commons-components-1-x-strong">
                    tiendas físicas D1
                  </span>
                  . Eliges el monto, pagas en línea y{' '}
                  <span className="b d1tiendas-commons-components-1-x-strong">
                    recibes el código en tu correo para compartirlo
                  </span>
                  {' '}con la persona a la que quieras regalarle mercado. El beneficiario hace su mercado y{' '}
                  <span className="b d1tiendas-commons-components-1-x-strong">
                    presenta el código en caja para su redención
                  </span>
                  {' '}al momento de pagar.
                </p>
              </div>
            </div>
          </section>
          <div className="d1tiendas-commons-components-1-x-containerLayout d1tiendas-commons-components-1-x-containerLayout--remerca-hero-buttons d1tiendas-commons-components-1-x-containerLayout--sanity flex items-center mt5">
            <section className="d1tiendas-commons-components-1-x-renderWrapper d1tiendas-commons-components-1-x-renderWrapper--remerca-cta d1tiendas-commons-components-1-x-renderWrapper--button-link-primary d1tiendas-commons-components-1-x-renderWrapper--sanity sanity">
              <a href="#remerca-comprar" className="d1tiendas-commons-components-1-x-link d1tiendas-commons-components-1-x-buttonLink bw1 fw5 ba v-mid pa0 lh-solid br2 inline-flex items-center no-underline bg-action-primary b--action-primary c-on-action-primary hover-bg-action-primary hover-b--action-primary hover-c-on-action-primary min-h-regular t-action">
                <span className="d1tiendas-commons-components-1-x-label w-100 tc ph6">
                  Arma tu compra
                </span>
              </a>
            </section>
            <section className="d1tiendas-commons-components-1-x-renderWrapper d1tiendas-commons-components-1-x-renderWrapper--remerca-cta d1tiendas-commons-components-1-x-renderWrapper--button-link-secondary d1tiendas-commons-components-1-x-renderWrapper--sanity sanity">
              <a href="#preguntas-frecuentes" className="d1tiendas-commons-components-1-x-link d1tiendas-commons-components-1-x-buttonLink bw1 fw5 ba v-mid pa0 lh-solid br2 inline-flex items-center no-underline bg-action-primary b--action-primary c-on-action-primary hover-bg-action-primary hover-b--action-primary hover-c-on-action-primary min-h-regular t-action">
                <span className="d1tiendas-commons-components-1-x-label w-100 tc ph6">
                  Preguntas frecuentes
                </span>
              </a>
            </section>
          </div>
          <div className="d1tiendas-commons-components-1-x-containerLayout d1tiendas-commons-components-1-x-containerLayout--remerca-hero-badges d1tiendas-commons-components-1-x-containerLayout--sanity flex items-center mt6">
            <div className="d1tiendas-commons-components-1-x-containerLayout d1tiendas-commons-components-1-x-containerLayout--remerca-badge d1tiendas-commons-components-1-x-containerLayout--sanity flex items-center">
              <Icon id="hpa-circle-check-big" size={16} className="remerca-badge-icon sanity" />
              <section className="d1tiendas-commons-components-1-x-renderWrapper d1tiendas-commons-components-1-x-renderWrapper--remerca-badge-text d1tiendas-commons-components-1-x-renderWrapper--sanity sanity">
                <div className="d1tiendas-commons-components-1-x-container flex tl items-start justify-start t-small c-on-base">
                  <div className="d1tiendas-commons-components-1-x-wrapper">
                    <p className="lh-copy d1tiendas-commons-components-1-x-paragraph">
                      Pago seguro en línea
                    </p>
                  </div>
                </div>
              </section>
            </div>
            <div className="d1tiendas-commons-components-1-x-containerLayout d1tiendas-commons-components-1-x-containerLayout--remerca-badge d1tiendas-commons-components-1-x-containerLayout--sanity flex items-center">
              <Icon id="hpa-circle-check-big" size={16} className="remerca-badge-icon sanity" />
              <section className="d1tiendas-commons-components-1-x-renderWrapper d1tiendas-commons-components-1-x-renderWrapper--remerca-badge-text d1tiendas-commons-components-1-x-renderWrapper--sanity sanity">
                <div className="d1tiendas-commons-components-1-x-container flex tl items-start justify-start t-small c-on-base">
                  <div className="d1tiendas-commons-components-1-x-wrapper">
                    <p className="lh-copy d1tiendas-commons-components-1-x-paragraph">
                      Entrega inmediata
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        <div className="d1tiendas-commons-components-1-x-containerLayout d1tiendas-commons-components-1-x-containerLayout--remerca-hero-image d1tiendas-commons-components-1-x-containerLayout--sanity flex justify-center items-center w-100 w-40-ns mt6 mt0-ns br4">
          <div className="d1tiendas-commons-components-1-x-containerImage w-100 br3">
            <img src={asset("img/remerca-6e7a0cdc-e0af16.webp")} alt="Tarjeta Remerca D1" className="d1tiendas-commons-components-1-x-imageElement vtex-store-components-3-x-imageElement" />
          </div>
        </div>
      </div>
    </div>
  )
}
