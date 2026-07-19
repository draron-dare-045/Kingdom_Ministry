import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { founders } from '../data'

export default function Founders() {
  return (
    <section id="founders" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <p className="eyebrow mb-3">meet the founders</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink">A word from the founders</h2>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <div className="card card-hover overflow-hidden glow-border">
              <img
                src={founders.photo}
                alt={founders.names}
                className="w-full aspect-[4/3] object-cover object-center"
              />
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-ink">{founders.names}</h3>
                <p className="font-label text-xs text-muted mt-1">{founders.roles}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-3"
          >
            <Quote size={32} className="text-gold mb-4" />
            <p className="font-display text-xl sm:text-2xl leading-relaxed text-ink">
              {founders.word}
            </p>
            <p className="mt-6 font-label text-sm text-forest font-medium">{founders.quoteRef}</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
