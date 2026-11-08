import { useEffect, useRef, useState } from 'react'
import Icon from '../ui/Icon'

const R = 'vtex-search-result-3-x-'

export default function SortDropdown({ options, value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  return (
    <div className={`${R}orderBy--layout`}>
      <div ref={ref} className={`${R}orderByDropdown relative pt1 justify-end w-100 w-auto-ns ml-auto`}>
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          className={`${R}orderByButton ph3 pv5 mv0 pointer flex items-center justify-end bg-base c-on-base t-action--small bt br bl bb-0 br2 br--top bw1 w-100 outline-0 b--transparent pl1`}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`${R}filterPopupTitle c-on-base t-action--small ml-auto-ns`}>
            <span className={`${R}orderByText c-muted-2 dn dib-ns`}>Ordenar por</span> {value}
          </span>
          <span className={`${R}filterPopupArrowIcon ph5 pt1`}>
            <Icon id="nav-caret--down" size={10} />
          </span>
        </button>
        <div
          role="listbox"
          className={`${R}orderByOptionsContainer z-3 absolute bg-base shadow-5 w-100 f5 b--muted-4 br2 ba bw1 br--bottom top-0 right-0-ns ${open ? '' : 'dn'}`}
        >
          {options.map((option) => (
            <button
              key={option}
              type="button"
              role="option"
              aria-selected={option === value}
              className={`${option === value ? `bg-light-gray ${R}orderByOptionItem--selected` : 'hover-bg-muted-5 bg-base'} ${R}orderByOptionItem c-on-base f5 ml-auto db no-underline pointer tl bn pv4 ph5 w-100 right-0-ns`}
              onClick={() => {
                onChange(option)
                setOpen(false)
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
