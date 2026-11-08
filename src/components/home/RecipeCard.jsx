import { asset } from '../../utils/asset'

const R = 'd1tiendas-sanity-vtex-client-3-x-content_card_summary'

export default function RecipeCard({ recipe }) {
  return (
    <div className={`${R} ${R}--container`}>
      <a href={recipe.href} className={`${R} ${R}--link link no-underline inherit-color flex flex-column`}>
        <div className={`${R} ${R}--image_container`}>
          <img src={asset(recipe.image)} alt={`Receta ${recipe.title}`} loading="lazy" className={`${R} ${R}--image`} />
        </div>
        <div className={`${R} ${R}--content`}>
          <p className={`${R} ${R}--category`}>{recipe.category}</p>
          <h3 className={`${R} ${R}--title`}>{recipe.title}</h3>
          <div className="d1tiendas-sanity-vtex-client-3-x-price">{recipe.price}</div>
          <div className={`${R}__button_container`}>
            <button
              type="button"
              className="bg-action-primary b--action-primary c-on-action-primary pointer vtex-button bw1 ba fw5 v-mid relative pa0 lh-solid br2 min-h-regular t-action"
            >
              <div className="vtex-button__label flex items-center justify-center h-100 ph6">Ver receta</div>
            </button>
          </div>
        </div>
      </a>
    </div>
  )
}
