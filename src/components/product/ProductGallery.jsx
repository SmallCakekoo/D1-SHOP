import { useState } from 'react'
import Icon from '../ui/Icon'

const V = 'vtex-store-components-3-x-'

export default function ProductGallery({ images, name }) {
  const [index, setIndex] = useState(0)
  const last = images.length - 1
  const go = (i) => setIndex(Math.min(last, Math.max(0, i)))

  return (
    <div className={`${V}productImagesContainer ${V}productImagesContainer--carousel ${V}content w-100`}>
      <div className={`${V}carouselContainer relative overflow-hidden w-100`}>
        <div className="w-100 border-box relative">
          <div className="overflow-hidden">
            <div
              className="flex"
              style={{ transform: `translate3d(-${index * 100}%, 0, 0)`, transition: 'transform 300ms' }}
            >
              {images.map((src, i) => (
                <div key={src} className={`${V}productImagesGallerySlide center-all flex-none w-100`}>
                  <div className={`${V}productImage`}>
                    <img
                      src={src}
                      alt={`${name} - imagen ${i + 1}`}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      className={`${V}productImageTag ${V}productImageTag--main`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {images.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Imagen siguiente"
                disabled={index === last}
                className={`${V}swiperCaret ${V}swiperCaretNext pl7 pr2 right-0 pv8 absolute top-50 z-2 pointer c-action-primary bn bg-transparent`}
                onClick={() => go(index + 1)}
              >
                <Icon id="nav-caret--right" />
              </button>
              <button
                type="button"
                aria-label="Imagen anterior"
                disabled={index === 0}
                className={`${V}swiperCaret ${V}swiperCaretPrev pr7 pl2 left-0 pv8 absolute top-50 z-2 pointer c-action-primary bn bg-transparent`}
                onClick={() => go(index - 1)}
              >
                <Icon id="nav-caret--left" />
              </button>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className={`${V}carouselGaleryThumbs dn h-auto mt3 db-ns`}>
            <div className="flex">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  aria-label={`Ver imagen ${i + 1}`}
                  className={`${V}productImagesThumb mb5 pointer w-20 relative bn bg-transparent pa0`}
                  onClick={() => setIndex(i)}
                >
                  <img src={src} alt="" className={`${V}thumbImg w-100 h-auto db`} />
                  <div
                    className={`absolute absolute--fill b--solid b--muted-2 ${V}carouselThumbBorder`}
                    style={{ borderWidth: i === index ? 2 : 0 }}
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
