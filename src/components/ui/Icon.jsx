const SPRITE = `${import.meta.env.BASE_URL}sprite.svg`

export default function Icon({ id, size = 24, className = '' }) {
  return (
    <svg
      fill="none"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      aria-hidden="true"
    >
      <use href={`${SPRITE}#${id}`} />
    </svg>
  )
}
