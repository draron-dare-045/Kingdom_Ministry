import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ImageIcon, Loader2, Clock } from 'lucide-react'
import { activities as fallbackActivities, activityCategories } from '../data'
import { api } from '../api'

export default function Activities() {
  const [filter, setFilter] = useState('All')
  const [activities, setActivities] = useState(fallbackActivities)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .getActivities()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setActivities(data)
      })
      .catch(() => {
        // Backend not reachable yet — keep showing the built-in list
        // from data.js so the section never appears broken.
      })
      .finally(() => setLoading(false))
  }, [])

  const filtered = filter === 'All' ? activities : activities.filter((a) => a.category === filter)

  return (
    <section id="activities" className="relative py-24 md:py-32 texture-grain">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 max-w-2xl"
        >
          <div className="section-eyebrow-line" />
          <p className="eyebrow mb-3">in the field</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink">Activities & Gallery</h2>
          <p className="text-muted mt-3">
            Photos and updates from outreach, healing services and broadcasts — added as they happen.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-10">
          {activityCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-label transition-colors border ${
                filter === cat
                  ? 'bg-brand-gradient text-white border-transparent shadow-soft'
                  : 'border-border text-muted hover:text-ink hover:border-forest'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center gap-2 text-muted text-sm py-16 justify-center">
            <Loader2 size={16} className="animate-spin" /> Loading activities...
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card flex flex-col items-center justify-center text-center py-20 px-6"
          >
            <Clock size={28} className="text-forest mb-4" />
            <h3 className="font-display text-lg font-semibold text-ink">Coming Soon</h3>
            <p className="text-sm text-muted mt-2 max-w-sm">
              We're getting ready to share photos and updates from our outreach, inner healing sessions, KCM-TV
              recordings and welfare projects. Check back soon.
            </p>
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((a) => (
                <motion.div
                  layout
                  key={a.id || a.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                  className="card card-hover overflow-hidden group"
                >
                  <div className="aspect-video bg-surfaceAlt flex items-center justify-center overflow-hidden">
                    {a.image ? (
                      <img
                        src={a.image}
                        alt={a.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <span className="flex flex-col items-center gap-2 text-muted">
                        <ImageIcon size={22} />
                        <span className="font-label text-xs">Photo coming soon</span>
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="font-label text-xs text-forest font-medium mb-1.5">{a.category}</p>
                    <h3 className="font-display text-lg font-semibold text-ink">{a.title}</h3>
                    <p className="text-sm text-muted mt-1.5 leading-relaxed">{a.description}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  )
}