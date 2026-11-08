import { useEffect, useMemo, useState } from 'react'
import CategoryBreadcrumb from '../components/category/CategoryBreadcrumb'
import StoreFilters from '../components/stores/StoreFilters'
import StoreList from '../components/stores/StoreList'
import StoreMap from '../components/stores/StoreMap'
import { loadStores, normalize, titleCase } from '../utils/stores'
import '../styles/stores.css'

const P = 'd1tiendas-commons-components-1-x-'
const S = 'd1tiendas-store-locator-1-x-'
const PAGE_SIZE = 100
const BANNER =
  'https://d1tiendas.vtexassets.com/assets/vtex.file-manager-graphql/images/8e35ca32-1f8a-479e-8641-6015a4f2c367___44364ccfc3134808fa108f6f44b428ff.jpeg'

const byLabel = (a, b) => a.label.localeCompare(b.label, 'es')
const unique = (values) => [...new Set(values)]

export default function StoresPage() {
  const [stores, setStores] = useState(null)
  const [error, setError] = useState(false)
  const [tab, setTab] = useState('region')
  const [department, setDepartment] = useState('')
  const [city, setCity] = useState('')
  const [search, setSearch] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [limit, setLimit] = useState(PAGE_SIZE)

  useEffect(() => {
    document.title = 'Tiendas | D1'
    window.scrollTo(0, 0)
    let active = true
    loadStores().then(
      (list) => active && setStores(list),
      () => active && setError(true),
    )
    return () => {
      active = false
    }
  }, [])

  const departments = useMemo(
    () =>
      unique((stores ?? []).map((s) => s.department))
        .filter(Boolean)
        .map((d) => ({ value: d, label: titleCase(d) }))
        .sort(byLabel),
    [stores],
  )
  const cities = useMemo(
    () =>
      unique((stores ?? []).filter((s) => s.department === department).map((s) => s.city))
        .filter(Boolean)
        .map((c) => ({ value: c, label: titleCase(c) }))
        .sort(byLabel),
    [stores, department],
  )

  const visible = useMemo(() => {
    if (!stores) return []
    if (tab === 'map') {
      const q = normalize(search)
      return q ? stores.filter((s) => normalize(`${s.name} ${s.city} ${s.address}`).includes(q)) : stores
    }
    return stores.filter((s) => (!department || s.department === department) && (!city || s.city === city))
  }, [stores, tab, department, city, search])

  // Cambia solo cuando la persona toca un filtro: el mapa se reencuadra y la lista vuelve al principio.
  const filterKey = `${tab}|${department}|${city}|${search}`
  const [appliedKey, setAppliedKey] = useState(filterKey)
  if (appliedKey !== filterKey) {
    setAppliedKey(filterKey)
    setLimit(PAGE_SIZE)
    setSelectedId(null)
  }
  const fitKey = department || city || search ? filterKey : ''

  const shown = visible.slice(0, limit)

  return (
    <div className="vtex-render__container-id-store-list-provider">
      <div
        className={`${P}containerLayout ${P}containerLayout--search__result__container ${P}containerLayout--stores-breadcrumb ${P}containerLayout--max-width ph4 w-100 ph7-ns`}
      >
        <CategoryBreadcrumb title="Nuestras tiendas" to="/tiendas" />
      </div>

      <div className={`${P}containerLayout ${P}containerLayout--store-locator-banner ${P}containerLayout--max-width w-100 flex flex-column justify-center ph7-ns pv5 ph4`}>
        <div className={`${P}containerImage ${P}containerImage--store-locator-banner`}>
          <img
            src={BANNER}
            alt="Tienda D1"
            className={`${P}imageElement ${P}imageElement--store-locator-banner vtex-store-components-3-x-imageElement vtex-store-components-3-x-imageElement--store-locator-banner`}
          />
        </div>
      </div>

      <div className={`${P}containerLayout ${P}containerLayout--store-locator-title ${P}containerLayout--max-width ph7-ns ph4`}>
        <div className="vtex-rich-text-0-x-container vtex-rich-text-0-x-container--title-mix-colors vtex-rich-text-0-x-container--store-locator-title flex tl items-start justify-start t-body c-on-base">
          <div className="vtex-rich-text-0-x-wrapper vtex-rich-text-0-x-wrapper--title-mix-colors vtex-rich-text-0-x-wrapper--store-locator-title">
            <h1 className="vtex-rich-text-0-x-heading vtex-rich-text-0-x-heading--title-mix-colors vtex-rich-text-0-x-heading--store-locator-title t-heading-2 vtex-rich-text-0-x-headingLevel2 vtex-rich-text-0-x-headingLevel2--title-mix-colors vtex-rich-text-0-x-headingLevel2--store-locator-title vtex-rich-text-0-x-heading-level-2">
              Busca tu tienda D1 más cercana
            </h1>
          </div>
        </div>
      </div>

      <div className={`${P}containerLayout ${P}containerLayout--store-locator-container ${P}containerLayout--max-width ph7-ns ph4`}>
        <div className={`flex w-100 flex-nowrap flex-wrap-ns flex-column flex-row-ns ${S}container`}>
          {error ? (
            <p className="t-body c-muted-1 pa4">No pudimos cargar las tiendas. Intenta de nuevo más tarde.</p>
          ) : stores === null ? (
            <p role="status" className="t-body c-muted-1 pa4">
              Cargando tiendas...
            </p>
          ) : (
            <>
              <StoreFilters
                tab={tab}
                onTab={setTab}
                departments={departments}
                cities={cities}
                department={department}
                city={city}
                onDepartment={(value) => {
                  setDepartment(value)
                  setCity('')
                }}
                onCity={setCity}
                search={search}
                onSearch={setSearch}
              />
              <StoreList
                stores={shown}
                selectedId={selectedId}
                onSelect={setSelectedId}
                onShowMore={() => setLimit((n) => n + PAGE_SIZE)}
                hiddenCount={visible.length - shown.length}
              />
              <div className={`w-100 w-70-ns pl0 pl4-ns ${S}storesMapCol`}>
                <StoreMap stores={visible} selectedId={selectedId} onSelect={setSelectedId} fitKey={fitKey} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
