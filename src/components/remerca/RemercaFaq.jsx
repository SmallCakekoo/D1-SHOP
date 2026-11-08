import { useId, useState } from 'react'
import Icon from '../ui/Icon'

const P = 'd1tiendas-commons-components-1-x-'

function FaqItem({ question, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()
  const state = open ? 'visible' : 'hidden'

  return (
    <li className={`${P}item`}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        className={`${P}trigger ${P}trigger--${state}`}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={`${P}listContextAccordion__trigger`}>{question}</span>
        <Icon id={open ? 'hpa-minus' : 'hpa-plus'} size={24} className={`${P}listContextAccordion__icon`} />
      </button>
      <div id={id} hidden={!open} className={`${P}content ${P}content--${state}`}>
        {children}
      </div>
    </li>
  )
}

export default function RemercaFaq() {
  return (
    <div>
      <div className="d1tiendas-commons-components-1-x-containerLayout d1tiendas-commons-components-1-x-containerLayout--remerca-faq d1tiendas-commons-components-1-x-containerLayout--sanity flex flex-column pa4 pa7-ns" aria-label="Resolvemos antes de que preguntes" role="region" id="preguntas-frecuentes">
        <section className="d1tiendas-commons-components-1-x-renderWrapper d1tiendas-commons-components-1-x-renderWrapper--faq-label d1tiendas-commons-components-1-x-renderWrapper--sanity sanity">
          <div className="d1tiendas-commons-components-1-x-container flex tc items-center justify-center t-small c-action-primary">
            <div className="d1tiendas-commons-components-1-x-wrapper">
              <p className="lh-copy d1tiendas-commons-components-1-x-paragraph">
                PREGUNTAS FRECUENTES
              </p>
            </div>
          </div>
        </section>
        <section className="d1tiendas-commons-components-1-x-renderWrapper d1tiendas-commons-components-1-x-renderWrapper--faq-title d1tiendas-commons-components-1-x-renderWrapper--navy d1tiendas-commons-components-1-x-renderWrapper--sanity sanity">
          <div className="d1tiendas-commons-components-1-x-container flex tc items-center justify-center t-heading-3 c-on-base">
            <div className="d1tiendas-commons-components-1-x-wrapper">
              <p className="lh-copy d1tiendas-commons-components-1-x-paragraph">
                Resolvemos antes de que preguntes
              </p>
            </div>
          </div>
        </section>
        <section className="d1tiendas-commons-components-1-x-renderWrapper d1tiendas-commons-components-1-x-renderWrapper--faq-subtitle d1tiendas-commons-components-1-x-renderWrapper--sanity sanity">
          <div className="d1tiendas-commons-components-1-x-container flex tc items-center justify-center t-small c-on-base">
            <div className="d1tiendas-commons-components-1-x-wrapper">
              <p className="lh-copy d1tiendas-commons-components-1-x-paragraph">
                ¿Te queda alguna duda que no está aquí? Escríbemos a{' '}
                <a className="d1tiendas-commons-components-1-x-link" href="mailto:atencion.cliente@d1.com.co">
                  atencion.cliente@d1.com.co
                </a>
                .
              </p>
            </div>
          </div>
        </section>
        <section className="d1tiendas-commons-components-1-x-renderWrapper d1tiendas-commons-components-1-x-renderWrapper--faq-info__list d1tiendas-commons-components-1-x-renderWrapper--sanity sanity">
          <ul className="d1tiendas-commons-components-1-x-list">
            <FaqItem question={"¿Cuál es la diferencia entre un solo bono Remerca D1 y varios bonos Remerca D1?"} defaultOpen>
              <div className="d1tiendas-commons-components-1-x-container flex tl items-start justify-start t-body c-on-base">
                <div className="d1tiendas-commons-components-1-x-wrapper">
                  <p className="lh-copy d1tiendas-commons-components-1-x-paragraph">
                    La compra es la misma: eliges los montos y las cantidades que quieras.{' '}
                    <span className="b d1tiendas-commons-components-1-x-strong">
                      Lo único que cambia es la emisión.
                    </span>
                    {' '}Con "un solo bono Remerca D1" recibes un único código con todo el saldo acumulado. Con "varios bonos Remerca D1" recibes un código independiente por cada monto, todos detallados en el mismo soporte de compra,{' '}
                    <span className="b d1tiendas-commons-components-1-x-strong">
                      para que puedas compartirlos con diferentes personas.
                    </span>
                  </p>
                </div>
              </div>
            </FaqItem>
            <FaqItem question={"¿Cuánto puedo comprar en una sola transacción?"}>
              <div className="d1tiendas-commons-components-1-x-container flex tl items-start justify-start t-body c-on-base">
                <div className="d1tiendas-commons-components-1-x-wrapper">
                  <p className="lh-copy d1tiendas-commons-components-1-x-paragraph">
                    <span className="b d1tiendas-commons-components-1-x-strong">
                      No hay un monto máximo por compra.
                    </span>
                    {' '}Puedes sumar al carrito todos los Remerca que necesites y pagarlos en una sola transacción.
                  </p>
                </div>
              </div>
            </FaqItem>
            <FaqItem question={"¿Dónde se redime Remerca?"}>
              <div className="d1tiendas-commons-components-1-x-container flex tl items-start justify-start t-body c-on-base">
                <div className="d1tiendas-commons-components-1-x-wrapper">
                  <p className="lh-copy d1tiendas-commons-components-1-x-paragraph">
                    <span className="b d1tiendas-commons-components-1-x-strong">
                      Únicamente en las tiendas físicas D1.
                    </span>
                    {' '}Está habilitado en todas las tiendas a nivel nacional. El código se presenta en caja al momento de pagar y no requiere app, registro ni tarjeta física.
                  </p>
                </div>
              </div>
            </FaqItem>
            <FaqItem question={"¿Cuándo y cómo recibo los códigos?"}>
              <div className="d1tiendas-commons-components-1-x-container flex tl items-start justify-start t-body c-on-base">
                <div className="d1tiendas-commons-components-1-x-wrapper">
                  <p className="lh-copy d1tiendas-commons-components-1-x-paragraph">
                    <span className="b d1tiendas-commons-components-1-x-strong">
                      Inmediatamente después de que la pasarela confirme el pago,
                    </span>
                    {' '}en el correo que indicaste al hacer la compra. Desde ahí puedes compartirlos con quien los va a usar. Si no los ves en pocos minutos,{' '}
                    <span className="b d1tiendas-commons-components-1-x-strong">
                      revisa la carpeta de spam
                    </span>
                    {' '}antes de escribirnos.
                  </p>
                </div>
              </div>
            </FaqItem>
            <FaqItem question={"¿Puedo usar el saldo en varias compras?"}>
              <div className="d1tiendas-commons-components-1-x-container flex tl items-start justify-start t-body c-on-base">
                <div className="d1tiendas-commons-components-1-x-wrapper">
                  <p className="lh-copy d1tiendas-commons-components-1-x-paragraph">
                    <span className="b d1tiendas-commons-components-1-x-strong">
                      Sí.
                    </span>
                    {' '}Si no se gasta todo el saldo en una sola visita, el remanente queda disponible en el mismo código durante el año de vigencia.
                  </p>
                </div>
              </div>
            </FaqItem>
            <FaqItem question={"¿Remerca tiene vencimiento?"}>
              <div className="d1tiendas-commons-components-1-x-container flex tl items-start justify-start t-body c-on-base">
                <div className="d1tiendas-commons-components-1-x-wrapper">
                  <p className="lh-copy d1tiendas-commons-components-1-x-paragraph">
                    <span className="b d1tiendas-commons-components-1-x-strong">
                      Sí. Tu Remerca tiene una validez de un año
                    </span>
                    {' '}desde el momento en que se realiza la compra y se emite el código. Dentro de ese plazo se puede usar en una o varias visitas, y no se aplican descuentos por inactividad.
                  </p>
                </div>
              </div>
            </FaqItem>
            <FaqItem question={"¿Se puede comprar licor o cigarrillos con Remerca?"}>
              <div className="d1tiendas-commons-components-1-x-container flex tl items-start justify-start t-body c-on-base">
                <div className="d1tiendas-commons-components-1-x-wrapper">
                  <p className="lh-copy d1tiendas-commons-components-1-x-paragraph">
                    Remerca es un medio de pago y no cambia las restricciones de ley. La venta de bebidas alcohólicas y productos de tabaco{' '}
                    <span className="b d1tiendas-commons-components-1-x-strong">
                      está prohibida a menores de edad,
                    </span>
                    {' '}y en caja se puede solicitar el documento de identidad.
                  </p>
                </div>
              </div>
            </FaqItem>
            <FaqItem question={"¿Remerca es reembolsable o se puede cambiar por dinero?"}>
              <div className="d1tiendas-commons-components-1-x-container flex tl items-start justify-start t-body c-on-base">
                <div className="d1tiendas-commons-components-1-x-wrapper">
                  <p className="lh-copy d1tiendas-commons-components-1-x-paragraph">
                    <span className="b d1tiendas-commons-components-1-x-strong">
                      No.
                    </span>
                    {' '}Por normativa, el saldo no se redime en efectivo ni se reembolsa. Si tuviste un problema con la compra, escríbenos a{' '}
                    <a className="d1tiendas-commons-components-1-x-link" href="mailto:atencion.cliente@d1.com.co">
                      atencion.cliente@d1.com.co
                    </a>
                    {' '}o comunícate con nuestra{' '}
                    <span className="b d1tiendas-commons-components-1-x-strong">
                      línea de atención al cliente 01 8000 120201
                    </span>
                    , y revisamos tu caso.
                  </p>
                </div>
              </div>
            </FaqItem>
            <FaqItem question={"¿Qué medios de pago aceptan?"}>
              <div className="d1tiendas-commons-components-1-x-container flex tl items-start justify-start t-body c-on-base">
                <div className="d1tiendas-commons-components-1-x-wrapper">
                  <p className="lh-copy d1tiendas-commons-components-1-x-paragraph">
                    <span className="b d1tiendas-commons-components-1-x-strong">
                      Tarjeta de crédito, tarjeta débito y PSE,
                    </span>
                    {' '}a través de una pasarela de pagos certificada. Nunca almacenamos los datos de tu tarjeta.
                  </p>
                </div>
              </div>
            </FaqItem>
            <FaqItem question={"¿Qué pasa si pierdo el código?"}>
              <div className="d1tiendas-commons-components-1-x-container flex tl items-start justify-start t-body c-on-base">
                <div className="d1tiendas-commons-components-1-x-wrapper">
                  <p className="lh-copy d1tiendas-commons-components-1-x-paragraph">
                    <span className="b d1tiendas-commons-components-1-x-strong">
                      Remerca es un bono al portador, por lo que no respondemos por su pérdida o robo. En el evento de pérdida del bono escríbenos de inmediato a{' '}
                      <a className="d1tiendas-commons-components-1-x-link" href="mailto:atencion.cliente@d1.com.co">
                        atencion.cliente@d1.com.co
                      </a>
                    </span>
                    {' '}o comunícate con la línea de atención al cliente. Indica el correo de compra y el número de la transacción. Haremos nuestros mejores esfuerzos para bloquear el código y evitar usos no autorizados y te informaremos el resultado. Si el saldo está intacto, emitimos un código de reposición. El saldo consumido antes del bloqueo no se reembolsa, así que{' '}
                    <span className="b d1tiendas-commons-components-1-x-strong">
                      comparte el código solo con quien lo vaya a usar.
                    </span>
                  </p>
                </div>
              </div>
            </FaqItem>
            <FaqItem question="¿Desde qué correo voy a recibir mis bonos Remerca?">
              <div className="d1tiendas-commons-components-1-x-container flex tl items-start justify-start t-body c-on-base">
                <div className="d1tiendas-commons-components-1-x-wrapper">
                  <p className="lh-copy d1tiendas-commons-components-1-x-paragraph">
                    Los códigos llegan desde{' '}
                    <span className="b d1tiendas-commons-components-1-x-strong">
                      [correo remitente]
                    </span>
                    , inmediatamente después de que se confirma el pago. Te recomendamos{' '}
                    <span className="b d1tiendas-commons-components-1-x-strong">
                      agregar esta dirección a tus contactos
                    </span>
                    {' '}para que el correo no termine en spam. Si en pocos minutos no lo ves en tu bandeja de entrada, revisa las carpetas de spam o promociones antes de escribirnos a{' '}
                    <a className="d1tiendas-commons-components-1-x-link" href="mailto:atencion.cliente@d1.com.co">
                      atencion.cliente@d1.com.co
                    </a>
                    .
                  </p>
                </div>
              </div>
            </FaqItem>
          </ul>
        </section>
      </div>
    </div>
  )
}
