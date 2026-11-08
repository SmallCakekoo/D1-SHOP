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
  // Pantallas nuevas: solo existen después del cambio que las crea.
  { nombre: '11-checkout', ruta: PRODUCTO, agregarYAbrirCarrito: true, irAPagar: true, soloDespues: true },
  { nombre: '12-devoluciones', ruta: '/devoluciones', soloDespues: true },
  { nombre: '13-producto-agotado', ruta: '/bocadillo-veleno-dulce-naturaleza-470g-12000515/p', soloDespues: true },
  { nombre: '15-busqueda-sugerencias', ruta: '/', escribir: 'que', soloDespues: true },
  { nombre: '16-tienda-cercana', ruta: '/', tiendaCercana: true, soloDespues: true },
  { nombre: '17-resultados-az', ruta: '/queso?map=ft&_q=queso', soloDespues: true },
  { nombre: '18-resultados-agotado', ruta: '/dulce?map=ft&_q=dulce', soloDespues: true },
  { nombre: '19-inicio-sin-agotados', ruta: '/', soloDespues: true },
  // Ajustes de UI: barra inferior, panel de búsqueda y encabezado sin franja de envíos.
  { nombre: '20-inicio-barra-inferior', ruta: '/', viewport: true, soloDespues: true },
  { nombre: '21-panel-busqueda-defecto', ruta: '/', abrirBuscador: true, viewport: true, soloDespues: true },
  { nombre: '22-panel-busqueda-vivo', ruta: '/', escribir: 'que', viewport: true, soloDespues: true },
  { nombre: '23-encabezado-sin-envios', ruta: '/', recorte: { x: 0, y: 0, width: 'ancho', height: 230 }, soloDespues: true },
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

  if (pagina.abrirBuscador) {
    await page.getByPlaceholder('¿Qué estás buscando?').locator('visible=true').first().click()
    await page.waitForTimeout(300)
  }

  if (pagina.escribir) {
    const campo = page.getByPlaceholder('¿Qué estás buscando?').locator('visible=true').first()
    await campo.click()
    await campo.fill(pagina.escribir)
    await page.waitForTimeout(300)
  }

  if (pagina.tiendaCercana) {
    await page.addStyleTag({ content: '.d1-help{display:none!important}' })
    await page.getByRole('button', { name: 'Buscar mi tienda' }).click()
    await page.locator('#cerca-ciudad').selectOption({ label: 'Medellin (Antioquia)' }).catch(async () => {
      await page.locator('#cerca-ciudad').selectOption({ index: 5 })
    })
    await page.waitForTimeout(300)
  }

  if (pagina.irAPagar) {
    await page.getByRole('link', { name: /Ir a pagar/ }).click()
    await page.waitForSelector('.d1-checkout')
    await esperarImagenes(page)
  }

  const archivo = path.join(SALIDA, `${pagina.nombre}-${tamano.nombre}.png`)
  // El carrito es un panel fijo: se fotografía el viewport, no la página completa.
  const soloViewport = ((pagina.abrirCarrito || pagina.agregarYAbrirCarrito) && !pagina.irAPagar) || pagina.escribir || pagina.viewport
  if (pagina.tiendaCercana) await page.locator('.d1-near').screenshot({ path: archivo })
  else if (pagina.recorte) await page.screenshot({ path: archivo, clip: { ...pagina.recorte, width: tamano.width } })
  else await page.screenshot({ path: archivo, fullPage: !soloViewport })
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
      if (pagina.soloDespues && momento === 'antes') continue
      // SOLO=01,05 genera solo esas capturas (por prefijo de nombre).
      if (process.env.SOLO && !process.env.SOLO.split(',').some((p) => pagina.nombre.startsWith(p))) continue
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
