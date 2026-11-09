import { useState } from 'react'
import Icon from '../ui/Icon'
import { HeartOutlineIcon } from '../ui/InlineIcons'
import '../../styles/galeria.css'

const V = 'vtex-store-components-3-x-'

// Botones redondos de la versión móvil: agregar a lista y favorito (estado local, como en las tarjetas).
function BotonesRedondos() {
  const [enLista, setEnLista] = useState(false)
  const [favorito, setFavorito] = useState(false)
  return (
    <div className="d1-gallery-actions">
      <button type="button" aria-label="Agregar a lista" aria-pressed={enLista} onClick={() => setEnLista((v) => !v)}>
        <Icon id={enLista ? 'hpa-shoppinglist-active' : 'hpa-shoppinglist'} size={18} />
      </button>
      <button type="button" aria-label="Agregar a favoritos" aria-pressed={favorito} onClick={() => setFavorito((v) => !v)}>
        {favorito ? <Icon id="hpa-wishlist-active" size={18} /> : <HeartOutlineIcon width={18} height={18} />}
      </button>
    </div>
  )
}

// phone: tarjeta gris a todo el ancho, botones redondos arriba a la derecha, sin flechas y con tira de miniaturas.
// miniaturas: 'varias' (solo si hay más de una imagen) o 'siempre'.
export default function ProductGallery({ images, name, phone = false, miniaturas = 'varias' }) {
  const [index, setIndex] = useState(0)
  const last = images.length - 1
  const go = (i) => setIndex(Math.min(last, Math.max(0, i)))
  const conFlechas = images.length > 1 && !phone
  const conMiniaturas = phone ? miniaturas === 'siempre' || images.length > 1 : images.length > 1

  return (
    <div className={`${V}productImagesContainer ${V}productImagesContainer--carousel ${V}content w-100 ${phone ? 'd1-gallery--phone' : ''}`}>
      <div className={`${V}carouselContainer relative overflow-hidden w-100`}>
        <div className={`w-100 border-box relative ${phone ? 'd1-gallery-card' : ''}`}>
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
          {phone && <BotonesRedondos />}
          {conFlechas && (
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

        {conMiniaturas && (
          <div className={phone ? 'd1-gallery-thumbs' : `${V}carouselGaleryThumbs dn h-auto mt3 db-ns`}>
            <div className="flex">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  aria-label={`Ver imagen ${i + 1}`}
                  className={`${V}productImagesThumb mb5 pointer ${phone ? 'd1-thumb' : 'w-20'} relative bn bg-transparent pa0`}
                  onClick={() => setIndex(i)}
                >
                  <img src={src} alt="" className={`${V}thumbImg w-100 h-auto db`} />
                  <div
                    className={`absolute absolute--fill b--solid ${phone ? 'b--action-primary' : 'b--muted-2'} ${V}carouselThumbBorder`}
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
