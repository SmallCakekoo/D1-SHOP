import { useSearchParams } from 'react-router-dom'
import CategoryPage from './CategoryPage'
import SearchPage from './SearchPage'

// "/:slug" es una categoría, salvo que traiga ?_q=... (búsqueda del sitio).
export default function SlugPage() {
  const [params] = useSearchParams()
  const query = params.get('_q')?.trim()
  return query ? <SearchPage query={query} /> : <CategoryPage />
}
