# CHANGELOG – Rediseño de la copia de D1 para subir la confianza

Copia universitaria (Interacción Socio-Tecnológica, Universidad Icesi). No es la tienda real y no procesa pagos.
Cada cambio vive en su propia rama de git, apilada sobre la anterior (`main` = copia original).
Capturas: `docs/capturas/antes/` y `docs/capturas/despues/` (escritorio 1440 px y móvil 390 px, mismos nombres).
Regenerarlas: `node docs/capturar.js antes|despues`.

**Punto de partida (n = 25):** Institucional 61 · Interpersonal 62 · Dispositional 46 · Confianza total 56,3.
**Metas:** H1 institucional ≥ 71 · H2 interpersonal ≥ 70 · H3 dispositional se mantiene (±5).

> Los textos de políticas, reseñas y agotados son **datos de prueba**, marcados en el código (`// DATOS DE PRUEBA`) y, cuando se ven, en pantalla.

---

## Cambio 1 – Pago seguro  (`cambio-1-pago-seguro`)
- **Problema:** seguridad de datos y pago puntúa 3,36/5. El botón "Ir a pagar" sacaba a la persona a otro sitio sin explicar nada de seguridad.
- **Qué cambiamos:** franja de sellos en el carrito, y una pantalla propia `/checkout` (simulada) con métodos de pago claros (PSE, tarjeta, contra entrega), sellos y tres preguntas que explican cómo se protege el pago. No pide tarjeta ni usa claves.
- **Variable y pregunta:** Institucional · `INST_SEC`.
- **Archivos:** `src/pages/CheckoutPage.jsx`, `src/components/ui/PaymentSeals.jsx`, `src/data/pagoSeguro.js`, `src/styles/pago-seguro.css`, `src/components/layout/MiniCart.jsx`, `src/App.jsx`.
- **Capturas:** antes `08-carrito-con-producto-*` · después `08-carrito-con-producto-*` y `11-checkout-*` (pantalla nueva).
- **Medición 2:** comparar `INST_SEC` (3,36 al inicio). Se espera que suba y que arrastre Institucional.

## Cambio 2 – Devoluciones y atención accesibles  (`cambio-2-devoluciones-ayuda`)
- **Problema:** políticas y respaldo legal es lo más bajo de lo institucional (3,28/5) y benevolencia lo más bajo de integridad/capacidad/benevolencia (3,28). Devolución era lo mejor valorado (3,64) pero estaba escondida en el pie de página.
- **Qué cambiamos:** resumen de devolución de 3 líneas en la ficha del producto y en el carrito; botón flotante "Ayuda" (teléfono, correo, devoluciones) en todas las páginas; página `/devoluciones` con la política corta.
- **Variable y pregunta:** Institucional e Interpersonal · `INST_GUAR`, `INST_LEG`, `ABI_BENE`.
- **Archivos:** `src/pages/ReturnsPage.jsx`, `src/components/layout/HelpButton.jsx`, `src/components/ui/ReturnPolicySummary.jsx`, `src/data/politicas.js`, `src/styles/ayuda.css`, `src/components/product/ProductInfo.jsx`, `src/components/layout/MiniCart.jsx`, `src/App.jsx`.
- **Capturas:** antes `05-producto-*`, `08-carrito-con-producto-*` · después los mismos y `12-devoluciones-*`.
- **Medición 2:** `INST_GUAR`, `INST_LEG` (3,28) y `ABI_BENE` (3,28).
- **Dato de prueba:** el plazo de 5 días y las condiciones son de ejemplo, no la política real de D1.

## Cambio 3 – Productos agotados  (`cambio-3-agotados`)
- **Problema:** la tienda no tenía estado de agotado: todo se podía comprar. Eso afecta la integridad (`ABI_INTEG`, 3,56).
- **Qué cambiamos:** los productos agotados se ven con la etiqueta "Agotado", imagen atenuada, botón deshabilitado y aviso en la ficha; no se pueden agregar al carrito.
- **Variable y pregunta:** Interpersonal · `ABI_INTEG`.
- **Archivos:** `src/utils/stock.js`, `src/data/inventario.js`, `src/styles/agotado.css`, `src/components/home/ProductCard.jsx`, `src/components/product/ProductInfo.jsx`, `src/context/CartContext.jsx`.
- **Capturas:** antes `01-inicio-*` · después `01-inicio-*` y `13-producto-agotado-*`.
- **Medición 2:** `ABI_INTEG`.
- **Dato de prueba:** 5 productos marcados como agotados sin relación con el inventario real (`src/data/inventario.js`).

