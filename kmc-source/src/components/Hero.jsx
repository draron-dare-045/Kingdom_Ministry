import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowDown, BookOpen } from 'lucide-react'
import { org, heroBadges } from '../data'

function ScriptureCard() {
  return (
    <div className="card glow-border overflow-hidden shadow-lift">
      <div className="flex items-center gap-2 px-5 py-3 border-b border-border bg-surfaceAlt">
        <BookOpen size={15} className="text-forest" />
        <span className="font-label text-xs text-muted tracking-wide">{org.heroVerse.reference}</span>
      </div>
      <div className="p-6">
        <p className="font-display text-lg sm:text-xl leading-relaxed text-ink">
          &ldquo;{org.heroVerse.text}&rdquo;
        </p>
        <div className="mt-6 pt-5 border-t border-border flex items-center justify-between">
          <span className="font-label text-xs uppercase tracking-widest text-gold font-semibold">
            {org.verseTag}
          </span>
          <span className="font-label text-xs text-muted">{org.congregation}</span>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden"
    >
      <div className="absolute inset-0 bg-hero-mesh" />
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_40%,transparent_100%)]" />
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-forest/10 blur-[120px]" />
      <div className="absolute top-60 -left-40 w-[400px] h-[400px] rounded-full bg-gold/10 blur-[120px]" />
      <div className="absolute top-16 left-0 right-0 h-1.5 ribbon-strip opacity-80" />

      <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-leaf animate-pulse" />
            <span className="font-label text-xs text-muted">{org.revived}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-semibold leading-[1.02] text-4xl sm:text-5xl lg:text-6xl text-ink"
          >
            <span className="text-kingdomGreen">{org.name}</span>
            <br />
            <span className="text-2xl sm:text-3xl font-medium text-muted">{org.networkName}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-muted text-lg max-w-md leading-relaxed"
          >
            {org.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/founders"
              className="btn-primary"
            >
              Meet the Founders
            </Link>
            <Link
              to="/ministries"
              className="btn-secondary"
            >
              Watch KCM-TV
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            {heroBadges.map((b) => (
              <span
                key={b}
                className="px-3.5 py-1.5 rounded-full bg-surfaceAlt border border-border font-label text-xs text-forest font-medium"
              >
                {b}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -1 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <ScriptureCard />
        </motion.div>
      </div>

      <motion.a
        href="#more"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 text-muted hover:text-forest"
        aria-label="Scroll down"
      >
        <ArrowDown size={20} />
      </motion.a>
    </section>
  )
}
