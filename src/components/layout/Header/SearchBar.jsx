import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Icon from '../../ui/Icon'
import AppLink from '../../ui/AppLink'
import { internalPath, searchUrl } from '../../../utils/links'
import { estaAgotado } from '../../../utils/stock'
import { popularSearches } from '../../../data/navigation'
import { resaltar, suggestProducts } from '../../../utils/search'
import '../../../styles/busqueda.css'

const V = 'vtex-store-components-3-x-'
const B = 'vtex-search-2-x-'

export default function SearchBar({ id = 'search-input' }) {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [query, setQuery] = useState(params.get('_q') ?? '')
  const [focused, setFocused] = useState(false)
  const [active, setActive] = useState(-1)
  const suggestions = suggestProducts(query) // sugerencias de productos A–Z mientras se escribe
  const q = query.trim()
  const sinResultados = q.length >= 2 && suggestions.length === 0

  // Flechas para moverse por las sugerencias, Enter para abrir la elegida, Escape para cerrar.
  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown' && suggestions.length) {
      e.preventDefault()
      setActive((a) => (a + 1) % suggestions.length)
    } else if (e.key === 'ArrowUp' && suggestions.length) {
      e.preventDefault()
      setActive((a) => (a <= 0 ? suggestions.length - 1 : a - 1))
    } else if (e.key === 'Escape') {
      setFocused(false)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (active >= 0 && suggestions[active]) {
      const destino = internalPath(suggestions[active].href)
      setFocused(false)
      setActive(-1)
      if (destino) return navigate(destino)
      return window.location.assign(suggestions[active].href)
    }
    if (!q) return
    setFocused(false)
    navigate(searchUrl(q))
  }

  return (
    <div
      className={`d1tiendas-commons-components-1-x-containerLayout d1tiendas-commons-components-1-x-containerLayout--main-header d1tiendas-commons-components-1-x-containerLayout--header d1tiendas-commons-components-1-x-containerLayout--search-bar-container flex ph0 ph4-ns w-100`}
    >
      <div className={`w-100 mw7 pv4 ${V}searchBarContainer`}>
        <div className={`w-100 ${V}searchBarInnerContainer ${V}searchBarInnerContainer--search-bar`}>
          <label htmlFor={id} className={`${V}visuallyHidden`}>
            ¿Qué estás buscando?
          </label>
          <div className={`${V}autoCompleteOuterContainer ${V}autoCompleteOuterContainer--search-bar`}>
            <form className="w-100 flex" onSubmit={onSubmit}>
              <label className="vtex-input w-100">
                <div className="vtex-input-prefix__group flex flex-row items-stretch overflow-hidden b--solid b--muted-4 h-large">
                  <input
                    id={id}
                    type="text"
                    autoComplete="off"
                    placeholder="¿Qué estás buscando?"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value)
                      setActive(-1)
                    }}
                    onKeyDown={onKeyDown}
                    role="combobox"
                    aria-expanded={focused && (suggestions.length > 0 || sinResultados)}
                    aria-controls={`${id}-sugerencias`}
                    aria-activedescendant={active >= 0 ? `${id}-sug-${active}` : undefined}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setTimeout(() => setFocused(false), 150)}
                    className="vtex-styleguide-9-x-input ma0 border-box vtex-styleguide-9-x-hideDecorators vtex-styleguide-9-x-noAppearance br-0 br--left w-100 bn outline-0 bg-base c-on-base b--muted-4 t-body pl5"
                  />
                  <span className="c-muted-2 flex items-center t-body bg-base vtex-input__suffix bl-0 br--right pr5 pl4">
                    <div className={`${V}suffixWrapper ${V}suffixWrapper--search-bar flex h-100`}>
                      <button
                        type="submit"
                        aria-label="Buscar productos"
                        className={`${V}searchBarIcon ${V}searchBarIcon--search-bar flex items-center pointer bn bg-transparent outline-0 pv0 pl0 pr3`}
                      >
                        <Icon id="hpa-search" size={16} className={`${V}searchIcon ${V}searchIcon--search-bar`} />
                      </button>
                    </div>
                  </span>
                </div>
              </label>
            </form>
          </div>
          <div className={`${B}biggy-autocomplete-wrapper`}>
            <section
              className={`${B}biggy-autocomplete ${focused ? '' : `${B}biggy-js-container--hidden`} w-100`}
              style={{ flexDirection: 'row' }}
            >
              <div className={`${B}history-and-top-wrapper`} style={{ flexDirection: 'row' }}>
                {(suggestions.length > 0 || sinResultados) && (
                  <article className={`${B}itemList d1-sugerencias`}>
                    {suggestions.length > 0 ? (
                      <>
                        <p className={`${B}itemListTitle c-on-base d1-sugerencias__titulo`}>Productos (A–Z)</p>
                        <ul id={`${id}-sugerencias`} role="listbox" aria-label="Productos (A–Z)">
                          {suggestions.map((p, i) => (
                            <li key={p.href} id={`${id}-sug-${i}`} role="option" aria-selected={i === active}>
                              <AppLink href={p.href} onMouseDown={(e) => e.preventDefault()}>
                                <span>
                                  {resaltar(p.name, query).map((t, k) => (t.negrita ? <mark key={k}>{t.texto}</mark> : <span key={k}>{t.texto}</span>))}
                                </span>
                                {estaAgotado(p.href) && <span className="d1-sugerencias__agotado">Agotado</span>}
                              </AppLink>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <p className="d1-sugerencias__vacio" role="status">
                        No encontramos productos con '{q}'. Prueba con otra palabra.
                      </p>
                    )}
                  </article>
                )}
                <article className={`${B}itemList ${B}itemList--top-search`}>
                  <p className={`${B}itemListTitle c-on-base`}>Búsquedas populares</p>
                  <ol className={`${B}itemListList`}>
                    {popularSearches.map((item, i) => (
                      <li key={item.href} className={`${B}itemListItem`}>
                        <AppLink href={item.href} className={`${B}itemListLink`}>
                          <span className={`${B}itemListPrefix`}>{i + 1}.</span>
                          <span className={`${B}itemListLinkTitle c-on-base`}>{item.label}</span>
                        </AppLink>
                      </li>
                    ))}
                  </ol>
                </article>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
