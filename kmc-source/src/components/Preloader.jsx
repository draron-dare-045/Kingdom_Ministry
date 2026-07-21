import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { org } from '../data'

const MIN_DISPLAY_MS = 2600
const EXIT_ANIM_MS = 600

export default function Preloader({ onDone }) {
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const showTimer = setTimeout(() => setExiting(true), MIN_DISPLAY_MS)
    return () => clearTimeout(showTimer)
  }, [])

  useEffect(() => {
    if (!exiting) return
    const t = setTimeout(() => {
      document.body.style.overflow = ''
      onDone()
    }, EXIT_ANIM_MS)
    return () => clearTimeout(t)
  }, [exiting, onDone])

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, transition: { duration: EXIT_ANIM_MS / 1000, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[100] bg-cream overflow-hidden"
        >
          <div className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-forest/10 blur-[110px]" />
          <div className="absolute -bottom-32 -left-32 w-[420px] h-[420px] rounded-full bg-gold/15 blur-[110px]" />

          {/* Outer div: centering ONLY, no animation — so nothing ever
              overwrites this transform.
              Inner motion.div: animation ONLY, no positioning classes —
              it just inherits its position from the parent. */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <motion.img
                src="/logo.svg"
                alt={org.name}
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                className="w-56 h-56 sm:w-72 sm:h-72 object-contain rounded-3xl shadow-lift"
              />
            </motion.div>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-sm px-6 flex flex-col items-center top-[calc(50%+132px)] sm:top-[calc(50%+172px)]">
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="font-display text-3xl sm:text-4xl font-semibold text-ink tracking-tight text-center"
            >
              {org.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-2 text-center text-sm text-muted"
            >
              {org.tagline}
            </motion.p>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: (MIN_DISPLAY_MS - 200) / 1000, ease: 'easeInOut' }}
            className="absolute bottom-14 left-1/2 -translate-x-1/2 w-[160px] h-[2px] origin-left rounded-full"
            style={{ background: 'linear-gradient(135deg, #031B10 0%, #113925 100%)' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
