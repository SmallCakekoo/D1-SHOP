import { useMemo, useState } from 'react'
import { CartContext } from './cartStore'
import { priceValue } from '../utils/links'

// El mismo producto puede llegar como URL absoluta (tarjetas) o como ruta (página de producto).
const keyOf = (href) => href.replace(/^https?:\/\/www\.d1\.com\.co/, '')

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const value = useMemo(
    () => ({
      items,
      count: items.reduce((total, item) => total + item.quantity, 0),
      total: items.reduce((total, item) => total + priceValue(item.price) * item.quantity, 0),
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem(product) {
        setItems((current) => {
          const key = keyOf(product.href)
          const found = current.find((item) => keyOf(item.href) === key)
          if (found) {
            return current.map((item) =>
              keyOf(item.href) === key ? { ...item, quantity: item.quantity + 1 } : item,
            )
          }
          return [...current, { ...product, quantity: 1 }]
        })
      },
      // Con cantidad 0 el producto sale del carrito.
      setQuantity(href, quantity) {
        setItems((current) =>
          quantity <= 0
            ? current.filter((item) => keyOf(item.href) !== keyOf(href))
            : current.map((item) => (keyOf(item.href) === keyOf(href) ? { ...item, quantity } : item)),
        )
      },
      removeItem(href) {
        setItems((current) => current.filter((item) => keyOf(item.href) !== keyOf(href)))
      },
    }),
    [items, isOpen],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
