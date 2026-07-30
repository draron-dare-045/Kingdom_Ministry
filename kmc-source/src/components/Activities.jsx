import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { PhoneCall, ImageIcon, Loader2, CalendarDays } from 'lucide-react'
import { teachingHighlights, activityCategories, org } from '../data'
import { api } from '../api'

const TEACHING_TAB = 'Teaching & Counselling'
const tabs = [...activityCategories, TEACHING_TAB]

function TeachingHighlights() {
  return (
    <div>
      <div className="flex flex-col divide-y divide-border mb-10">
        {teachingHighlights.map((topic, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.03 }}
            className="flex items-start gap-4 py-4 first:pt-0 last:pb-0"
          >
            <span className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-full bg-kingdomGreen/10 text-kingdomGreen font-label font-bold text-sm flex items-center justify-center">
              {index + 1}
            </span>
            <p className="text-ink font-medium leading-snug">{topic}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-kingdomGreen rounded-[2rem] p-8 md:p-12 text-center text-white relative overflow-hidden"
      >
        <h2 className="font-display text-3xl font-bold mb-4">And many more...</h2>
        <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
          Give us a call for prayer, counselling, conferences, seminars, etc.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`tel:${org.phone}`}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-gold rounded-full font-bold text-white hover:scale-105 transition-transform"
          >
            <PhoneCall size={18} /> Call {org.phone}
          </a>
        </div>
      </motion.div>
    </div>
  )
}

function ActivitiesGrid({ activities, loading }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 text-muted text-sm py-16">
        <Loader2 size={16} className="animate-spin" /> Loading activities...
      </div>
    )
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-16 text-muted bg-white rounded-2xl border border-border">
        <ImageIcon size={26} className="mx-auto mb-3 opacity-50" />
        <p className="text-sm">More activities and photos are on the way — check back soon.</p>
      </div>
    )
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {activities.map((a, index) => (
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
      ))}
    </div>
  )
}

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('All')

  useEffect(() => {
    api
      .getActivities()
      .then(setActivities)
      .catch(() => setActivities([]))
      .finally(() => setLoading(false))
  }, [])

  const isTeaching = category === TEACHING_TAB
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
            {isTeaching ? 'Teaching & Counselling Highlights' : 'Our Activities'}
          </h1>
          <p className="text-muted text-lg leading-relaxed">
            {isTeaching
              ? 'By the grace of God, here are some of the topics we teach and counsel on in depth, focused on spiritual maturity and emotional restoration.'
              : 'A look at outreach, KCM-TV, welfare and mentorship in action across churches and communities.'}
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {tabs.map((cat) => (
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

        {isTeaching ? (
          <TeachingHighlights />
        ) : (
          <ActivitiesGrid activities={filtered} loading={loading} />
        )}
      </div>
    </section>
  )
}