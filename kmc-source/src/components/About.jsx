import { motion } from 'framer-motion'
import { HeartHandshake } from 'lucide-react'
import { about, whyThisMinistry } from '../data'

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl"
        >
          <p className="eyebrow mb-3">{about.eyebrow}</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink">{about.heading}</h2>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12">
          <div className="md:col-span-3 space-y-5">
            {about.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-muted leading-relaxed"
              >
                {p}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 card card-hover p-6 md:p-7 bg-cream border-none"
          >
            <span className="w-10 h-10 rounded-lg bg-brand-gradient flex items-center justify-center mb-4">
              <HeartHandshake size={18} className="text-white" />
            </span>
            <h3 className="font-display text-lg font-semibold text-ink mb-2">
              {about.inspiration.heading}
            </h3>
            <p className="text-sm text-muted leading-relaxed">{about.inspiration.body}</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <p className="eyebrow mb-3">why this ministry</p>
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-ink mb-8 max-w-xl">
            Why another Christian organization?
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {whyThisMinistry.map((w, i) => (
            <motion.div
              key={w.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="card p-6 hover:-translate-y-1 transition-transform"
            >
              <h4 className="font-display text-base font-semibold text-ink mb-2">{w.title}</h4>
              <p className="text-sm text-muted leading-relaxed">{w.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
