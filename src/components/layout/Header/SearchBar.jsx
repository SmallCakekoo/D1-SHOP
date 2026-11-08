import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Icon from '../../ui/Icon'
import { internalPath, searchUrl } from '../../../utils/links'
import { estaAgotado } from '../../../utils/stock'
import { asset } from '../../../utils/asset'
import { resaltar, suggestProducts } from '../../../utils/search'
import { popularSearches, quickAccess } from '../../../data/navigation'
import '../../../styles/busqueda.css'

const V = 'vtex-store-components-3-x-'
const MAX_RESULTADOS = 8
const MAX_RECIENTES = 5
const CLAVE_RECIENTES = 'd1-busquedas-recientes'

const leerRecientes = () => {
  try {
    const lista = JSON.parse(window.localStorage.getItem(CLAVE_RECIENTES) ?? '[]')
    return Array.isArray(lista) ? lista.filter((t) => typeof t === 'string').slice(0, MAX_RECIENTES) : []
  } catch {
    return []
  }
}
const guardarRecientes = (lista) => {
  try {
    window.localStorage.setItem(CLAVE_RECIENTES, JSON.stringify(lista))
  } catch {
    /* sin almacenamiento: las recientes duran solo esta visita */
  }
}

// Valor que se actualiza con un retraso corto, para que los resultados en vivo no parpadeen.
function useDebounced(value, ms) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), ms)
    return () => clearTimeout(id)
  }, [value, ms])
  return debounced
}

const categoriasSugeridas = quickAccess.slice(0, 6)

