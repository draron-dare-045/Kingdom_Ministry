import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { governance, faithStatement, org } from '../data'

function Accordion({ items, keyField, titleField, bodyField }) {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="divide-y divide-border border-t border-b border-border">
      {items.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 py-5 text-left"
            >
              <span className="font-display text-base sm:text-lg font-semibold text-ink">
                {item[titleField]}
              </span>
              <ChevronDown
                size={18}
                className={`text-muted flex-shrink-0 transition-transform ${isOpen ? 'rotate-180 text-forest' : ''}`}
              />
            </button>
            {isOpen && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="pb-5 text-sm text-muted leading-relaxed max-w-3xl"
              >
                {item[bodyField]}
              </motion.p>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function Governance() {
  return (
    <section id="governance" className="relative py-24 md:py-32 bg-surface/60">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 max-w-2xl"
        >
          <p className="eyebrow mb-3">governance</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink">Our Constitution</h2>
          <p className="text-muted mt-3">{org.registration}</p>
        </motion.div>

        <Accordion items={governance} titleField="article" bodyField="body" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 mb-10 max-w-2xl"
        >
          <p className="eyebrow mb-3">what we believe</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink">Statement of Faith</h2>
        </motion.div>

        <Accordion items={faithStatement} titleField="title" bodyField="body" />
      </div>
    </section>
  )
}