## Cambio 4 – Reseñas  (`cambio-4-resenas`)
- **Problema:** no había opiniones de otras personas en los productos; la capacidad (3,52) e integridad (3,56) se apoyan en señales de terceros.
- **Qué cambiamos:** estrellas y cantidad en cada tarjeta y en la ficha; sección "Reseñas" en la página del producto.
- **Variable y pregunta:** Interpersonal · `ABI_ABIL`, `ABI_INTEG`.
- **Archivos:** `src/components/product/Stars.jsx`, `src/components/product/ProductReviews.jsx`, `src/data/resenas.js`, `src/utils/resenas.js`, `src/styles/resenas.css`, `src/components/home/ProductCard.jsx`, `src/components/product/ProductInfo.jsx`, `src/pages/ProductPage.jsx`.
- **Capturas:** antes `01-inicio-*`, `05-producto-*` · después los mismos.
- **Medición 2:** `ABI_ABIL`, `ABI_INTEG`.
- **Dato de prueba:** las reseñas son inventadas, genéricas y llevan la insignia "Reseña de ejemplo" y un aviso visible. **Avisar a las participantes** al aplicar la encuesta para no inducir una confianza basada en opiniones falsas.

## Cambio 5 – Ficha de producto coherente  (`cambio-5-ficha-coherente`)
- **Problema:** solo un producto y los kits tenían descripción, cada una con formato distinto; los demás no tenían ninguna.
- **Qué cambiamos:** una ficha con los mismos siete campos y el mismo orden en todos los productos (marca, PLU, presentación, descripción, conservación, origen, componentes). Lo que no se sabe dice "No informado"; no se inventó información.
- **Variable y pregunta:** Interpersonal · `ABI_ABIL`.
- **Archivos:** `src/components/product/ProductSheet.jsx`, `src/utils/ficha.js`, `src/data/fichas.js`, `src/styles/ficha.css`, `src/pages/ProductPage.jsx`.
- **Capturas:** antes `05-producto-*`, `06-producto-basico-*` · después los mismos.
- **Medición 2:** `ABI_ABIL`.
- **Nota:** la ficha de la miel y de los kits se armó con los textos que ya estaban en la copia. En los kits se conserva el bloque de condiciones de compra.

## Cambio 6 – Búsqueda y orden alfabético  (`cambio-6-busqueda-orden`)
- **Problema:** la búsqueda solo reconocía unos pocos términos populares y no había orden alfabético.
- **Qué cambiamos:** búsqueda sobre todo el catálogo de la copia (sin importar tildes ni plurales simples), sugerencias de productos en orden alfabético mientras se escribe, y órdenes "Nombre: A a Z" / "Z a A" en los listados.
- **Variable y pregunta:** Interpersonal · `ABI_ABIL`.
- **Archivos:** `src/utils/search.js`, `src/components/layout/Header/SearchBar.jsx`, `src/components/category/ProductListing.jsx`.
- **Capturas:** antes `03-busqueda-*` · después `03-busqueda-*` y `15-busqueda-sugerencias-*`.
- **Medición 2:** `ABI_ABIL`.
- **Límite:** el catálogo de la copia es pequeño (productos de la portada, una categoría y las búsquedas populares).

## Cambio 7 – Tienda más cercana  (`cambio-7-tienda-cercana`)
- **Problema:** políticas y respaldo (3,28) y benevolencia (3,28) mejoran si hay una presencia física concreta. La primera compra confía menos (54) que la recurrente (62).
- **Qué cambiamos:** bloque "Tu tienda más cercana" en el pie de página y en `/devoluciones`: se elige la ciudad (o se usa la ubicación del dispositivo, sin enviarla a ningún servidor) y muestra hasta tres tiendas con dirección, horario y teléfono de atención.
- **Variable y pregunta:** Institucional e Interpersonal · `INST_LEG`, `ABI_BENE`.
- **Archivos:** `src/components/stores/NearestStore.jsx`, `src/styles/tienda-cercana.css`, `src/components/footer/FooterContact.jsx`, `src/pages/ReturnsPage.jsx`.
- **Capturas:** antes `01-inicio-*` (pie) · después `16-tienda-cercana-*`.
- **Medición 2:** `INST_LEG`, `ABI_BENE`.
- **Datos:** direcciones y horarios salen de la lista de tiendas que ya estaba en la copia (`src/data/stores.json`). Esa lista no trae teléfono por tienda, así que se muestra el de atención al cliente.

