import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Header from './components/layout/Header'
import BackToTop from './components/layout/BackToTop'
import MiniCart from './components/layout/MiniCart'
import Footer from './components/footer/Footer'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import RemercaPage from './pages/RemercaPage'
import SlugPage from './pages/SlugPage'
import LoginPage from './pages/LoginPage'
import CheckoutPage from './pages/CheckoutPage'

// El mapa (Leaflet) y los datos de tiendas solo se cargan al entrar a /tiendas.
const StoresPage = lazy(() => import('./pages/StoresPage'))

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="flex flex-column min-vh-100 w-100">
          <BackToTop />
          <MiniCart />
          <Header />
          <main className="flex flex-grow-1 w-100 flex-column">
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tiendas" element={<StoresPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/account" element={<LoginPage />} />
                <Route path="/remerca/p" element={<RemercaPage />} />
                <Route path="/:slug/p" element={<ProductPage />} />
                <Route path="/:slug" element={<SlugPage />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  )
}