export default function SearchBar({ id = 'search-input' }) {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [query, setQuery] = useState(params.get('_q') ?? '')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const [recientes, setRecientes] = useState(leerRecientes)
  const [top, setTop] = useState(0)
  const anchorRef = useRef(null)
  const inputRef = useRef(null)

  const debounced = useDebounced(query, 150)
  const q = debounced.trim()
  const escribiendo = query.trim().length > 0
  const modoResultados = escribiendo && q.length >= 2
  const resultados = modoResultados ? suggestProducts(q, MAX_RESULTADOS) : []
  const sinResultados = modoResultados && resultados.length === 0

  const cerrar = useCallback(() => {
    setOpen(false)
    setActive(-1)
  }, [])

  // Clic fuera del buscador cierra el panel.
  useEffect(() => {
    if (!open) return undefined
    const fuera = (e) => {
      if (anchorRef.current && !anchorRef.current.contains(e.target)) cerrar()
    }
    document.addEventListener('mousedown', fuera)
    document.addEventListener('touchstart', fuera)
    return () => {
      document.removeEventListener('mousedown', fuera)
      document.removeEventListener('touchstart', fuera)
    }
  }, [open, cerrar])

  // En móvil el panel es fijo y ocupa todo el ancho: se coloca justo debajo de la barra.
  useEffect(() => {
    if (!open) return undefined
    const medir = () => {
      if (anchorRef.current) setTop(Math.round(anchorRef.current.getBoundingClientRect().bottom + 6))
    }
    medir()
    window.addEventListener('scroll', medir, { passive: true })
    window.addEventListener('resize', medir)
    return () => {
      window.removeEventListener('scroll', medir)
      window.removeEventListener('resize', medir)
    }
  }, [open])

  const buscar = (texto) => {
    const t = texto.trim()
    if (!t) return
    const nuevas = [t, ...recientes.filter((r) => r.toLowerCase() !== t.toLowerCase())].slice(0, MAX_RECIENTES)
    setRecientes(nuevas)
    guardarRecientes(nuevas)
    setQuery(t)
    cerrar()
    navigate(searchUrl(t))
  }

  const irA = (href) => {
    cerrar()
    const destino = internalPath(href)
    if (destino) navigate(destino)
  }

  // Grupos del panel. Cada opción tiene su acción; el teclado recorre todas en orden.
  const grupos = []
  if (modoResultados && resultados.length > 0) {
    grupos.push({
      clave: 'productos',
      titulo: 'Productos (A–Z)',
      tipo: 'lista',
      opciones: [
        ...resultados.map((p) => ({ clave: p.href, producto: p, accion: () => irA(p.href) })),
        { clave: 'todos', etiqueta: 'Ver todos los resultados', todos: true, accion: () => buscar(q) },
      ],
    })
  } else {
    if (sinResultados) grupos.push({ clave: 'vacio', mensaje: `No encontramos productos con '${q}'. Prueba con otra palabra.` })
    if (!modoResultados && recientes.length > 0) {
      grupos.push({
        clave: 'recientes',
        titulo: 'Búsquedas recientes',
        tipo: 'chips',
        limpiar: true,
        opciones: recientes.map((t) => ({ clave: t, etiqueta: t, accion: () => buscar(t) })),
      })
    }
    if (!modoResultados) {
      grupos.push({
        clave: 'populares',
        titulo: 'Búsquedas populares',
        tipo: 'chips',
        opciones: popularSearches.map((s) => ({ clave: s.href, etiqueta: s.label, accion: () => buscar(s.label) })),
      })
    }
    grupos.push({
      clave: 'categorias',
      titulo: 'Categorías sugeridas',
      tipo: 'chips',
      opciones: categoriasSugeridas.map((c) => ({ clave: c.href, etiqueta: c.label, accion: () => irA(c.href) })),
    })
  }
  let n = 0
  grupos.forEach((g) => g.opciones?.forEach((o) => { o.idx = n++ }))
  const total = n

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      if (!open) return setOpen(true)
      if (!total) return undefined
      setActive((a) => (e.key === 'ArrowDown' ? (a + 1) % total : a <= 0 ? total - 1 : a - 1))
    } else if (e.key === 'Escape') {
      cerrar() // el foco se queda en la barra
    }
    return undefined
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const elegida = grupos.flatMap((g) => g.opciones ?? []).find((o) => o.idx === active)
    if (elegida) return elegida.accion()
    return buscar(query)
  }

  const idOpcion = (i) => `${id}-op-${i}`

  return (
    <div
      className={`d1tiendas-commons-components-1-x-containerLayout d1tiendas-commons-components-1-x-containerLayout--main-header d1tiendas-commons-components-1-x-containerLayout--header d1tiendas-commons-components-1-x-containerLayout--search-bar-container flex ph0 ph4-ns w-100`}
    >
      <div className={`w-100 mw7 pv4 ${V}searchBarContainer`}>
        <div className={`w-100 ${V}searchBarInnerContainer ${V}searchBarInnerContainer--search-bar`}>
          <label htmlFor={id} className={`${V}visuallyHidden`}>
            ¿Qué estás buscando?
          </label>
          <div ref={anchorRef} className={`${V}autoCompleteOuterContainer ${V}autoCompleteOuterContainer--search-bar d1-search-anchor`}>
            <form className="w-100 flex" onSubmit={onSubmit} role="search">
              <label className="vtex-input w-100">
                <div className="vtex-input-prefix__group flex flex-row items-stretch overflow-hidden b--solid b--muted-4 h-large">
                  <input
                    ref={inputRef}
                    id={id}
                    type="text"
                    autoComplete="off"
                    placeholder="¿Qué estás buscando?"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value)
                      setActive(-1)
                      setOpen(true)
                    }}
                    onKeyDown={onKeyDown}
                    onFocus={() => setOpen(true)}
                    onClick={() => setOpen(true)}
                    role="combobox"
                    aria-expanded={open}
                    aria-controls={`${id}-panel`}
                    aria-autocomplete="list"
                    aria-activedescendant={open && active >= 0 ? idOpcion(active) : undefined}
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

            {open && (
              <div id={`${id}-panel`} className="d1-search-panel" style={{ '--d1-search-top': `${top}px` }}>
                <div className="d1-search-panel__bar">
                  <span>{escribiendo ? 'Resultados' : 'Buscar'}</span>
                  <button type="button" className="d1-search-panel__close" onMouseDown={(e) => e.preventDefault()} onClick={cerrar}>
                    Cerrar
                  </button>
                </div>
                <div role="listbox" aria-label="Sugerencias de búsqueda" onMouseDown={(e) => e.preventDefault()}>
                  {grupos.map((g) =>
                    g.mensaje ? (
                      <p key={g.clave} className="d1-search-panel__vacio" role="status">
                        {g.mensaje}
                      </p>
                    ) : (
                      <section key={g.clave} className="d1-search-group" aria-label={g.titulo}>
                        <h3 className="d1-search-group__title">
                          {g.titulo}
                          {g.limpiar && (
                            <button
                              type="button"
                              className="d1-search-group__clear"
                              onClick={() => {
                                setRecientes([])
                                guardarRecientes([])
                              }}
                            >
                              Borrar
                            </button>
                          )}
                        </h3>
                        <ul className={g.tipo === 'chips' ? 'd1-chips' : 'd1-search-list'}>
                          {g.opciones.map((o) => (
                            <li
                              key={o.clave}
                              id={idOpcion(o.idx)}
                              role="option"
                              aria-selected={o.idx === active}
                              className={o.todos ? 'd1-search-all' : undefined}
                              onClick={o.accion}
                            >
                              {o.producto ? (
                                <ResultadoProducto producto={o.producto} query={q} />
                              ) : (
                                <span className={g.tipo === 'chips' ? 'd1-chip' : undefined}>{o.etiqueta}</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </section>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ResultadoProducto({ producto, query }) {
  return (
    <span className="d1-result">
      <img src={asset(producto.image)} alt="" width="40" height="40" loading="lazy" />
      <span className="d1-result__text">
        <span className="d1-result__name">
          {resaltar(producto.name, query).map((t, k) => (t.negrita ? <mark key={k}>{t.texto}</mark> : <span key={k}>{t.texto}</span>))}
        </span>
        <span className="d1-result__price">{producto.price}</span>
      </span>
      {estaAgotado(producto.href) && <span className="d1-result__agotado">Agotado</span>}
    </span>
  )
}
