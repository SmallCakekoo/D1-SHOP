# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## Datos de ejemplo (copia universitaria)

Esta es una copia hecha para un trabajo universitario. No procesa pagos ni usa claves. Los datos de ejemplo no se avisan en pantalla; viven marcados con `// DATOS DE PRUEBA` en el código:

| Cambio | Qué es de ejemplo | Archivo |
|---|---|---|
| 1. Pago seguro | Sellos, métodos de pago y textos de seguridad | `src/data/pagoSeguro.js` |
| 2. Devoluciones | Plazos y condiciones de la política | `src/data/politicas.js` |
| 3. Agotados | Productos marcados como agotados | `src/data/inventario.js` |
| 4. Reseñas | Reseñas, nombres, estrellas y fechas | `src/data/resenas.js` |
| 5. Ficha | Solo datos que ya estaban en la copia | `src/data/fichas.js` |
| 7. Tienda cercana | Datos de tiendas de la copia original (sin teléfono por tienda) | `src/data/stores.json` |
