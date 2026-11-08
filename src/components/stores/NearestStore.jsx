import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../ui/Icon'
import { loadStores, titleCase } from '../../utils/stores'
import { contact } from '../../data/footer'
import '../../styles/tienda-cercana.css'

const GUARDADA = 'd1-ciudad-elegida'

// Distancia en km entre dos puntos (fórmula de haversine). Todo se calcula en el navegador.
function km(a, b) {
  const rad = (g) => (g * Math.PI) / 180
  const dLat = rad(b.lat - a.lat)
  const dLng = rad(b.lng - a.lng)
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2
  return 6371 * 2 * Math.asin(Math.sqrt(h))
}

const leer = () => {
  try {
    return window.localStorage.getItem(GUARDADA) ?? ''
  } catch {
    return ''
  }
}
const guardar = (valor) => {
  try {
    window.localStorage.setItem(GUARDADA, valor)
  } catch {
    /* sin almacenamiento: la ciudad solo se recuerda en esta visita */
  }
}

// Cambio 7: datos de contacto de la tienda más cercana. Usa la lista de tiendas que ya trae la copia
// (src/data/stores.json). Esa lista no trae teléfono por tienda: se muestra el de atención al cliente.
export default function NearestStore({ titulo = 'Tu tienda más cercana' }) {
  const [stores, setStores] = useState(null)
  const [error, setError] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [ciudad, setCiudad] = useState(leer)
  const [cercanas, setCercanas] = useState(null)
  const [aviso, setAviso] = useState('')

  const abrir = () => {
    setError(false)
    setCargando(true)
    loadStores().then(setStores, () => setError(true)).finally(() => setCargando(false))
  }

  const ciudades = useMemo(() => {
    const unicas = new Map()
    ;(stores ?? []).forEach((s) => unicas.set(`${s.city}|${s.department}`, s))
    return [...unicas.values()]
      .map((s) => ({ valor: `${s.city}|${s.department}`, etiqueta: `${titleCase(s.city)} (${titleCase(s.department)})` }))
      .sort((a, b) => a.etiqueta.localeCompare(b.etiqueta, 'es'))
  }, [stores])

  const lista = useMemo(() => {
    if (cercanas) return cercanas
    if (!stores || !ciudad) return []
    return stores.filter((s) => `${s.city}|${s.department}` === ciudad).slice(0, 3)
  }, [stores, ciudad, cercanas])

  const elegir = (valor) => {
    setCiudad(valor)
    setCercanas(null)
    setAviso('')
    guardar(valor)
  }

  const usarUbicacion = () => {
    setAviso('')
    if (!navigator.geolocation) return setAviso('Tu navegador no permite usar la ubicación. Elige tu ciudad.')
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const yo = { lat: coords.latitude, lng: coords.longitude }
        setCercanas(
          [...stores].sort((a, b) => km(yo, a) - km(yo, b)).slice(0, 3).map((s) => ({ ...s, distancia: km(yo, s) })),
        )
      },
      () => setAviso('No pudimos ver tu ubicación. Elige tu ciudad.'),
    )
  }

  return (
    <section className="d1-near" aria-labelledby="cerca-titulo">
      <h3 id="cerca-titulo" className="d1-near__title">
        <Icon id="hpa-pointer" size={18} /> {titulo}
      </h3>

      {!stores ? (
        <button type="button" className="d1-near__geo" onClick={abrir} disabled={cargando}>
          {error ? 'No pudimos cargar las tiendas. Reintentar' : cargando ? 'Cargando…' : 'Buscar mi tienda'}
        </button>
      ) : (
        <>
          <label className="d1-near__label" htmlFor="cerca-ciudad">Elige tu ciudad</label>
          <select id="cerca-ciudad" value={ciudad} onChange={(e) => elegir(e.target.value)}>
            <option value="">Selecciona…</option>
            {ciudades.map((c) => (
              <option key={c.valor} value={c.valor}>{c.etiqueta}</option>
            ))}
          </select>
          <button type="button" className="d1-near__geo" onClick={usarUbicacion}>
            Usar mi ubicación
          </button>
        </>
      )}
      {aviso && <p role="status" className="d1-near__aviso">{aviso}</p>}

      {lista.length > 0 && (
        <ul className="d1-near__list">
          {lista.map((s) => (
            <li key={s.id}>
              <strong>{titleCase(s.name)}</strong>
              {s.distancia != null && <span className="d1-near__km"> · a {s.distancia.toFixed(1).replace('.', ',')} km</span>}
              <span>{s.address}</span>
              <span>{s.schedule}</span>
              <a href={contact.phone.href}>Atención: {contact.phone.label}</a>
            </li>
          ))}
        </ul>
      )}
      <Link to="/tiendas" className="d1-near__all">Ver todas las tiendas</Link>
    </section>
  )
}
