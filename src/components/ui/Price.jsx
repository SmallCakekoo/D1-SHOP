// Recibe "$ 14.850" y lo parte con las mismas clases VTEX que usa el CSS legacy.
export default function Price({ value }) {
  const [code, amount = ''] = value.split(' ')
  const groups = amount.split('.')

  return (
    <span className="vtex-product-price-1-x-sellingPrice">
      <span className="vtex-product-price-1-x-sellingPriceWithTax">
        <span className="vtex-product-price-1-x-currencyContainer">
          <span className="vtex-product-price-1-x-currencyCode">{code}</span>
          <span className="vtex-product-price-1-x-currencyLiteral">&nbsp;</span>
          {groups.map((group, i) => (
            <span key={i} style={{ display: 'contents' }}>
              {i > 0 && <span className="vtex-product-price-1-x-currencyGroup">.</span>}
              <span className="vtex-product-price-1-x-currencyInteger">{group}</span>
            </span>
          ))}
        </span>
      </span>
    </span>
  )
}
