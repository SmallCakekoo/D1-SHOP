import { Children, useEffect, useState } from 'react'
import Icon from './Icon'

const P = 'd1tiendas-commons-components-1-x-'

// breakpoints: [[minWidth, perPage], ...] ordenados de menor a mayor.
function usePerPage(breakpoints) {
  const compute = () => {
    let perPage = breakpoints[0][1]
    for (const [min, value] of breakpoints) if (window.innerWidth >= min) perPage = value
    return perPage
  }
  const [perPage, setPerPage] = useState(compute)
  useEffect(() => {
    const onResize = () => setPerPage(compute())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  })
  return perPage
}

export default function Slider({
  id,
  children,
  breakpoints = [[0, 1]],
  loop = false,
  autoplay = 0,
  dots = false,
}) {
  const slides = Children.toArray(children)
  const total = slides.length
  const perPage = usePerPage(breakpoints)
  const maxIndex = Math.max(0, total - perPage)
  const [index, setIndex] = useState(0)
  const current = Math.min(index, maxIndex)

  const go = (target) => {
    if (target > maxIndex) setIndex(loop ? 0 : maxIndex)
    else if (target < 0) setIndex(loop ? maxIndex : 0)
    else setIndex(target)
  }

  useEffect(() => {
    if (!autoplay || maxIndex === 0) return undefined
    const timer = setInterval(() => setIndex((i) => (i >= maxIndex ? 0 : i + 1)), autoplay)
    return () => clearInterval(timer)
  }, [autoplay, maxIndex])

  return (
    <section
      id={id}
      aria-label="slider"
      style={{ touchAction: 'pan-y' }}
      className={`w-100 flex items-center relative ${P}sliderLayoutContainer`}
    >
      <div className={`w-100 ${P}sliderTrackContainer overflow-hidden`}>
        <div
          className={`${P}sliderTrack flex justify-around relative pa0 ma0`}
          style={{
            width: `${(total / perPage) * 100}%`,
            transform: `translate3d(-${(current * 100) / total}%, 0, 0)`,
            transition: 'transform 400ms',
          }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className={`${P}slide flex relative`}
              style={{ width: `${100 / total}%` }}
            >
              <div className={`${P}slideChildrenContainer flex justify-center items-center w-100`}>
                {slide}
              </div>
            </div>
          ))}
        </div>
      </div>

      {maxIndex > 0 && (
        <>
          <button
            type="button"
            className={`${P}sliderLeftArrow left-0 ${P}sliderArrows absolute transparent ma2 flex items-center justify-center bn outline-0 pointer`}
            style={{ background: 'transparent' }}
            aria-label="Diapositiva anterior"
            onClick={() => go(current - 1)}
          >
            <Icon id="nav-thin-caret--left" size={14} className={`${P}caretIcon`} />
          </button>
          <button
            type="button"
            className={`${P}sliderRightArrow right-0 ${P}sliderArrows absolute transparent ma2 flex items-center justify-center bn outline-0 pointer`}
            style={{ background: 'transparent' }}
            aria-label="Diapositiva siguiente"
            onClick={() => go(current + 1)}
          >
            <Icon id="nav-thin-caret--right" size={14} className={`${P}caretIcon`} />
          </button>
        </>
      )}

      {dots && maxIndex > 0 && (
        <div
          className={`${P}paginationDotsContainer flex absolute justify-center ma0 bottom-0 left-0 right-0`}
        >
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <div
              key={i}
              role="button"
              tabIndex={0}
              aria-label={`Ir a la diapositiva ${i + 1} de ${maxIndex + 1}`}
              className={`${P}paginationDot ${
                i === current ? `${P}paginationDot--isActive bg-emphasis` : 'bg-muted-3'
              } grow dib br-100 pa2 mr2 ml2 bw0 pointer`}
              style={{ height: '0.625rem', width: '0.625rem' }}
              onClick={() => go(i)}
              onKeyDown={(e) => e.key === 'Enter' && go(i)}
            />
          ))}
        </div>
      )}
    </section>
  )
}
