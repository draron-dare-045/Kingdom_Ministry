import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { org } from '../data'

const MIN_DISPLAY_MS = 2600
const EXIT_ANIM_MS = 600

export default function Preloader({ onDone }) {
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const timer = setTimeout(() => {
      setExiting(true)
    }, MIN_DISPLAY_MS)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!exiting) return

    const timer = setTimeout(() => {
      document.body.style.overflow = ''
      onDone()
    }, EXIT_ANIM_MS)

    return () => clearTimeout(timer)
  }, [exiting, onDone])

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.02,
            transition: {
              duration: EXIT_ANIM_MS / 1000,
              ease: 'easeInOut',
            },
          }}
          className="fixed inset-0 z-[100] bg-cream overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute -top-20 -right-20 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-forest/10 blur-[90px]" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gold/15 blur-[90px]" />

          {/* Main Content */}
          <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.img
                src="/logo.png"
                alt={org.name}
                animate={{ scale: [1, 1.04, 1] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 object-contain"
              />
            </motion.div>

            {/* Church Name */}
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mt-6 font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-kingdomGreen"
            >
              {org.name}
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-2 max-w-md text-sm sm:text-base text-muted"
            >
              {org.tagline}
            </motion.p>

            {/* Loading Bar */}
            <div className="mt-10 w-32 sm:w-40 overflow-hidden rounded-full">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: (MIN_DISPLAY_MS - 200) / 1000,
                  ease: 'easeInOut',
                }}
                className="h-[3px] origin-left rounded-full bg-gradient-to-r from-forest via-leaf to-gold"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}