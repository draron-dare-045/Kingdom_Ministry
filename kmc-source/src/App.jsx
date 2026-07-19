import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingWhatsapp from './components/FloatingWhatsapp'
import RouteTransition from './components/RouteTransition'

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <div className="min-h-screen bg-bg text-text font-body selection:bg-leaf">
      {loading && <Preloader onDone={() => setLoading(false)} />}

      <RouteTransition />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </motion.div>

      {!loading && <FloatingWhatsapp />}
    </div>
  )
}
