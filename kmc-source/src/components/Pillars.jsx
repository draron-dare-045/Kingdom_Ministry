import { motion } from 'framer-motion'
import { pillars } from '../data'

export default function Pillars() {
  return (
    <section id="pillars" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <p className="eyebrow mb-3">what we do</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink">Our Mission Pillars</h2>
          <p className="text-muted mt-3">Eleven pathways carrying out one mission.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-10">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.06 }}
              className="flex gap-4 py-6 border-b border-border"
            >
              <span className="font-label text-sm text-gold font-semibold w-8 flex-shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-ink">{p.title}</h3>
                <p className="text-sm text-muted mt-1 leading-relaxed">{p.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
