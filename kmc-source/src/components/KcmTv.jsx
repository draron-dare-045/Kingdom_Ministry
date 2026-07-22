import { useState } from 'react'
import { motion } from 'framer-motion'
import { Tv, ChevronDown, PlayCircle } from 'lucide-react'
import { tv } from '../data'

export default function KcmTv() {
  const [showAllObjectives, setShowAllObjectives] = useState(false)

  const visibleObjectives = showAllObjectives
    ? tv.objectives
    : tv.objectives.slice(0, 4)

  return (
    <section
      id="kcm-tv"
      className="relative py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-cream to-white overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-forest/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-12 sm:mb-16"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gold text-white px-4 py-2 rounded-full shadow-lg mb-5">
            <Tv size={16} />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em]">
              Online TV Ministry
            </span>
          </div>

          {/* Title */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-forest text-white flex items-center justify-center shadow-lg">
              <Tv size={28} />
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-ink leading-tight">
              {tv.names[1]}
            </h2>
          </div>

          {/* Vision */}
          <p className="text-sm sm:text-base md:text-lg text-muted mt-5 leading-relaxed max-w-3xl mx-auto">
            {tv.vision}
          </p>

          {/* Accent Line */}
          <div className="mx-auto mt-6 h-1 w-24 sm:w-32 rounded-full bg-gradient-to-r from-gold to-forest" />
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Weekly Programs */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-2 mb-5">
              <PlayCircle className="text-gold" size={22} />
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-ink">
                Weekly Programs
              </h3>
            </div>

            <div className="space-y-4">
              {tv.schedule.map((item) => (
                <div
                  key={item.day}
                  className="bg-white rounded-2xl border border-gold/15 shadow-md p-4 sm:p-5 hover:shadow-lg transition"
                >
                  <span className="inline-block bg-forest text-white text-[10px] sm:text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full mb-3">
                    {item.day}
                  </span>

                  <h4 className="font-display text-base sm:text-lg font-semibold text-ink">
                    {item.title}
                  </h4>

                  <p className="text-sm text-muted mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Objectives */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-ink mb-5">
              Ministry Objectives
            </h3>

            <div className="bg-white rounded-3xl border border-gold/15 shadow-md p-5 sm:p-6">
              <ul className="space-y-4">
                {visibleObjectives.map((objective, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm sm:text-base text-muted leading-relaxed"
                  >
                    <span className="w-2 h-2 rounded-full bg-gold mt-2.5 flex-shrink-0" />
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>

              {!showAllObjectives && tv.objectives.length > 4 && (
                <button
                  onClick={() => setShowAllObjectives(true)}
                  className="mt-6 inline-flex items-center gap-2 text-sm sm:text-base text-forest font-medium hover:text-gold transition"
                >
                  View All Objectives
                  <ChevronDown size={16} />
                </button>
              )}

              {showAllObjectives && tv.objectives.length > 4 && (
                <button
                  onClick={() => setShowAllObjectives(false)}
                  className="mt-6 inline-flex items-center gap-2 text-sm sm:text-base text-forest font-medium hover:text-gold transition"
                >
                  Show Less
                  <ChevronDown size={16} className="rotate-180" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}