---

## Pendientes y advertencias
- Siguen existiendo enlaces del pie de página, del ingreso y de las imágenes hacia d1.com.co y otros sitios reales; no se cambiaron porque no estaban en la lista. Solo "Ir a pagar" se redirigió al checkout simulado.
- El checkout no valida formularios porque no tiene campos de entrada de datos personales ni de tarjeta.
- Las capturas de página completa muestran el encabezado y el botón "Ayuda" a mitad de imagen: es un efecto de capturar páginas largas con elementos fijos.

---

## Pulido de confianza  (`pulido-confianza`)
Ajustes antes de las capturas finales. No hay modo captura ni interruptores: la tienda se ve siempre como una tienda normal.

**Datos de ejemplo (solo marcados en el código con `// DATOS DE PRUEBA`, no en pantalla):**
- Cambio 1 – sellos, métodos y textos de seguridad: `src/data/pagoSeguro.js`.
- Cambio 2 – plazos y condiciones de devolución: `src/data/politicas.js`.
- Cambio 3 – productos agotados: `src/data/inventario.js`.
- Cambio 4 – reseñas, nombres, estrellas y fechas: `src/data/resenas.js`.
- Cambio 7 – tiendas: lista que ya traía la copia, `src/data/stores.json` (sin teléfono por tienda).
- La tabla completa está en el `README.md`.

| Punto | Qué cambió | Archivos |
|---|---|---|
| 0. Sin avisos | Se quitaron de la interfaz todos los textos «copia de prueba», «simulación» y «reseña de ejemplo». Textos que había: checkout (aviso, botón y pantalla final), `/devoluciones` (aviso), reseñas (aviso e insignia en cada reseña) y la etiqueta de accesibilidad de las estrellas. | `CheckoutPage.jsx`, `ReturnsPage.jsx`, `ProductReviews.jsx`, `Stars.jsx`, estilos, `README.md` |
| 1. Pago seguro | «Confirmar pedido» sin «(simulación)». Iconos de los sellos dibujados enteros (caja fija de 40 px, `flex-shrink: 0`, viewBox 24×24, padding) en carrito y `/checkout`. | `InlineIcons.jsx`, `PaymentSeals.jsx`, `pagoSeguro.js`, `pago-seguro.css`, `CheckoutPage.jsx` |
| 2. Ayuda | Icono «?» a la izquierda del texto del botón flotante y en el encabezado del panel. | `HelpButton.jsx`, `ayuda.css`, `InlineIcons.jsx` |
| 3. Agotados | La portada oculta los agotados; búsqueda, categoría y URL directa los muestran con «Agotado». La regla vive en un solo lugar: `seMuestraEn(href, contexto)`. Un estante sin productos no se pinta. | `utils/stock.js`, `ProductShelf.jsx`, `SearchPage.jsx` |
| 4. Reseñas | Nombres colombianos genéricos con inicial del apellido (10 reseñas de ejemplo, de 3 a 6 por producto). Estrellas de las tarjetas = promedio de la ficha. | `data/resenas.js` |
| 6. Búsqueda | Sugerencias tituladas «Productos (A–Z)», máx. 8, con la coincidencia en negrita, flechas y Enter, y mensaje si no hay resultados. Resultados: «N resultados para 'x'», selector «Ordenar por» visible con Nombre A–Z (por defecto), Nombre Z–A y Relevancia, letras separadoras y orden recordado al afinar la búsqueda. Los listados de categoría usan las mismas opciones. | `SearchBar.jsx`, `utils/search.js`, `SearchPage.jsx`, `ProductListing.jsx`, `SortDropdown.jsx`, `busqueda.css` |
| 7. Tienda cercana | Tarjeta propia con borde fino, esquinas redondeadas, padding uniforme, ancho completo de su columna y tarjetas de tienda separadas. | `tienda-cercana.css` |

**Capturas nuevas:** `17-resultados-az-*`, `18-resultados-agotado-*`, `19-inicio-sin-agotados-*`; actualizada `15-busqueda-sugerencias-*`. Todas las de «después» se regeneraron.
`SOLO=17,18 node capturar.js despues` genera solo algunas.

