export default function RemercaCta() {
  return (
    <div>
      <div className="d1tiendas-commons-components-1-x-containerLayout d1tiendas-commons-components-1-x-containerLayout--remerca-cta-banner d1tiendas-commons-components-1-x-containerLayout--sanity flex flex-column flex-row-ns justify-between items-start items-center-ns br3 bg-action-primary" aria-label="Regala mercado en pocos minutos" role="region">
        <div className="d1tiendas-commons-components-1-x-containerLayout d1tiendas-commons-components-1-x-containerLayout--remerca-cta-banner-text d1tiendas-commons-components-1-x-containerLayout--sanity flex flex-column w-100 w-40-ns mb4 mb0-ns">
          <section className="d1tiendas-commons-components-1-x-renderWrapper d1tiendas-commons-components-1-x-renderWrapper--remerca-cta-banner-title d1tiendas-commons-components-1-x-renderWrapper--sanity sanity">
            <div className="d1tiendas-commons-components-1-x-container flex tl items-start justify-start t-heading-3 c-on-base">
              <div className="d1tiendas-commons-components-1-x-wrapper">
                <p className="lh-copy d1tiendas-commons-components-1-x-paragraph">
                  Regala mercado en pocos minutos
                </p>
              </div>
            </div>
          </section>
          <section className="d1tiendas-commons-components-1-x-renderWrapper d1tiendas-commons-components-1-x-renderWrapper--remerca-cta-banner-desc d1tiendas-commons-components-1-x-renderWrapper--sanity sanity">
            <div className="d1tiendas-commons-components-1-x-container flex tl items-start justify-start t-small c-on-base">
              <div className="d1tiendas-commons-components-1-x-wrapper">
                <p className="lh-copy d1tiendas-commons-components-1-x-paragraph">
                  Compra en línea tu Bono ReMerca D1,{' '}
                  <span className="b d1tiendas-commons-components-1-x-strong">
                    recibe el código en tu correo y compártelo.
                  </span>
                  {' '}Quien lo recibe lo redime directamente en caja en{' '}
                  <span className="b d1tiendas-commons-components-1-x-strong">
                    cualquier tienda física D1,
                  </span>
                  {' '}sin apps ni registros. Vigencia de un año desde la emisión del código.
                </p>
              </div>
            </div>
          </section>
        </div>
        <section className="d1tiendas-commons-components-1-x-renderWrapper d1tiendas-commons-components-1-x-renderWrapper--remerca-cta-banner-btn d1tiendas-commons-components-1-x-renderWrapper--sanity sanity">
          <a href="#remerca-comprar" className="d1tiendas-commons-components-1-x-link d1tiendas-commons-components-1-x-buttonLink bw1 fw5 ba v-mid pa0 lh-solid br2 inline-flex items-center no-underline bg-action-primary b--action-primary c-on-action-primary hover-bg-action-primary hover-b--action-primary hover-c-on-action-primary min-h-regular t-action">
            <span className="d1tiendas-commons-components-1-x-label w-100 tc ph6">
              Arma tu compra
            </span>
          </a>
        </section>
      </div>
    </div>
  )
}
