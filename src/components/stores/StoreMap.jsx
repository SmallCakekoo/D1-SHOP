import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet.markercluster'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

const MARKER_ICON =
  'https://d1tiendas.vtexassets.com/assets/vtex.file-manager-graphql/images/a0f2903d-70af-4463-845c-8e8c93ae45e2___ae8985f87713374a78841aa5ce828720.svg'
const BOGOTA = [4.65, -74.1]

const icon = L.icon({ iconUrl: MARKER_ICON, iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -30] })

// Ventana emergente construida con nodos DOM (sin HTML en cadena) para no interpretar texto de los datos.
function popupContent(store) {
  const root = document.createElement('div')
  const title = document.createElement('strong')
  title.textContent = store.name
  const address = document.createElement('div')
  address.textContent = `${store.address} · ${store.city}`
  const schedule = document.createElement('div')
  schedule.textContent = store.schedule
  const link = document.createElement('a')
  link.href = store.url
  link.textContent = 'Ver tienda'
  link.rel = 'noopener noreferrer'
  root.append(title, address, schedule, link)
  return root
}

export default function StoreMap({ stores, selectedId, onSelect, fitKey }) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const clusterRef = useRef(null)
  const markersRef = useRef(new Map())
  const onSelectRef = useRef(onSelect)

  useEffect(() => {
    onSelectRef.current = onSelect
  }, [onSelect])

  useEffect(() => {
    const map = L.map(containerRef.current, { zoomControl: true }).setView(BOGOTA, 12)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map)
    const cluster = L.markerClusterGroup()
    map.addLayer(cluster)
    mapRef.current = map
    clusterRef.current = cluster
    const markers = markersRef.current
    return () => {
      map.remove()
      markers.clear()
    }
  }, [])

  // Marcadores: se rehacen cuando cambia el conjunto visible.
  useEffect(() => {
    const cluster = clusterRef.current
    cluster.clearLayers()
    markersRef.current.clear()
    const layers = stores.map((store) => {
      const marker = L.marker([store.lat, store.lng], { icon, alt: store.name, title: store.name })
      marker.bindPopup(() => popupContent(store))
      marker.on('click', () => onSelectRef.current(store.id))
      markersRef.current.set(store.id, marker)
      return marker
    })
    cluster.addLayers(layers)
  }, [stores])

  // Ajusta el encuadre cuando la persona cambia de filtro (no en la carga inicial).
  useEffect(() => {
    if (!fitKey || stores.length === 0) return
    const bounds = L.latLngBounds(stores.map((s) => [s.lat, s.lng]))
    mapRef.current.fitBounds(bounds, { padding: [30, 30], maxZoom: 15 })
  }, [fitKey, stores])

  useEffect(() => {
    if (!selectedId) return
    const marker = markersRef.current.get(selectedId)
    if (!marker) return
    const cluster = clusterRef.current
    cluster.zoomToShowLayer(marker, () => marker.openPopup())
  }, [selectedId])

  return <div ref={containerRef} className="d1tiendas-store-locator-1-x-mapContainer z-1" style={{ width: '100%', height: '100%', position: 'relative' }} />
}