## Pie de página a todo el ancho  (`pulido-footer`)
- **Problema:** en pantallas anchas (≥1536 px) las franjas «compras seguras» y «Suscríbete» quedaban en una columna central con márgenes grises a los costados.
- **Qué cambió:** el fondo de cada franja se extiende de borde a borde (blanco, gris muy claro y gris del pie), y el contenido conserva su ancho máximo. Sin cambios de contenido.
- **Archivos:** `src/styles/footer.css`, `src/components/footer/Footer.jsx`.

## Tarjetas compactas, más dulces y sin enlaces a d1.com.co
- **Tarjetas:** menos espacio entre nombre, reseñas, precio y botón (se ocultan los contenedores vacíos, imagen de 168 px, botón de 36 px). Archivo: `src/styles/tarjetas.css`.
- **Más productos:** el estante «Halloween Dulces D1 para mi» pasó de 4 a 48 productos, extraídos una sola vez de la categoría Dulcería de la página original (nombre, marca, precio e imagen). No hay conexión en vivo. Archivo: `src/data/shelves.js`.
- **Enlaces:** ningún `href` apunta a d1.com.co (ni a otros dominios de D1 como tiendasd1.com, Freshdesk o sivaseguro). Lo que existe en la copia se enlaza por rutas propias; lo que no, va a `#` (`src/components/ui/AppLink.jsx`). Se dejan los `mailto:` de atención al cliente, las redes sociales, las tiendas de apps y terceros (BBVA, SIC, ABACO).
- **Pendiente conocido:** las imágenes de producto siguen cargándose desde el CDN de D1 (`d1tiendas.vtexassets.com`).

## Ajustes de UI  (`ajustes-ui`)
| Punto | Qué cambió | Archivos |
|---|---|---|
| 4. Panel de búsqueda | Se abre justo debajo de la barra, con su mismo ancho (esquinas redondeadas, borde fino, sombra suave). Vacío: búsquedas recientes, populares y categorías sugeridas, como chips y sin imágenes de producto. Al escribir: resultados en vivo con retraso de 150 ms, «Productos (A–Z)», máximo 8, con miniatura, nombre con coincidencia en negrita, precio y «Agotado», más «Ver todos los resultados». Sin coincidencias: mensaje y categorías a la vista. Flechas, Enter, Escape y clic fuera; el foco se queda en la barra. En móvil ocupa todo el ancho, con chips en dos filas y botón «Cerrar». | `SearchBar.jsx`, `busqueda.css` |
| 5. Barra inferior móvil | Barra fija con Inicio, Mis listas, Tiendas (botón destacado al centro), Categorías y Perfil; solo ≤ 768 px. Activo en rojo, área segura de iPhone (`viewport-fit=cover`), espacio al final del contenido y botones «Ayuda» y «Volver arriba» elevados. «Categorías» abre el menú del encabezado. Íconos propios 24×24 (el sprite mezcla tamaños y los recortaba). | `BottomNav.jsx`, `barra-inferior.css`, `InlineIcons.jsx`, `CategoriesMenu.jsx`, `App.jsx`, `index.html` |
| 6. Tipo de envío | Se eliminó «Selecciona el tipo de envío» del home y los botones de la franja superior, junto con el código que solo usaban ellos (`ShippingOptions`, `ChangeShippingOption`, `shippingOptions`). «Dirección de envío» no se tocó. | `Header/index.jsx`, `Home.jsx`, `data/navigation.js` |

**Capturas nuevas:** `20-inicio-barra-inferior`, `21-panel-busqueda-defecto`, `22-panel-busqueda-vivo`, `23-encabezado-sin-envios` (en 1440 y 390 px).

- **Detalle de producto:** la foto principal usa la versión grande (800×800) y ocupa todo el ancho de su columna; antes, los productos que venían de los estantes mostraban la miniatura de 197 px. Archivos: `src/utils/asset.js`, `src/pages/ProductPage.jsx`, `src/styles/galeria.css`.
- **Ajustes de UI – franja de categorías fuera:** se quitó la franja de pastillas bajo el encabezado (escritorio, móvil y barra compacta). El menú «Categorías» ahora navega (antes era decorativo) y suma «Bono Remerca D1» y «Donaciones», que solo estaban en la franja. Archivos: `Header/index.jsx`, `Header/CategoriesMenu.jsx`, `data/navigation.js`, `styles/app.css`; se eliminó `QuickAccessMenu.jsx`.
- **Ajustes de UI – aire antes del pie:** 64 px (escritorio) y 40 px (móvil) entre «Suscríbete» y el pie, con los fondos a todo el ancho. Archivos: `components/footer/Footer.jsx`, `styles/footer.css`.
