import { motion } from 'framer-motion'
import { Phone, Mail } from 'lucide-react'
import { org, socialLinks } from '../data'
import {
  FacebookIcon,
  TiktokIcon,
  YoutubeIcon,
  WhatsappIcon,
} from './BrandIcons'

const platformIcon = {
  facebook: FacebookIcon,
  tiktok: TiktokIcon,
  youtube: YoutubeIcon,
}

export default function Contact() {
  const waMessage = encodeURIComponent(
    `Hello ${org.name}, I'd like to get in touch.`
  )

  const waHref = `https://wa.me/${org.whatsappNumber}?text=${waMessage}`

  return (
    <section
      id="contact"
      className="relative py-20 md:py-32 bg-surface/60"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 md:gap-16 items-center">

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow mb-3">Let's Connect</p>

          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink mb-4">
            Reach Out To Us
          </h2>

          <p className="text-muted max-w-md leading-relaxed">
            Have a testimony, an invitation to speak, or a need for counsel,
            prayer, or support? We'd love to hear from you.
          </p>

          {/* Contact Details */}
          <div className="mt-10 space-y-6">

            {/* Phone */}
            <div className="flex items-start gap-3">
              <span className="w-10 h-10 rounded-lg bg-white border border-border flex items-center justify-center flex-shrink-0">
                <Phone size={16} className="text-forest" />
              </span>

              <div>
                <p className="text-xs text-muted font-label mb-1">
                  Mobile
                </p>

                <div className="flex flex-wrap items-center gap-1">
                  <a
                    href={`tel:${org.phone.replace(/\s/g, '')}`}
                    className="text-sm text-ink hover:text-forest transition-colors"
                  >
                    {org.phone}
                  </a>

                  <span className="text-sm text-muted">•</span>

                  <a
                    href={`tel:${org.phoneSecondary.replace(/\s/g, '')}`}
                    className="text-sm text-ink hover:text-forest transition-colors"
                  >
                    {org.phoneSecondary}
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3">
              <span className="w-10 h-10 rounded-lg bg-white border border-border flex items-center justify-center flex-shrink-0">
                <Mail size={16} className="text-forest" />
              </span>

              <div>
                <p className="text-xs text-muted font-label mb-1">
                  Email
                </p>

                <a
                  href="mailto:donaldwathome3@gmail.com"
                  className="text-sm text-ink hover:text-forest transition-colors break-all"
                >
                  donaldwathome3@gmail.com
                </a>
              </div>
            </div>

          </div>

          {/* Social Media */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {socialLinks.map((s) => {
              const Icon = platformIcon[s.platform]

              if (!Icon) return null

              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="w-11 h-11 rounded-xl bg-white border border-border flex items-center justify-center hover:border-forest hover:-translate-y-1 hover:shadow-md transition-all duration-200"
                >
                  <Icon size={18} />
                </a>
              )
            })}
          </div>
        </motion.div>

        {/* WhatsApp Card */}
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

          <h3 className="font-display text-xl font-semibold text-ink mb-2">
            Chat With Us On WhatsApp
          </h3>

          <p className="text-sm text-muted leading-relaxed max-w-xs mx-auto mb-6">
            The fastest way to reach our team. Send us a message and we'll
            respond as soon as possible.
          </p>

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full bg-[#25D366] text-white font-label font-semibold text-sm shadow-lift hover:brightness-105 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            <WhatsappIcon size={18} />
            Start a WhatsApp Chat
          </a>

          {/* Email Shortcut */}
          <a
            href="mailto:donaldwathome3@gmail.com"
            className="mt-4 inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full border border-border bg-white text-ink font-label font-medium text-sm hover:border-forest hover:text-forest transition-all duration-200"
          >
            <Mail size={16} />
            Send an Email
          </a>
        </motion.div>

      </div>
    </section>
  )
}