// Genera todas las capturas de la copia local de D1 en escritorio (1440 px) y móvil (390 px).
//
// Uso (desde docs/):
//   node capturar.js antes      -> docs/capturas/antes/
//   node capturar.js despues    -> docs/capturas/despues/
//
// Los nombres de archivo son iguales en las dos carpetas para poder compararlas.
// Si no hay servidor en BASE_URL, el script levanta el de Vite (npm run dev) y lo apaga al final.
// Solo apunta a localhost: no toca la tienda real.

import { chromium } from 'playwright'
import { spawn } from 'node:child_process'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const AQUI = path.dirname(fileURLToPath(import.meta.url))
const RAIZ = path.resolve(AQUI, '..')
const PUERTO = process.env.PUERTO ?? '5199'
const BASE = process.env.BASE_URL ?? `http://localhost:${PUERTO}`

const momento = process.argv[2]
if (!['antes', 'despues'].includes(momento)) {
  console.error('Uso: node capturar.js antes|despues')
  process.exit(1)
}
const SALIDA = path.join(AQUI, 'capturas', momento)

const TAMANOS = [
  { nombre: 'escritorio', width: 1440, height: 900 },
  { nombre: 'movil', width: 390, height: 844 },
]

const PRODUCTO = '/miel-de-abejas-meel-350g-12000826/p' // tiene descripción completa
const PRODUCTO_BASICO = '/kit-donacion1-d1-12009594/p' // solo datos mínimos de la home

// Cada captura: nombre fijo + ruta + pasos opcionales antes de fotografiar.
// Si un cambio agrega una pantalla nueva, se agrega aquí una línea nueva en ambos momentos.
const PAGINAS = [
  { nombre: '01-inicio', ruta: '/' },
  { nombre: '02-categoria', ruta: '/extraordinario-de-temporada' },
  { nombre: '03-busqueda', ruta: '/miel?map=ft&_q=miel' },
  { nombre: '04-busqueda-sin-resultados', ruta: '/zzzz?map=ft&_q=zzzz' },
  { nombre: '05-producto', ruta: PRODUCTO, abrirDescripcion: true },
  { nombre: '06-producto-basico', ruta: PRODUCTO_BASICO },
  { nombre: '07-carrito-vacio', ruta: '/', abrirCarrito: true },
  { nombre: '08-carrito-con-producto', ruta: PRODUCTO, agregarYAbrirCarrito: true },
  { nombre: '09-tiendas', ruta: '/tiendas' },
  { nombre: '10-ingreso', ruta: '/login' },
]

async function responde(url) {
  try {
    return (await fetch(url)).ok
  } catch {
    return false
  }
}

async function levantarServidor() {
  if (await responde(BASE)) return null
  console.log(`Levantando Vite en ${BASE} ...`)
  const proceso = spawn('npm', ['run', 'dev', '--', '--port', PUERTO, '--strictPort'], {
    cwd: RAIZ,
    shell: true,
    stdio: 'ignore',
  })
  for (let i = 0; i < 60; i++) {
    if (await responde(BASE)) return proceso
    await new Promise((r) => setTimeout(r, 1000))
  }
  proceso.kill()
  throw new Error('Vite no arrancó en 60 s')
}

function apagar(proceso) {
  if (!proceso) return
  // En Windows hay que matar el árbol completo (npm -> node -> vite).
  if (process.platform === 'win32') spawn('taskkill', ['/pid', String(proceso.pid), '/T', '/F'], { stdio: 'ignore' })
  else proceso.kill()
}

async function esperarImagenes(page) {
  await page.waitForLoadState('networkidle').catch(() => {})
  await page.evaluate(async () => {
    // Las imágenes de los estantes usan loading="lazy": se fuerzan para que salgan en la captura.
    document.querySelectorAll('img[loading="lazy"]').forEach((img) => (img.loading = 'eager'))
    await Promise.all(
      [...document.images].map((img) =>
        img.complete ? null : new Promise((ok) => { img.onload = img.onerror = ok }),
      ),
    )
  })
  await page.waitForTimeout(400)
}

async function capturar(browser, tamano, pagina) {
  const context = await browser.newContext({
    viewport: { width: tamano.width, height: tamano.height },
    deviceScaleFactor: 1,
    locale: 'es-CO',
    isMobile: tamano.nombre === 'movil',
    hasTouch: tamano.nombre === 'movil',
  })
  const page = await context.newPage()
  await page.goto(BASE + pagina.ruta, { waitUntil: 'domcontentloaded' })
  await page.waitForSelector('main', { timeout: 15000 })

  // Banners de cookies/ubicación del sitio, si el rediseño los agrega, no deberían tapar nada.
  if (pagina.abrirDescripcion) {
    await page.getByRole('button', { name: /^Descripción/ }).click({ timeout: 5000 }).catch(() => {})
  }
  if (pagina.agregarYAbrirCarrito) {
    await page.getByRole('button', { name: /Agregar al Carrito/i }).first().click()
  }
  if (pagina.abrirCarrito || pagina.agregarYAbrirCarrito) {
    await page.getByRole('button', { name: /^Carrito, / }).first().click({ timeout: 5000 }).catch(() => {})
  }
  await esperarImagenes(page)

  const archivo = path.join(SALIDA, `${pagina.nombre}-${tamano.nombre}.png`)
  // El carrito es un panel fijo: se fotografía el viewport, no la página completa.
  const soloViewport = pagina.abrirCarrito || pagina.agregarYAbrirCarrito
  await page.screenshot({ path: archivo, fullPage: !soloViewport })
  await context.close()
  console.log('OK', path.relative(AQUI, archivo))
}

await mkdir(SALIDA, { recursive: true })
const servidor = await levantarServidor()
let browser
try {
  // Si Playwright pide una versión de Chromium que no está descargada, se puede apuntar a otra con:
  //   CHROMIUM_PATH="C:\...\chrome.exe" node capturar.js antes
  browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined })
  for (const tamano of TAMANOS) {
    for (const pagina of PAGINAS) {
      try {
        await capturar(browser, tamano, pagina)
      } catch (e) {
        console.error('FALLÓ', pagina.nombre, tamano.nombre, '-', e.message.split('\n')[0])
      }
    }
  }
} finally {
  await browser?.close()
  apagar(servidor)
}
