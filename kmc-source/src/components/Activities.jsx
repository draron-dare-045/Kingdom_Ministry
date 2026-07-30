import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PhoneCall, ImageIcon, Loader2, CalendarDays, GraduationCap, X } from 'lucide-react'
import { teachingHighlights, activityCategories, org } from '../data'
import { api } from '../api'

function TeachingHighlightsModal({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-ink/60 p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        className="bg-white rounded-2xl max-w-3xl w-full my-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full bg-surface hover:bg-border transition-colors"
          aria-label="Close"
        >
          <X size={18} className="text-ink" />
        </button>

        <div className="p-6 sm:p-10">
          <p className="font-label text-xs uppercase tracking-[0.2em] text-gold font-bold mb-3">Ministry Focus</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-kingdomGreen mb-4 pr-8">
            Teaching & Counselling Highlights
          </h2>
          <p className="text-muted text-base leading-relaxed mb-8">
            By the grace of God, here are some of the topics we teach and counsel on in depth,
            focused on spiritual maturity and emotional restoration.
          </p>

          <div className="flex flex-col divide-y divide-border mb-10">
            {teachingHighlights.map((topic, index) => (
              <div key={index} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                <span className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-full bg-kingdomGreen/10 text-kingdomGreen font-label font-bold text-sm flex items-center justify-center">
                  {index + 1}
                </span>
                <p className="text-ink font-medium leading-snug">{topic}</p>
              </div>
            ))}
          </div>

          <div className="bg-kingdomGreen rounded-[1.5rem] p-6 sm:p-8 text-center text-white relative overflow-hidden">
            <h3 className="font-display text-2xl font-bold mb-3">And many more...</h3>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              Give us a call for prayer, counselling, conferences, seminars, etc.
            </p>
            <a
              href={`tel:${org.phone}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold rounded-full font-bold text-white hover:scale-105 transition-transform"
            >
              <PhoneCall size={18} /> Call {org.phone}
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function TeachingHighlightsCard({ onOpen }) {
  return (
    <motion.button
      onClick={onOpen}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-left bg-kingdomGreen rounded-2xl border border-kingdomGreen shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
    >
      <div className="aspect-video bg-kingdomGreen/90 flex items-center justify-center">
        <GraduationCap size={36} className="text-gold" />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <p className="font-label text-xs text-gold font-bold mb-1.5">{teachingHighlights.length} Topics</p>
        <h3 className="font-display text-lg font-semibold text-white">
          Teaching & Counselling Highlights
        </h3>
        <p className="text-sm text-white/80 mt-2 leading-relaxed">
          What we teach and counsel on in depth, by the grace of God.
        </p>
        <span className="mt-4 text-xs font-label font-bold text-gold">Tap to view all &rarr;</span>
      </div>
    </motion.button>
  )
}

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('All')
  const [highlightsOpen, setHighlightsOpen] = useState(false)

  useEffect(() => {
    api
      .getActivities()
      .then(setActivities)
      .catch(() => setActivities([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered =
    category === 'All' ? activities : activities.filter((a) => a.category === category)

  return (
    <section className="relative py-24 bg-surface min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center max-w-3xl mx-auto"
        >
          <p className="font-label text-xs uppercase tracking-[0.2em] text-gold font-bold mb-4">What We're Doing</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-kingdomGreen mb-6">
            Our Activities
          </h1>
          <p className="text-muted text-lg leading-relaxed">
            A look at outreach, KCM-TV, welfare and mentorship in action across churches
            and communities.
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {activityCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-label font-medium border transition-colors ${
                category === cat
                  ? 'bg-kingdomGreen text-white border-kingdomGreen'
                  : 'bg-white text-ink border-border hover:border-kingdomGreen hover:text-kingdomGreen'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-2 text-muted text-sm py-16">
            <Loader2 size={16} className="animate-spin" /> Loading activities...
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <TeachingHighlightsCard onOpen={() => setHighlightsOpen(true)} />

            {filtered.length === 0 ? (
              <div className="sm:col-span-2 lg:col-span-2 flex items-center justify-center text-center py-10 px-6 text-muted bg-white rounded-2xl border border-border">
                <div>
                  <ImageIcon size={26} className="mx-auto mb-3 opacity-50" />
                  <p className="text-sm">More activities and photos are on the way — check back soon.</p>
                </div>
              </div>
            ) : (
              filtered.map((a, index) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className="aspect-video bg-surface flex items-center justify-center overflow-hidden">
                    {a.image ? (
                      <img src={a.image} alt={a.title} className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon size={22} className="text-muted" />
                    )}
                  </div>
                  <div className="p-6">
                    <p className="font-label text-xs text-gold font-bold mb-1.5">{a.category}</p>
                    <h3 className="font-display text-lg font-semibold text-ink">{a.title}</h3>
                    {a.description && (
                      <p className="text-sm text-muted mt-2 leading-relaxed">{a.description}</p>
                    )}
                    {a.date && (
                      <p className="flex items-center gap-1.5 text-xs text-muted mt-3">
                        <CalendarDays size={13} /> {a.date}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>

      <AnimatePresence>
        {highlightsOpen && <TeachingHighlightsModal onClose={() => setHighlightsOpen(false)} />}
      </AnimatePresence>
    </section>
  )
}