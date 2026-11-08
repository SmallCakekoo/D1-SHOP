import ChangeShippingOption from '../components/home/ChangeShippingOption'
import HeroSlider from '../components/home/HeroSlider'
import CategoryCards from '../components/home/CategoryCards'
import ProductShelf from '../components/home/ProductShelf'
import RecipesShelf from '../components/home/RecipesShelf'
import { useIsDesktop } from '../hooks/useMediaQuery'
import { shelves } from '../data/shelves'

export default function Home() {
  const isDesktop = useIsDesktop()

  return (
    <div className="vtex-render__container-id-sanity-home">
      {!isDesktop && <ChangeShippingOption />}
      <HeroSlider />
      <CategoryCards />
      {shelves.map((shelf) => (
        <ProductShelf key={shelf.id} shelf={shelf} />
      ))}
      <RecipesShelf />
    </div>
  )
}
