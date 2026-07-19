import { useState } from 'react'
import { motion } from 'framer-motion'
import { Tv, ChevronDown } from 'lucide-react'
import { tv } from '../data'

export default function KcmTv() {
  const [showAllObjectives, setShowAllObjectives] = useState(false)
  const visibleObjectives = showAllObjectives ? tv.objectives : tv.objectives.slice(0, 4)

  return (
    <section id="kcm-tv" className="relative py-24 md:py-32 bg-surface/60">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <p className="eyebrow mb-3">online tv</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink flex items-center gap-3">
            <Tv className="text-forest" size={28} />
            {tv.names[1]}
          </h2>
          <p className="text-muted mt-3 leading-relaxed">{tv.vision}</p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <h3 className="font-display text-lg font-semibold text-ink mb-4">Weekly Program</h3>
            <div className="space-y-3">
              {tv.schedule.map((s) => (
                <div key={s.day} className="card p-4 flex gap-4 items-start">
                  <span className="font-label text-xs font-semibold text-forest uppercase tracking-wide w-16 flex-shrink-0 pt-0.5">
                    {s.day}
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold text-ink">{s.title}</p>
                    <p className="text-xs text-muted mt-0.5">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-3"
          >
            <h3 className="font-display text-lg font-semibold text-ink mb-4">Objectives</h3>
            <ul className="space-y-3">
              {visibleObjectives.map((o, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                  {o}
                </li>
              ))}
            </ul>
            {!showAllObjectives && (
              <button
                onClick={() => setShowAllObjectives(true)}
                className="mt-4 inline-flex items-center gap-1.5 font-label text-sm text-forest font-medium hover:opacity-80"
              >
                Show all objectives <ChevronDown size={14} />
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
