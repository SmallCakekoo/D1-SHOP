import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../ui/Icon'
import { HelpCircleIcon } from '../ui/InlineIcons'
import { contact } from '../../data/footer'
import '../../styles/ayuda.css'

// Botón flotante de ayuda (cambio 2): el canal de atención está a un clic desde cualquier página.
export default function HelpButton() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div className="d1-help">
      {open && (
        <div className="d1-help__panel" role="dialog" aria-label="Ayuda y atención al cliente">
          <strong className="d1-help__head">
            <HelpCircleIcon width={20} height={20} /> ¿Necesitas ayuda?
          </strong>
          <a href={contact.phone.href}>
            <Icon id="mpa-phone" size={18} /> {contact.phone.label}
          </a>
          <a href={contact.email.href}>
            <Icon id="mpa-mail" size={18} /> {contact.email.label}
          </a>
          <Link to="/devoluciones" onClick={() => setOpen(false)}>
            Devoluciones y garantías
          </Link>
        </div>
      )}
      <button type="button" className="d1-help__btn" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <HelpCircleIcon width={20} height={20} />
        {open ? 'Cerrar' : 'Ayuda'}
      </button>
    </div>
  )
}
