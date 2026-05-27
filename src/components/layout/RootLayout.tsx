import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToHash from './ScrollToHash'

export default function RootLayout() {
  return (
    <div className="layout">
      <Navbar />
      <ScrollToHash />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
