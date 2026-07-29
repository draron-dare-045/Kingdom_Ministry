import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowDown, BookOpen } from 'lucide-react'
import { org, heroBadges } from '../data'

function ScriptureCard() {
  return (
    <div className="bg-white rounded-3xl border border-border overflow-hidden shadow-soft">
      <div className="flex items-center gap-2 px-5 py-3 border-b border-border bg-surfaceAlt">
        <BookOpen size={16} className="text-kingdomGreen" />
        <span className="font-label text-xs text-muted tracking-wide">
          {org.heroVerse.reference}
        </span>
      </div>

      <div className="p-6">
        <p className="font-display text-lg sm:text-xl leading-relaxed text-ink">
          “{org.heroVerse.text}”
        </p>

        <div className="mt-6 pt-5 border-t border-border flex items-center justify-between">
          <span className="font-label text-xs uppercase tracking-widest text-gold font-semibold">
            {org.verseTag}
          </span>

          <span className="font-label text-xs text-muted">
            {org.congregation}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-surface pt-24 pb-16"
    >
      {/* Background Pattern Only */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10" />

      {/* Top Accent Line */}
      <div className="absolute top-16 left-0 right-0 h-[2px] bg-gradient-to-r from-kingdomGreen via-gold to-kingdomGreen" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display font-bold leading-tight"
          >
            <span className="block text-4xl sm:text-5xl lg:text-6xl text-kingdomGreen">
              {org.name}
            </span>

            <span className="block mt-3 text-xl sm:text-2xl lg:text-3xl text-muted font-medium">
              {org.networkName}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 text-base sm:text-lg text-muted leading-relaxed max-w-xl"
          >
            {org.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              to="/founders"
              className="px-6 py-3 rounded-full bg-kingdomGreen text-white font-medium hover:opacity-90 transition"
            >
              Meet the Founders
            </Link>

            <Link
              to="/ministries"
              className="px-6 py-3 rounded-full border border-kingdomGreen text-kingdomGreen font-medium hover:bg-kingdomGreen hover:text-white transition"
            >
              Watch KCM-TV
            </Link>


            <Link
              to="/ministries"
              className="px-6 py-3 rounded-full border border-kingdomGreen text-kingdomGreen font-medium hover:bg-kingdomGreen hover:text-white transition"
            >
              TEACHING AND COUNSELLING HIGHLIGHTS
            </Link>

          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-8 flex flex-wrap gap-2"
          >
            {heroBadges.map((badge) => (
              <span
                key={badge}
                className="px-3 py-1.5 rounded-full bg-white border border-border text-xs font-medium text-kingdomGreen"
              >
                {badge}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <ScriptureCard />
        </motion.div>
      </div>

      <motion.a
        href="#more"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 text-muted hover:text-kingdomGreen"
      >
        <ArrowDown size={20} />
      </motion.a>
    </section>
  )
}