import HeroSlider from '../components/home/HeroSlider'
import CategoryCards from '../components/home/CategoryCards'
import ProductShelf from '../components/home/ProductShelf'
import RecipesShelf from '../components/home/RecipesShelf'
import { shelves } from '../data/shelves'

export default function Home() {
  return (
    <div className="vtex-render__container-id-sanity-home">
      <HeroSlider />
      <CategoryCards />
      {shelves.map((shelf) => (
        <ProductShelf key={shelf.id} shelf={shelf} />
      ))}
      <RecipesShelf />
    </div>
  )
}
