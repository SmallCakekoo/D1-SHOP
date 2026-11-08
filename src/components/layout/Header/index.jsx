import { useEffect, useRef, useState } from 'react'
import Logo from './Logo'
import CategoriesMenu from './CategoriesMenu'
import CoverageButton from './CoverageButton'
import SearchBar from './SearchBar'
import HeaderControls from './HeaderControls'
import QuickAccessMenu from '../QuickAccessMenu'
import { useIsDesktop } from '../../../hooks/useMediaQuery'

const C = 'd1tiendas-commons-components-1-x-containerLayout'
const STICKY = 'vtex-sticky-layout-0-x-container vtex-sticky-layout-0-x-container--sticky-header'

function DesktopHeader() {
  return (
    <>
      <div
        className={`${C} ${C}--desktop-header ${C}--max-width ${C}--header-main ${C}--header flex justify-between items-center section-space-left section-space-right`}
      >
        <Logo />
        <CategoriesMenu />
        <CoverageButton />
        <SearchBar />
        <HeaderControls />
      </div>
    </>
  )
}

function MobileSearchRow({ id }) {
  return (
    <div className={`${C} ${C}--header flex justify-between items-center ph4`}>
      <CategoriesMenu compact />
      <SearchBar id={id} />
    </div>
  )
}

function MobileHeader() {
  return (
    <>
      <div className={`${C} ${C}--header-main ${C}--header flex justify-between section-space-left section-space-right`}>
        <Logo />
        <HeaderControls />
      </div>
      <MobileSearchRow id="search-input" />
      <CoverageButton mobile />
    </>
  )
}

// En móvil el header completo vive en el flujo normal de la página; al bajar, una barra compacta
// (buscador + accesos rápidos) queda fija arriba. Así el alto del documento nunca cambia con el scroll.
function useScrolledPast(ref) {
  const [past, setPast] = useState(false)

  useEffect(() => {
    const update = () => {
      const bottom = ref.current ? ref.current.offsetHeight : 300
      setPast(window.scrollY > bottom)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [ref])

  return past
}

export default function Header() {
  const isDesktop = useIsDesktop()
  const ref = useRef(null)
  const stuck = useScrolledPast(ref)

  if (isDesktop) {
    return (
      <header className={`d1-sticky-header ${STICKY}`}>
        <DesktopHeader />
        <QuickAccessMenu />
      </header>
    )
  }

  return (
    <>
      <header ref={ref} className="d1-header-mobile">
        <MobileHeader />
        <QuickAccessMenu />
      </header>
      {stuck && (
        <div className={`d1-header-compact ${STICKY}`}>
          <MobileSearchRow id="search-input-compact" />
          <QuickAccessMenu />
        </div>
      )}
    </>
  )
}
