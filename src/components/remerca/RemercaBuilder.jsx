import { useState } from 'react'
import { useCart } from '../../context/useCart'

const P = 'd1tiendas-commons-components-1-x-'
const BTN =
  'vtex-button bw1 ba fw5 v-mid relative pa0 lh-solid br2 min-h-regular t-action bg-action-primary b--action-primary c-on-action-primary hover-bg-action-primary hover-b--action-primary hover-c-on-action-primary pointer w-100'

const AMOUNTS = [
  { value: 50000 },
  { value: 100000 },
  { value: 200000 },
  { value: 500000 },
  { value: 1000000, recommended: true },
]

const money = (n) => `$${n.toLocaleString('es-CO')}`

function Paragraph({ children }) {
  return (
    <div className={`${P}container flex tl items-start justify-start t-body c-on-base`}>
      <div className={`${P}wrapper`}>
        <p className={`lh-copy ${P}paragraph`}>{children}</p>
      </div>
    </div>
  )
}

function Strong({ children }) {
  return <span className={`b ${P}strong`}>{children}</span>
}

function AmountRow({ amount, quantity, onChange }) {
  const row = `${P}remercaAmountBuilderRow`

  return (
    <div className={`flex items-center justify-between ${row} ${amount.recommended ? `${row}--recommended` : ''}`}>
      {amount.recommended && <span className={`${P}remercaAmountBuilderRowTag`}>Recomendado</span>}
      <span className={`${P}remercaAmountBuilderRowLabel`}>{money(amount.value)}</span>
      <div className={`${P}remercaAmountBuilderRowAction`}>
        <div className={`${P}customAddToCartButton w-100`}>
          {quantity === 0 ? (
            <button type="button" className={BTN} onClick={() => onChange(1)}>
              <div className="vtex-button__label flex items-center justify-center h-100 ph6 w-100 border-box">
                Agregar
              </div>
            </button>
          ) : (
            <div
              className={`${BTN.replace('c-on-action-primary', 'c-action-primary')} flex items-center justify-between b`}
              role="group"
              aria-label={`Cantidad de bonos de ${money(amount.value)}`}
            >
              <button
                type="button"
                aria-label="Quitar uno"
                className="bn bg-transparent c-action-primary pointer ph4 f4"
                onClick={() => onChange(quantity - 1)}
              >
                −
              </button>
              <span aria-live="polite">{quantity}</span>
              <button
                type="button"
                aria-label="Agregar uno"
                className="bn bg-transparent c-action-primary pointer ph4 f4"
                onClick={() => onChange(quantity + 1)}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
      <span className={`${P}remercaAmountBuilderRowSubtotal`}>{money(amount.value * quantity)}</span>
    </div>
  )
}

function Toggle({ checked, onChange, label }) {
  return (
    <label>
      <div className="flex flex-row items-center relative pointer">
        <div className={`vtex-toggle flex items-center relative br4 ${checked ? 'bg-emphasis' : 'bg-muted-2'}`}>
          <div
            className="absolute br-100 bg-base"
            style={checked ? { left: 'auto', right: '0.125rem' } : undefined}
          />
        </div>
        <input
          type="checkbox"
          aria-label={label}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="h-100 w-100 absolute o-0 pointer"
        />
      </div>
    </label>
  )
}

export default function RemercaBuilder() {
  const { addItem } = useCart()
  const [quantities, setQuantities] = useState({})
  const [single, setSingle] = useState(false)
  const [added, setAdded] = useState(false)

  const setQuantity = (value, quantity) => {
    setAdded(false)
    setQuantities((q) => ({ ...q, [value]: Math.max(0, quantity) }))
  }
  const lines = AMOUNTS.filter((a) => quantities[a.value] > 0).map((a) => ({ ...a, quantity: quantities[a.value] }))
  const total = lines.reduce((sum, l) => sum + l.value * l.quantity, 0)

  const checkout = () => {
    lines.forEach((l) => {
      for (let i = 0; i < l.quantity; i += 1) {
        addItem({
          name: `Bono Remerca D1 ${money(l.value)}`,
          brand: 'D1',
          href: `/remerca/p#${l.value}`,
          image: 'img/remerca-6e7a0cdc-e0af16.webp',
          price: `$ ${l.value.toLocaleString('es-CO')}`,
        })
      }
    })
    setQuantities({})
    setAdded(true)
  }

  return (
    <div>
      <div
        id="remerca-comprar"
        role="region"
        aria-label="Arma tu compra"
        className={`${P}containerLayout ${P}containerLayout--remerca-build ${P}containerLayout--bg-gray ${P}containerLayout--sanity flex flex-column pa4 pa7-ns`}
      >
        <section className={`${P}renderWrapper ${P}renderWrapper--remerca-build-title ${P}renderWrapper--navy ${P}renderWrapper--sanity sanity`}>
          <div className={`${P}container flex tl items-start justify-start t-heading-3 c-on-base`}>
            <div className={`${P}wrapper`}>
              <p className={`lh-copy ${P}paragraph`}>Arma tu compra</p>
            </div>
          </div>
        </section>

        <div className="flex flex-column w-100">
          <span className={`${P}remercaAmountBuilderListTitle`}>
            <Paragraph>
              Elige los montos que se cargarán en tu bono Remerca D1 y las cantidades, y dinos si quieres todo{' '}
              <Strong>en un solo bono Remerca D1 o repartirlo en varios.</Strong>
            </Paragraph>
          </span>

          <div className={`flex flex-column flex-row-ns items-start ${P}remercaAmountBuilder`}>
            <div className={`flex flex-column w-100 w-60-ns ${P}remercaAmountBuilderList`}>
              {AMOUNTS.map((amount) => (
                <AmountRow
                  key={amount.value}
                  amount={amount}
                  quantity={quantities[amount.value] ?? 0}
                  onChange={(q) => setQuantity(amount.value, q)}
                />
              ))}
            </div>

            <div className={`flex flex-column w-100 w-40-ns ${P}remercaAmountBuilderSummary`}>
              <span className={`${P}remercaAmountBuilderSummaryLabel`}>Resumen de la compra</span>
              <div className={`${P}remercaAmountBuilderSummaryTitleRow`}>
                <span className={`${P}remercaAmountBuilderSummaryTitle`}>¿Un solo bono Remerca D1?</span>
                <Toggle checked={single} onChange={setSingle} label="Un solo bono Remerca D1" />
              </div>
              <span className={`${P}remercaAmountBuilderSummarySubtitle`}>
                <Paragraph>
                  Activalo el botón si prefieres un solo código con todo el saldo acumulado.{' '}
                  <Strong>Recibirás el código en tu correo electrónico</Strong> para que lo compartas.
                </Paragraph>
              </span>
              <div className={`${P}remercaAmountBuilderSummaryDivider`} />

              {lines.length === 0 ? (
                <span className={`${P}remercaAmountBuilderSummaryEmpty`}>
                  <Paragraph>
                    {added ? (
                      <>
                        <Strong>¡Listo!</Strong> Agregamos tus bonos Remerca D1 al carrito.
                      </>
                    ) : (
                      <>
                        Aún no has agregado bonos Remerca D1. <Strong>Elige al menos un monto</Strong> para continuar.
                      </>
                    )}
                  </Paragraph>
                </span>
              ) : (
                <ul className="list ma0 pa0">
                  {lines.map((l) => (
                    <li key={l.value} className="flex justify-between t-body c-on-base pv2">
                      <span>
                        {l.quantity} × {money(l.value)}
                      </span>
                      <span>{money(l.value * l.quantity)}</span>
                    </li>
                  ))}
                  <li className="t-small c-muted-1 pv2">
                    {single ? 'Recibirás un solo código con todo el saldo.' : 'Recibirás un código por cada bono.'}
                  </li>
                </ul>
              )}

              <div className={`${P}remercaAmountBuilderSummaryTotalRow`}>
                <span className={`${P}remercaAmountBuilderSummaryTotalLabel`}>Total a pagar</span>
                <span className={`${P}remercaAmountBuilderSummaryTotalValue`}>{money(total)}</span>
              </div>
              <button
                type="button"
                className={`${P}remercaAmountBuilderSummaryButton`}
                disabled={total === 0}
                onClick={checkout}
              >
                {total === 0 ? 'Elige un monto' : 'Agregar al carrito'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
