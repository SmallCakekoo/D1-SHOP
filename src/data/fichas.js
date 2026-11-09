// Cambio 5: datos de ficha para los productos que ya tenían descripción en la copia.
// Salen de los textos que ya estaban en productDetails.js y kitDetails.js (no se inventó nada).
// Lo que no se sabe de un producto se muestra como "No informado" (ver utils/ficha.js).
export const fichas = {
  '/miel-de-abejas-meel-350g-12000826/p': {
    descripcion: 'Miel de abejas natural, ideal para endulzar comidas y bebidas. Producto listo para su consumo.',
    presentacion: '350 g · 14 cm x 8 cm',
    conservacion:
      'Consérvese bien cerrado en un lugar limpio, seco, fresco y alejado de la luz directa del sol. No refrigerar para evitar una rápida cristalización.',
    origen: 'Nacional',
    componentes: ['Miel de abejas natural'],
    nota: 'Si tienes dudas sobre este producto o su contenido, consulta los Términos y condiciones sobre devoluciones y reembolsos.',
  },
}

// Aviso verde de la versión móvil para los kits de donación.
export const AVISO_DONACION = {
  titulo: 'Tu aporte suma:',
  texto: 'Este producto no se entrega en tu domicilio ni se retira en tienda, va directo a los bancos de alimentos.',
}

const AVISO_KIT =
  'Este kit es una donación: su contenido no se entrega al comprador, sino a familias afectadas a través de ABACO (Asociación de Alimentos de Colombia).'

const kit = (componentes) => ({
  donacion: true,
  descripcion: 'Kit de donación con productos de primera necesidad.',
  origen: 'Nacional',
  componentes,
  nota: AVISO_KIT,
})

fichas['/kit-donacion1-d1-12009594/p'] = kit([
  'Jabón líquido NF avena y coco 500 ml',
  'Cepillo de dientes suave Bucarine x 2',
  'Papel higiénico 3 hojas x 2 Rendy 33 m',
  'Crema dental tri acción Bucarine 150 ml',
])
fichas['/kit-donacion-2-d1-12009595/p'] = kit([
  'Jabón líquido NF avena y coco 500 ml',
  'Cepillo de dientes ultra suave Bucarine x 1',
  'Papel higiénico 3 hojas x 2 Rendy 33 m',
  'Alcohol antiséptico Purix 375 ml',
  'Toallitas húmedas Little Angels x 72',
  'Crema dental gel Bucarine 150 ml',
  'Desodorante roll on Xen 75 ml',
  'Toalla femenina normal Fresh & Free x 12',
])
fichas['/kit-donacion-3-d1-12009596/p'] = kit([
  'Arroz económico Albar 450 g',
  'Atún rallado El Navío 170 g',
  'Spaghetti Caprissima 250 g',
  'Sal Refisal 1000 g',
  'Cabello de ángel Caprissima 250 g',
  'Harina de maíz blanco Quicksy 1 kg',
  'Avena en hojuelas Fit Graan 400 g',
])
fichas['/kit-donacion-4-d1-12009597/p'] = kit([
  'Arroz económico Albar 450 g (x 2)',
  'Atún rallado El Navío 170 g',
  'Conserva de pescado en tinapa 155 g neto',
  'Spaghetti Caprissima 250 g',
  'Leche en polvo entera Latti 350 g',
  'Sal Refisal 1000 g',
  'Frijol rojo El Estío 500 g',
  'Aceite Imata 400 ml',
])
