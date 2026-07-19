import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import CoreValues from '../components/CoreValues'

const exploreLinks = [
  { to: '/about', label: 'About Us', description: 'Who we are and why this ministry exists.' },
  { to: '/vision', label: 'Vision & Mission', description: 'What we\u2019re believing God for, and how we get there.' },
  { to: '/founders', label: 'Founders', description: 'A word from the founders.' },
  { to: '/ministries', label: 'Ministries', description: 'KCM-TV and T.L.M.I mentorship talks.' },
  { to: '/activities', label: 'Activities', description: 'What\u2019s happening on the ground.' },
  { to: '/testimonials', label: 'Testimonials', description: 'Real stories of restoration and hope.' },
  { to: '/contact', label: 'Contact', description: 'Reach the team directly.' },
]

export default function Home() {
  return (
    <>
      <Hero />
      <CoreValues />

      <section className="relative py-20 md:py-28 bg-surface/60">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow mb-3">explore</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink">Find out more</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {exploreLinks.map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.06 }}
              >
                <Link
                  to={l.to}
                  className="card card-hover block p-6 h-full"
                >
                  <h3 className="font-display text-lg font-semibold text-ink mb-1.5">{l.label}</h3>
                  <p className="text-sm text-muted leading-relaxed">{l.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
