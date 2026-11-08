export const normalize = (text) =>
  String(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim()

// "BOGOTA, D.C." -> "Bogota, D.C.": mayúscula solo en la primera letra de cada palabra.
export const titleCase = (text) => text.toLowerCase().replace(/(^|[\s,.(-])(\p{L})/gu, (_, sep, letter) => sep + letter.toUpperCase())

// "08:00-21:00" o "08:00 a 21:00" -> "8:00 AM a 9:00 PM"
function formatRange(range) {
  const match = String(range).match(/(\d{1,2}):(\d{2})\s*(?:-|a)\s*(\d{1,2}):(\d{2})/)
  if (!match) return range || 'Consultar horario'
  const clock = (h, m) => {
    const hour = Number(h)
    return `${hour % 12 || 12}:${m} ${hour >= 12 ? 'PM' : 'AM'}`
  }
  return `${clock(match[1], match[2])} a ${clock(match[3], match[4])}`
}

const toStore = ([id, name, address, city, department, lat, lng, week, holiday]) => ({
  id,
  name,
  address,
  city,
  department,
  lat,
  lng,
  schedule: `Lunes a Sábado de ${formatRange(week)} | Domingos y Festivos de ${formatRange(holiday)}`,
  url: '/tiendas',
})

// El archivo pesa ~350 KB; se descarga solo al entrar a /tiendas.
export const loadStores = () => import('../data/stores.json').then((module) => module.default.map(toStore))
