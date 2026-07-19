import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'
import { org, socialLinks } from '../data'
import { FacebookIcon, TiktokIcon, YoutubeIcon, WhatsappIcon } from './BrandIcons'

const platformIcon = {
  facebook: FacebookIcon,
  tiktok: TiktokIcon,
  youtube: YoutubeIcon,
}

export default function Contact() {
  const waMessage = encodeURIComponent(`Hello ${org.name}, I'd like to get in touch.`)
  const waHref = `https://wa.me/${org.whatsappNumber}?text=${waMessage}`

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-surface/60">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow mb-3">let's connect</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink mb-4">Reach out to us.</h2>
          <p className="text-muted max-w-md leading-relaxed">
            Have a testimony, an invitation to speak, or a need for counsel and prayer? We'd love to
            hear from you.
          </p>

          <div className="mt-10 space-y-5">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-white border border-border flex items-center justify-center">
                <Phone size={16} className="text-forest" />
              </span>
              <div>
                <p className="text-xs text-muted font-label">Mobile</p>
                <a href={`tel:${org.phone.replace(/\s/g, '')}`} className="text-sm text-ink hover:text-forest">
                  {org.phone}
                </a>
                <span className="text-sm text-muted"> · </span>
                <a href={`tel:${org.phoneSecondary.replace(/\s/g, '')}`} className="text-sm text-ink hover:text-forest">
                  {org.phoneSecondary}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            {socialLinks.map((s) => {
              const Icon = platformIcon[s.platform]
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white border border-border flex items-center justify-center hover:border-forest transition-colors"
                  aria-label={s.label}
                  title={s.label}
                >
                  <Icon size={18} />
                </a>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="card p-8 md:p-10 shadow-lift text-center"
        >
          <span className="mx-auto w-16 h-16 rounded-full bg-[#25D366]/10 flex items-center justify-center mb-5">
            <WhatsappIcon size={32} />
          </span>
          <h3 className="font-display text-xl font-semibold text-ink mb-2">Chat with us on WhatsApp</h3>
          <p className="text-sm text-muted leading-relaxed max-w-xs mx-auto mb-6">
            The fastest way to reach the team — send a message and we'll reply as soon as we can.
          </p>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full bg-[#25D366] text-white font-label font-semibold text-sm shadow-lift hover:brightness-105 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            <WhatsappIcon size={18} /> Start a WhatsApp chat
          </a>
        </motion.div>
      </div>
    </section>
  )
}
