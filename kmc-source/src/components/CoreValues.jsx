import { motion } from 'framer-motion'
import { Cross } from 'lucide-react'
import { coreValues } from '../data'

export default function CoreValues() {
  return (
    <section id="more" className="relative py-24 md:py-32 bg-surface/60">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <p className="eyebrow mb-3">what we stand on</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink">Our Core Values</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {coreValues.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.06 }}
              className="card glow-border p-6 hover:-translate-y-1 transition-transform"
            >
              <span className={`w-9 h-9 rounded-lg flex items-center justify-center mb-4 ${i % 3 === 0 ? 'bg-goldLight text-gold' : 'bg-surfaceAlt text-forest'}`}>
                <Cross size={15} />
              </span>
              <h3 className="font-display text-base font-semibold text-ink mb-1.5">{v.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{v.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
