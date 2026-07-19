import { motion } from 'framer-motion'
import { Compass } from 'lucide-react'
import { vision, missionIntro, missionPathways } from '../data'

export default function Vision() {
  return (
    <section id="vision" className="relative py-24 md:py-32 bg-surface/60">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <p className="eyebrow mb-3">our vision</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink">
            To be a powerful platform, partner and network
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {vision.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card card-hover glow-border p-6 flex gap-4"
            >
              <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-brand-gradient flex items-center justify-center font-label text-white text-sm font-semibold">
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-ink mb-1.5">{v.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{v.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 max-w-2xl"
        >
          <p className="eyebrow mb-3">our mission</p>
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-ink mb-3">
            <Compass className="inline-block mb-1 mr-2 text-forest" size={22} />
            How we carry it out
          </h3>
          <p className="text-muted leading-relaxed">{missionIntro}</p>
        </motion.div>

        <div className="divide-y divide-border border-t border-b border-border">
          {missionPathways.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="grid md:grid-cols-[80px_1fr] gap-4 md:gap-10 py-7 group"
            >
              <span className="font-label text-sm text-gold font-semibold">0{i + 1}</span>
              <div>
                <h4 className="font-display text-xl font-semibold text-ink group-hover:text-forest transition-colors">
                  {m.title}
                </h4>
                <p className="text-muted mt-1.5 max-w-2xl leading-relaxed text-sm">{m.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
