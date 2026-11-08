import Icon from '../ui/Icon'

const S = 'd1tiendas-store-locator-1-x-'

function Dropdown({ label, placeholder, value, options, disabled, onChange }) {
  const selected = options.find((o) => o.value === value)

  return (
    <div className="vtex-styleguide-9-x-dropdown vtex-dropdown">
      <label className="h-100">
        <span className="vtex-dropdown__label db mb3 w-100 c-on-base t-small">{label}</span>
        <div
          className={`vtex-styleguide-9-x-container vtex-dropdown__container br2 relative bw1 bg-base ba h-regular ${
            disabled ? 'b--disabled bg-disabled' : 'hover-b--muted-3 b--muted-4'
          } t-body`}
        >
          <div className={`vtex-dropdown__button bg-transparent bn w-100 h-100 ${disabled ? 'c-disabled pl5' : 'pl5 pr3 pointer c-muted-2'}`}>
            <div className="flex h-100">
              <div className="vtex-dropdown__caption flex-auto tl truncate h-100">
                <div className="h-100 flex items-center">{selected ? selected.label : placeholder}</div>
              </div>
              <div className={`vtex-dropdown__arrow flex-none flex items-center pl2 ${disabled ? 'c-on-disabled' : 'c-action-primary'}`}>
                <Icon id="nav-caret--down" size={18} />
              </div>
            </div>
          </div>
          <select
            aria-label={label}
            disabled={disabled}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="o-0 absolute top-0 left-0 h-100 w-100 bottom-0 t-body pointer"
          >
            <option value="">{placeholder}</option>
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </label>
    </div>
  )
}

const TAB = 'v-mid relative h-regular ph6 t-body bg-transparent outline-0 bt-0 bl-0 br-0 bw1'

export default function StoreFilters({
  tab,
  onTab,
  departments,
  cities,
  department,
  city,
  onDepartment,
  onCity,
  search,
  onSearch,
}) {
  return (
    <article className={`w-100 ${S}filtersContainer`}>
      <div className="vtex-tabs w-100 h-100 flex flex-column">
        <div className="vtex-tabs__nav flex flex-row bb b--muted-4" role="tablist">
          {[
            ['region', 'Por departamento o ciudad'],
            ['map', 'Por mapa'],
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              className={`vtex-tab__button ${TAB} ${
                tab === id
                  ? 'c-on-muted b--emphasis fw5 vtex-tab__button--active b--solid'
                  : 'c-muted-1 b--transparent hover-c-action-primary pointer vtex-tab__button--inactive'
              }`}
              onClick={() => onTab(id)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="vtex-tabs__content w-100">
          {tab === 'region' ? (
            <div className={`w-100 flex justify-center ${S}departments`}>
              <Dropdown
                label="Departamento"
                placeholder="Elige un departamento"
                value={department}
                options={departments}
                onChange={onDepartment}
              />
              <Dropdown
                label="Ciudad"
                placeholder="Seleccionar ciudad"
                value={city}
                options={cities}
                disabled={!department}
                onChange={onCity}
              />
            </div>
          ) : (
            <div className={`w-100 ${S}search`}>
              <label className="vtex-input w-100">
                <span className="vtex-input__label db mb3 w-100 c-on-base t-small">Selecciona tu tienda</span>
                <div className="vtex-input-prefix__group flex flex-row items-stretch overflow-hidden br2 bw1 b--solid b--muted-4 hover-b--muted-3 h-regular">
                  <input
                    type="text"
                    placeholder="Buscar tienda por nombre o ciudad"
                    value={search}
                    onChange={(e) => onSearch(e.target.value)}
                    className="vtex-styleguide-9-x-input ma0 border-box vtex-styleguide-9-x-hideDecorators vtex-styleguide-9-x-noAppearance br2 br-0 br--left w-100 bn outline-0 bg-base c-on-base b--muted-4 hover-b--muted-3 t-body pl5"
                  />
                  <span className="c-muted-2 fw5 flex items-center t-body bg-base vtex-input__suffix br2 bl-0 br--right pr5 pl3">
                    <Icon id="hpa-search" size={16} />
                  </span>
                </div>
              </label>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
