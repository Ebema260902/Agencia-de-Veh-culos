import { Routes, Route } from 'react-router-dom'
import RootLayout from '@/components/layout/RootLayout'
import Home from '@/pages/Home'
import Catalog from '@/pages/Catalog'
import CarDetail from '@/pages/CarDetail'
import NotFound from '@/pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="catalogo" element={<Catalog />} />
        <Route path="catalogo/:id" element={<CarDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
