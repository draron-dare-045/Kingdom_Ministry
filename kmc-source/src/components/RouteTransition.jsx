import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

export default function RouteTransition() {
  const location = useLocation()
  const [active, setActive] = useState(false)
  const firstRun = useRef(true)

  useEffect(() => {
    // Skip the very first mount — the full Preloader already covers that.
    if (firstRun.current) {
      firstRun.current = false
      return
    }

    window.scrollTo(0, 0)
    setActive(true)
    const t = setTimeout(() => setActive(false), 450)
    return () => clearTimeout(t)
  }, [location.pathname])

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="route-bar"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="fixed top-0 left-0 h-[3px] w-full bg-brand-gradient origin-left z-[200]"
        />
      )}
    </AnimatePresence>
  )
}
