import { useEffect, useState } from 'react'

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const media = window.matchMedia(query)
    const onChange = () => setMatches(media.matches)
    onChange()
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [query])

  return matches
}

// Mobile-first: por debajo de 1024px (breakpoint "l" de tachyons) se usa el layout móvil.
export const useIsDesktop = () => useMediaQuery('(min-width: 64em)')

// Teléfono: hasta 768 px de ancho (la página de producto y la vista rápida tienen diseño propio aquí).
export const useIsPhone = () => useMediaQuery('(max-width: 768px)')
