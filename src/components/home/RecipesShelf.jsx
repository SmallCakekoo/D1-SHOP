import Slider from '../ui/Slider'
import RecipeCard from './RecipeCard'
import { recipes } from '../../data/home'

const P = 'd1tiendas-commons-components-1-x-'
const BREAKPOINTS = [[0, 1], [640, 2], [1024, 4]]

export default function RecipesShelf() {
  return (
    <div className={`${P}containerLayout ${P}containerLayout--max-width ${P}containerLayout--shelf ${P}containerLayout--section-space-top ${P}containerLayout--section-space-bottom ${P}containerLayout--sanity w-100`}>
      <div className={`${P}containerLayout ${P}containerLayout--shelf-header ${P}containerLayout--shelf-header-recipe ${P}containerLayout--sanity flex w-100 justify-between items-center pb7 section-space-left section-space-right`}>
        <div className={`${P}containerLayout ${P}containerLayout--shelf-title ${P}containerLayout--sanity`}>
          <section className={`${P}renderWrapper ${P}renderWrapper--title-mix-colors ${P}renderWrapper--sanity sanity`}>
            <div className={`${P}container flex tl items-start justify-start t-body c-on-base`}>
              <div className={`${P}wrapper`}>
                <p className={`lh-copy ${P}paragraph`}>
                  Las mejores recetas <span className={`b ${P}strong`}>con productos D1</span>
                </p>
              </div>
            </div>
          </section>
        </div>
        <div className={`${P}containerLayout ${P}containerLayout--shelf-subTitle ${P}containerLayout--sanity`}>
          <div className={`${P}container flex tl items-start justify-start t-body c-on-base`}>
            <div className={`${P}wrapper`}>
              <p className={`lh-copy ${P}paragraph`}>
                Selecciona cuántas personas son y agrega todos los ingredientes al carrito en un clic.
              </p>
            </div>
          </div>
        </div>
        <section className={`${P}renderWrapper ${P}renderWrapper--section-link ${P}renderWrapper--view-all ${P}renderWrapper--sanity sanity`}>
          <a href="https://www.d1.com.co/blog/receta" className={`${P}link`}>
            <span className={`${P}label`}>Ver todas las recetas</span>
          </a>
        </section>
      </div>

      <Slider id="recipes-slider" breakpoints={BREAKPOINTS}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.href} recipe={recipe} />
        ))}
      </Slider>
    </div>
  )
}
