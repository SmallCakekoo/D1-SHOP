// Contenido del footer. Las rutas que no existen en esta copia apuntan a "#" (ver components/ui/AppLink.jsx)
// mientras la app no tenga esas páginas propias.
const SITE = ''
const IMG = 'https://d1tiendas.vtexassets.com/assets/vtex.file-manager-graphql/images'

export const footerDeals = [
  {
    image: `${IMG}/564e68c0-df38-47fd-8a1a-54048bca5a80___1dc7bb5bae8ec5bc421b29c8966317b4.webp`,
    title: 'Envíos a todo el país',
    text: 'Disfruta de los mejores productos D1 y recíbelos en la puerta de tu casa.',
  },
  {
    image: `${IMG}/f458dadf-17d4-45a4-9055-70098b09a52d___d663e8aced59e4c46f079ec195957473.webp`,
    title: 'Compras seguras',
    text: 'Contamos con un sistema seguro para la protección de tus datos personales.',
  },
  {
    image: `${IMG}/379a3420-d7c1-4bab-afec-fe6b692c3c7d___143b231bf9961ec287335b3779d14443.webp`,
    title: 'Llámanos',
    text: 'Conoce nuestras líneas de atención telefónica. Para resolver tus inquietudes.',
    link: { label: 'Ver política completa', to: '/devoluciones' },
  },
]

export const newsletter = {
  image: `${IMG}/97f525db-c3fe-44d5-8d58-a5aa876e76bd___15e3a57e1158393749d92dbc473bb894.png`,
  dataAuthorizationHref: `${SITE}/pagina/autorizacion-tratamiento-de-datos`,
  dataPolicyHref: `${SITE}/pagina/tratamiento-de-datos`,
}

const site = (path) => `${SITE}${path}`

export const footerGroups = [
  {
    title: 'Corporativo',
    links: [
      { label: 'Historia', href: site('/pagina/historia') },
      { label: 'Calidad D1', href: site('/pagina/calidad-d1') },
      { label: 'Nuestras tiendas', href: site('/tiendas') },
      { label: 'Sostenibilidad', href: site('/pagina/sostenibilidad') },
      { label: 'Estados financieros', href: site('/pagina/linea-etica-d1/comunicados') },
      { label: 'Línea ética', href: site('/pagina/linea-etica-d1') },
    ],
  },
  {
    title: 'Servicio al cliente',
    links: [
      { label: 'Crear PQR', href: '#' },
      { label: 'Consultar PQR', href: '#' },
      { label: 'Crear PQR BBVA', href: 'https://peticiones.bbva.com.co/' },
      { label: 'Devolución por PSE', href: site('/pagina/devolucion-por-pse') },
      { label: 'Preguntas frecuentes', href: site('/pagina/preguntasfrecuentes') },
      { label: 'Garantías', href: site('/pagina/garantias') },
      { label: 'Superintendencia de industria y comercio SIC', href: 'https://sedeelectronica.sic.gov.co/' },
    ],
  },
  {
    title: 'Legales',
    links: [
      { label: 'Términos y condiciones', href: site('/pagina/terminos-y-condiciones') },
      { label: 'Tratamiento de datos', href: site('/pagina/tratamiento-de-datos') },
      { label: 'Ética y cumplimiento', href: site('/pagina/etica-y-cumplimiento') },
      {
        label: 'Política riesgos de LA/FT y FPADM',
        href: '#',
      },
      {
        label: 'Código ética',
        href: '#',
      },
      {
        label: 'Code of ethics',
        href: '#',
      },
    ],
  },
  {
    title: 'Links de interés',
    links: [
      { label: 'Facturación electrónica', href: '#' },
      { label: 'Recetas', href: site('/blog/receta') },
      { label: 'Información Nutricional', href: site('/landing/informacion-nutricional') },
      { label: 'Colores D1', href: site('/pagina/coloresd1') },
      { label: 'Rastrear pedido', href: site('/tracking') },
      { label: 'Promociones', href: site('/landing/promociones-de-la-semana') },
    ],
  },
]

export const contact = {
  phone: { label: '01 8000 120201', href: 'tel:01 8000 120201' },
  email: { label: 'atencion.cliente@d1.com.co', href: 'mailto:atencion.cliente@d1.com.co' },
}

export const socialLinks = [
  { id: 'inf-facebook', label: 'Facebook', href: 'https://www.facebook.com/TiendasD1/' },
  { id: 'inf-youtube', label: 'YouTube', href: 'https://www.youtube.com/@tiendasd1788' },
  { id: 'inf-instagram', label: 'Instagram', href: 'https://www.instagram.com/tiendas.d1/' },
  { id: 'inf-linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/tiendasd1/' },
  { id: 'inf-tiktok', label: 'TikTok', href: 'https://www.tiktok.com/@tiendas_d1_oficial' },
]

export const appLinks = [
  {
    label: 'Google Play',
    alt: 'Google',
    href: 'https://play.google.com/store/apps/details?id=com.koba.d1&pli=1',
    image: `${IMG}/8a94577b-1b0e-42a5-a855-8e5c771eea58___f9bad2fd778b9c99f684ea134af9f4d3.png`,
  },
  {
    label: 'App Store',
    alt: 'Apple',
    href: 'https://apps.apple.com/ve/app/tiendas-d1-app/id1516386669',
    image: `${IMG}/01783d8a-ed3c-4ddd-a36a-323a0c2e4888___23f48f5b5c6b5f1b18704c3b490a73d9.png`,
  },
]

export const paymentMethodsImage = `${IMG}/d0d92b8b-2ba8-438a-83d1-0addac3648bc___83879b5088c7c0383b24f7e30a26024a.png`
