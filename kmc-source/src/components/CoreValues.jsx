import { motion } from 'framer-motion'
import { coreValues } from '../data'

export default function CoreValues() {
  return (
    <section id="more" className="py-20 md:py-24 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-kingdomGreen">
            Our Core Values
          </h2>

          <p className="mt-3 text-muted max-w-2xl mx-auto">
            The principles that guide our ministry, service, and fellowship.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coreValues.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              className="bg-white rounded-2xl border border-border p-6 shadow-soft hover:shadow-lift transition-all duration-300"
            >
              <h3 className="font-display text-xl font-semibold text-kingdomGreen mb-3">
                {value.title}
              </h3>

              <p className="text-sm text-muted leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}