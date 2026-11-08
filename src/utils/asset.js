// Las rutas locales ("img/...") se resuelven contra la base de Vite; las URLs remotas pasan igual.
export const asset = (src) => (/^https?:/.test(src) ? src : `${import.meta.env.BASE_URL}${src}`)
