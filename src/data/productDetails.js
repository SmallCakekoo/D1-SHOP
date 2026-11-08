import { kitDetails } from './kitDetails'

// Detalle de producto extraído de d1.com.co. Las llaves son el path público de cada producto.
const IMG = 'https://d1tiendas.vtexassets.com/arquivos/ids'

export const productDetails = {
  ...kitDetails,
  '/miel-de-abejas-meel-350g-12000826/p': {
    name: 'Miel de Abejas Meel 350 Grs',
    brand: 'MEEL',
    plu: '12000826',
    price: '$ 8.900',
    pum: { label: '350 gr (gr a', value: '$ 25.43' },
    breadcrumb: [
      { label: 'Despensa', href: 'https://www.d1.com.co/despensa' },
      { label: 'Dulcería', href: 'https://www.d1.com.co/despensa/dulceria' },
    ],
    images: [
      `${IMG}/200000-800-800?v=639179651200530000&height=800&aspect=true`,
      `${IMG}/200001-800-800?v=639179651224500000&height=800&aspect=true`,
      `${IMG}/200002-800-800?v=639179651238030000&height=800&aspect=true`,
      `${IMG}/200003-800-800?v=639179651255030000&height=800&aspect=true`,
    ],
    descriptionHtml: `<h2>Nombre del producto: Miel de Abejas MEEL 350 g</h2><br>
<p><strong>Descripción del producto:</strong></p>
<p>Disfruta de la pureza natural con la Miel de Abejas MEEL, natural. Ideal para endulzar de forma saludable tus comidas y bebidas favoritas. Producto listo para su consumo.</p><br>
<p><strong>Características del Producto:</strong></p>
<ul>
<li><strong>Tamaño:</strong> 14cm x 8cm</li>
<li><strong>Peso:</strong> 350 g</li>
<li><strong>Modo de fabricación:</strong> Industrial</li>
<li><strong>Conservación:</strong> Consérvese bien cerrado en un lugar limpio, seco, fresco y alejado de la luz directa del sol. No refrigerar para evitar una rápida cristalización.</li>
<li><strong>Origen:</strong> Nacional</li>
</ul>
<p><strong>Componentes:</strong></p>
<ul><li>Miel de abejas natural</li></ul>
<p><strong>¡Queremos que tengas la mejor experiencia! Si tienes dudas sobre este producto o su contenido, te invitamos a consultar nuestros Términos y condiciones para conocer más sobre devoluciones y nuestras políticas de reembolsos.</strong></p>`,
  },
}
