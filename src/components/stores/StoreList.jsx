import { useEffect, useRef } from 'react'
import Icon from '../ui/Icon'

const S = 'd1tiendas-store-locator-1-x-'

function StoreItem({ store, first, selected, onSelect }) {
  const ref = useRef(null)

  useEffect(() => {
    if (selected) ref.current?.scrollIntoView({ block: 'nearest' })
  }, [selected])

  return (
    <button
      ref={ref}
      id={`store-item-${store.id}`}
      type="button"
      aria-current={selected || undefined}
      className={`pointer mb0 ph3 pv5 ${first ? `${S}addressListFirstItem` : ''} ${S}addressListItem ${
        first ? 'bt ' : ''
      }bb bl br b--light-gray hover-bg-light-gray ${selected ? 'bg-light-gray' : ''}`}
      onClick={() => onSelect(store.id)}
    >
      <div className={`${S}addressListItemTitle`}>
        <div className="flex items-center justify-between">
          <span className={`t-mini b ${S}addressStoreName`}>{store.name}</span>
        </div>
        <span className={`t-mini ${S}addressStoreAddress`}>
          <Icon id="hpa-pointer" size={16} />
          {store.address}
        </span>
      </div>
      <span className={`t-mini ${S}addressStoreScheduled`}>
        <Icon id="hpa-clock-charging" size={16} />
        {store.schedule}
      </span>
      <a
        href={store.url}
        className={`${S}addressListLink`}
        onClick={(e) => e.stopPropagation()}
      >
        Ver tienda
      </a>
    </button>
  )
}

export default function StoreList({ stores, selectedId, onSelect, onShowMore, hiddenCount }) {
  return (
    <div className={`w-100 w-30-ns ${S}storesListCol`}>
      <div id="store-list-scroll" className={`overflow-auto h-100 ${S}storesList`}>
        <div className={`${S}addressList ph2`} role="list">
          {stores.map((store, i) => (
            <StoreItem key={store.id} store={store} first={i === 0} selected={store.id === selectedId} onSelect={onSelect} />
          ))}
          {stores.length === 0 && <p className={`${S}noResults pa4`}>No encontramos tiendas con esos datos.</p>}
          {hiddenCount > 0 && (
            <button
              type="button"
              className="pointer w-100 pa4 bn bg-transparent c-action-primary t-small b"
              onClick={onShowMore}
            >
              Ver más tiendas ({hiddenCount})
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
