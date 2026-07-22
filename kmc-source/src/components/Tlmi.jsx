import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Mic2 } from 'lucide-react'
import { tlmi } from '../data'

export default function Tlmi() {
  const [showAllTopics, setShowAllTopics] = useState(false)
  const visibleTopics = showAllTopics ? tlmi.topics : tlmi.topics.slice(0, 6)

  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-3xl"
        >
          <p className="eyebrow mb-3">MOTIVATIONAL & INSPIRATIONAL TALKS. </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink flex items-center gap-3">
            <Mic2 className="text-forest" size={26} />
            T.L.M.I -TALKS (Transforming Lives Motivational & Inspirational Talks)
          </h2>
          <p className="text-muted mt-3 leading-relaxed">{tlmi.about}</p>
          <p className="text-muted mt-3 leading-relaxed">{tlmi.purpose}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card p-6"
          >
            <h3 className="font-display text-base font-semibold text-ink mb-3">Our Goals</h3>
            <ul className="space-y-2.5">
              {tlmi.goals.map((g, i) => (
                <li key={i} className="text-sm text-muted leading-relaxed flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-forest mt-1.5 flex-shrink-0" />
                  {g}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="card p-6"
          >
            <h3 className="font-display text-base font-semibold text-ink mb-3">Who We Serve</h3>
            <ul className="space-y-2.5">
              {tlmi.targetGroups.map((g, i) => (
                <li key={i} className="text-sm text-muted leading-relaxed flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                  {g}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="card p-6"
          >
            <h3 className="font-display text-base font-semibold text-ink mb-3">Sample Topics</h3>
            <ul className="space-y-2.5">
              {visibleTopics.map((t, i) => (
                <li key={i} className="text-sm text-muted leading-relaxed flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-leaf mt-1.5 flex-shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
            {!showAllTopics && (
              <button
                onClick={() => setShowAllTopics(true)}
                className="mt-4 inline-flex items-center gap-1.5 font-label text-sm text-forest font-medium hover:opacity-80"
              >
                Show all topics <ChevronDown size={14} />
              </button>
            )}
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 text-sm text-muted italic"
        >
          {tlmi.cost}
        </motion.p>
      </div>
    </section>
  )
}
