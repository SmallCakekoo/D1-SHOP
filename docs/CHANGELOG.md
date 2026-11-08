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
