import { construirFicha, NO_INFORMADO } from '../../utils/ficha'
import '../../styles/ficha.css'

// Ficha del producto (cambio 5): mismos campos y mismo orden en todos los productos.
export default function ProductSheet({ product }) {
  const { campos, nota } = construirFicha(product)
  return (
    <section className="d1-sheet" aria-labelledby="ficha-titulo">
      <h2 id="ficha-titulo">Ficha del producto</h2>
      <dl>
        {campos.map((c) => (
          <div key={c.clave} className="d1-sheet__row">
            <dt>{c.etiqueta}</dt>
            <dd className={c.valor === NO_INFORMADO ? 'd1-sheet__vacio' : undefined}>
              {Array.isArray(c.valor) ? (
                <ul>
                  {c.valor.map((v) => (
                    <li key={v}>{v}</li>
                  ))}
                </ul>
              ) : (
                c.valor
              )}
            </dd>
          </div>
        ))}
      </dl>
      {nota && <p className="d1-sheet__nota">{nota}</p>}
    </section>
  )
}
