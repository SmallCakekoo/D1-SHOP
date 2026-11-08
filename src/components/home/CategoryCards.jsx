import Slider from '../ui/Slider'
import { categoryCards } from '../../data/home'
import { useIsDesktop } from '../../hooks/useMediaQuery'
import AppLink from '../ui/AppLink'

const P = 'd1tiendas-commons-components-1-x-'
const MOD = 'banners-categories'

function CategoryCard({ card }) {
  const m = (base) => `${P}${base} ${P}${base}--${MOD} ${P}${base}--home__slider ${P}${base}--sanity`
  return (
    <article className={m('cardLayout')}>
      <AppLink href={card.href} className={`${m('cardLayout__content')} db link`}>
        <div className={`${P}containerLayout ${P}containerLayout--image_wrapper ${P}containerLayout--sanity`}>
          <img src={card.image} alt={card.label} loading="lazy" className={`${m('cardLayout__image')} db`} />
        </div>
        <div className={`${P}container flex tc items-center justify-center t-body c-on-base`}>
          <div className={`${P}wrapper`}>
            <p className={`lh-copy ${P}paragraph`}>{card.label}</p>
          </div>
        </div>
      </AppLink>
    </article>
  )
}

export default function CategoryCards() {
  const isDesktop = useIsDesktop()

  return (
    <div
      className={`${P}containerLayout ${P}containerLayout--max-width ${P}containerLayout--${MOD} ${P}containerLayout--section-space-top ${P}containerLayout--section-space-bottom ${P}containerLayout--section-space-left ${P}containerLayout--section-space-right ${P}containerLayout--sanity ph4`}
    >
      <section className={`${P}renderWrapper ${P}renderWrapper--title-mix-colors ${P}renderWrapper--sanity sanity`}>
        <div className={`${P}container flex tl items-start justify-start t-body c-on-base`}>
          <div className={`${P}wrapper`}>
            <h1 className={`${P}heading t-heading-1 ${P}headingLevel1 vtex-rich-text-0-x-heading-level-1`}>
              Explora <span className={`b ${P}strong`}>por categoría</span>
            </h1>
          </div>
        </div>
      </section>

      <section className={`${P}highlightContent ${P}highlightContent--${MOD} ${P}highlightContent--home__slider ${P}highlightContent--sanity`}>
        {isDesktop ? (
          <Slider id="category-slider" breakpoints={[[0, 6]]}>
            {categoryCards.map((card) => (
              <CategoryCard key={card.href} card={card} />
            ))}
          </Slider>
        ) : (
          <div className={`${P}containerLayout w-100 pt3 pb2 mb2 flex items-center scroll-invisible`}>
            {categoryCards.map((card) => (
              <CategoryCard key={card.href} card={card} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
