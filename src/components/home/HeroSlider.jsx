import Slider from '../ui/Slider'
import { asset } from '../../utils/asset'
import { heroSlides } from '../../data/home'
import AppLink from '../ui/AppLink'

const P = 'd1tiendas-commons-components-1-x-'

export default function HeroSlider() {
  return (
    <div
      aria-label="Carrusel de imágenes promocionales"
      className={`${P}containerLayout ${P}containerLayout--max-width ${P}containerLayout--banners-home ${P}containerLayout--section-space-left ${P}containerLayout--section-space-right ${P}containerLayout--sanity pv6`}
    >
      <Slider id="hero-slider" loop autoplay={5000} dots>
        {heroSlides.map((slide) => (
          <AppLink
            key={slide.image}
            href={slide.href}
            className={`${P}imageElementLink vtex-store-components-3-x-imageElementLink`}
          >
            <picture>
              <source media="(max-width: 63.99em)" srcSet={slide.imageMobile} />
              <img
                src={asset(slide.image)}
                alt=""
                className={`${P}imageElement vtex-store-components-3-x-imageElement`}
                style={{ maxHeight: 420, width: '100%' }}
              />
            </picture>
          </AppLink>
        ))}
      </Slider>
    </div>
  )
}
