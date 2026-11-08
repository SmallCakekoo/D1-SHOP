import { useEffect } from 'react'
import RemercaHero from '../components/remerca/RemercaHero'
import RemercaSteps from '../components/remerca/RemercaSteps'
import RemercaBuilder from '../components/remerca/RemercaBuilder'
import RemercaInfo from '../components/remerca/RemercaInfo'
import RemercaFaq from '../components/remerca/RemercaFaq'
import RemercaCta from '../components/remerca/RemercaCta'

export default function RemercaPage() {
  useEffect(() => {
    document.title = 'Bono Remerca D1 | D1'
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="vtex-render__container-id-pdp">
      <section className="d1tiendas-commons-components-1-x-content_pdpremerca">
        <RemercaHero />
        <RemercaSteps />
        <RemercaBuilder />
        <RemercaInfo />
        <RemercaFaq />
        <RemercaCta />
      </section>
    </div>
  )
}
