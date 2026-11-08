import { useEffect } from 'react'
import { contact } from '../data/footer'
import NearestStore from '../components/stores/NearestStore'
import { politicaCompleta } from '../data/politicas'
import '../styles/ayuda.css'

// Política de devolución corta y clara (cambio 2). Textos de prueba: ver data/politicas.js.
export default function ReturnsPage() {
  useEffect(() => {
    document.title = 'Devoluciones | D1'
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="d1-policy">
      <h1>Devoluciones y atención al cliente</h1>
      <p className="d1-policy__prueba">Copia de prueba: plazos y condiciones de ejemplo.</p>
      {politicaCompleta.map((s) => (
        <section key={s.titulo}>
          <h2>{s.titulo}</h2>
          <p>{s.texto}</p>
        </section>
      ))}
      <section className="d1-policy__contact">
        <h2>Habla con nosotros</h2>
        <p>
          <a href={contact.phone.href}>{contact.phone.label}</a>
          <br />
          <a href={contact.email.href}>{contact.email.label}</a>
        </p>
      </section>
      <NearestStore />
    </div>
  )
}
