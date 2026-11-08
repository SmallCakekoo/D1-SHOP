import { useEffect, useState } from 'react'
import Icon from '../ui/Icon'

const V = 'vtex-store-components-3-x-'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <div className={`${V}backToTopButtonContainer z-999 fixed bottom-2 right-2 ${V}backToTopButtonActive`}>
      <button
        type="button"
        aria-label="Volver arriba"
        className="vtex-button bw1 ba fw5 v-mid relative pa0 lh-solid br2 min-h-regular t-action bg-action-primary b--action-primary c-on-action-primary pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <div className="vtex-button__label flex items-center justify-center h-100 ph6">
          <Icon id="nav-caret--up" size={16} />
        </div>
      </button>
    </div>
  )
}
