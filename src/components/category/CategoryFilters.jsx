import { useState } from 'react'
import Icon from '../ui/Icon'

const R = 'vtex-search-result-3-x-'
const money = (n) => `$ ${n.toLocaleString('es-CO')}`
const slug = (text) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

function Checkbox({ id, label, checked, disabled, onChange }) {
  return (
    <div className="vtex-checkbox__line-container flex items-start relative pointer">
      <div className="vtex-checkbox__container relative w1 h1 mr3">
        <div
          className={`vtex-checkbox__inner-container h1 w1 absolute ba bw1 br1 pointer mr3 ${
            checked ? 'b--action-primary bg-action-primary' : 'b--muted-4'
          }`}
        />
        <div className={`vtex-checkbox__box-wrapper absolute w1 h1 flex ${checked ? 'o-100' : 'o-0'}`}>
          <div className="vtex-checkbox__box absolute top-0 left-0 bottom-0 overflow-hidden w-100 flex items-center align-center justify-center c-on-action-primary">
            {checked && <Icon id="sti-check--line" size={12} />}
          </div>
        </div>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="vtex-checkbox__input h1 w1 absolute o-0 pointer"
        />
      </div>
      <label htmlFor={id} className="vtex-checkbox__label w-100 c-on-base pointer">
        {label}
      </label>
    </div>
  )
}

function FilterGroup({ id, title, options, selected, disabled, onToggle }) {
  const [open, setOpen] = useState(true)

  return (
    <div className={`${R}filter__container bb b--muted-4 ${R}filter__container--${id}`}>
      <div className={`${R}filter pv5 ${R}filterAvailable`}>
        <div role="button" tabIndex={0} className="pointer" onClick={() => setOpen((v) => !v)} onKeyDown={(e) => e.key === 'Enter' && setOpen((v) => !v)}>
          <div className={`${R}filterTitle f5 flex items-center justify-between`}>
            <span className={`${R}filterTitleSpan`}>{title}</span>
            <span className={`${R}filterIcon flex items-center ph5 c-muted-3`}>
              <Icon id={open ? 'nav-caret--up' : 'nav-caret--down'} size={14} />
            </span>
          </div>
        </div>
      </div>
      {open && (
        <div className={`${R}filterTemplateOverflow overflow-y-auto`}>
          <div>
            <div className={`${R}filterContent`}>
              {options.map((option) => (
                <div
                  key={option}
                  title={disabled ? 'Este filtro estará disponible próximamente' : option}
                  className={`${R}filterItem ${R}filterItem--${slug(option)} lh-copy w-100`}
                >
                  <Checkbox
                    id={`${id}-${slug(option)}`}
                    label={option}
                    checked={selected.includes(option)}
                    disabled={disabled}
                    onChange={() => onToggle(option)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function PriceRange({ bounds, value, onChange }) {
  const [min, max] = value
  const setMin = (n) => onChange([Math.min(n, max), max])
  const setMax = (n) => onChange([min, Math.max(n, min)])

  return (
    <div className={`${R}filter__container bb b--muted-4 ${R}filter__container--priceRange`}>
      <div className={`${R}filter pv5 ${R}filterAvailable`}>
        <div className={`${R}filterTitle f5 flex items-center justify-between`}>
          <span className={`${R}filterTitleSpan`}>Precio</span>
        </div>
      </div>
      <div className={`${R}filterTemplateOverflow pb5`}>
        <div className="flex justify-between t-small c-on-base mb3">
          <span>{money(min)}</span>
          <span>{money(max)}</span>
        </div>
        <div className="d1-price-range relative">
          <input
            type="range"
            aria-label="Precio mínimo"
            min={bounds.min}
            max={bounds.max}
            step={100}
            value={min}
            onChange={(e) => setMin(Number(e.target.value))}
          />
          <input
            type="range"
            aria-label="Precio máximo"
            min={bounds.min}
            max={bounds.max}
            step={100}
            value={max}
            onChange={(e) => setMax(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  )
}

export default function CategoryFilters({ filters, bounds, state, onToggle, onPrice }) {
  return (
    <div className={`${R}filters--layout`}>
      <div className={`${R}filtersWrapper`}>
        <div className={`${R}filter__container ${R}filter__container--title bb b--muted-4`}>
          <h5 className={`${R}filterMessage t-heading-5 mv5`}>Filtros</h5>
        </div>
        {filters.map((filter) =>
          filter.options.length > 0 ? (
            <FilterGroup
              key={filter.title}
              id={slug(filter.title)}
              title={filter.title}
              options={filter.options}
              selected={state.selected[filter.title] ?? []}
              disabled={filter.title === 'Categoría'}
              onToggle={(option) => onToggle(filter.title, option)}
            />
          ) : (
            <PriceRange key={filter.title} bounds={bounds} value={state.price} onChange={onPrice} />
          ),
        )}
      </div>
    </div>
  )
}
