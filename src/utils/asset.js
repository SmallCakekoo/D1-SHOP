// Las rutas locales ("img/...") se resuelven contra la base de Vite; las URLs remotas pasan igual.
export const asset = (src) => (/^https?:/.test(src) ? src : `${import.meta.env.BASE_URL}${src}`)

// Las tarjetas traen la imagen en 197×197; el detalle del producto pide la versión grande (800×800) del mismo archivo.
export const imagenGrande = (src) =>
  /vtexassets/.test(src) ? src.replace('-197-197', '-800-800').replace('width=197&height=197', 'width=800&height=800') : src
