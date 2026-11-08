// DATOS DE PRUEBA (cambio 1, pago seguro): textos de ejemplo para la copia universitaria.
// No son certificaciones reales ni describen un sistema de pago real: esta copia no procesa pagos.
export const sellosPago = [
  { icon: 'hpa-lock', titulo: 'Conexión cifrada', detalle: 'Tus datos viajan protegidos.' },
  { icon: 'hpa-check-circle', titulo: 'No guardamos tu tarjeta', detalle: 'El pago lo hace tu banco.' },
  { icon: 'mpa-credit-card', titulo: 'Pagas como prefieras', detalle: 'PSE, tarjeta o contra entrega.' },
]

export const metodosPago = [
  { id: 'pse', nombre: 'PSE', detalle: 'Débito desde tu cuenta bancaria.' },
  { id: 'tarjeta', nombre: 'Tarjeta débito o crédito', detalle: 'Visa y Mastercard.' },
  { id: 'contraentrega', nombre: 'Pago contra entrega', detalle: 'Pagas cuando recibes tu pedido.' },
]

export const explicacionSeguridad = [
  {
    titulo: '¿Cómo protegemos tu pago?',
    texto: 'Los datos de pago se envían cifrados y los procesa tu banco; la tienda no los ve ni los guarda.',
  },
  {
    titulo: '¿Y tus datos personales?',
    texto: 'Solo usamos los datos que necesitas para entregar tu pedido y nunca los compartimos para publicidad.',
  },
  {
    titulo: '¿Algo salió mal?',
    texto: 'Si tienes un cobro que no reconoces, escríbenos y lo revisamos contigo.',
  },
]
