import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Icon from '../../ui/Icon'
import AppLink from '../../ui/AppLink'
import { searchUrl } from '../../../utils/links'
import { popularSearches } from '../../../data/navigation'

const V = 'vtex-store-components-3-x-'
const B = 'vtex-search-2-x-'

export default function SearchBar({ id = 'search-input' }) {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [query, setQuery] = useState(params.get('_q') ?? '')
  const [focused, setFocused] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    const q = query.trim()
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
                    onChange={(e) => setQuery(e.target.value)}
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
