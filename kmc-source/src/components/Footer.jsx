import { Link } from 'react-router-dom'
import { org, socialLinks } from '../data'
import { FacebookIcon, TiktokIcon, YoutubeIcon } from './BrandIcons'

const links = [
  { label: 'About', to: '/about' },
  { label: 'Vision', to: '/vision' },
  { label: 'Ministries', to: '/ministries' },
  { label: 'Founders', to: '/founders' },
  { label: 'Activities', to: '/activities' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'Contact', to: '/contact' },
]

const platformIcon = {
  facebook: FacebookIcon,
  tiktok: TiktokIcon,
  youtube: YoutubeIcon,
}

export default function Footer() {
  return (
    <footer className="relative dark-panel texture-grain overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-1.5 ribbon-strip" />

      <div className="max-w-6xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt={org.name} className="w-16 h-16 object-contain bg-white/95 rounded-xl p-1" />
            <span className="font-display font-semibold text-lg text-kingdomGreenLight">{org.name}</span>
          </div>
          <p className="mt-4 text-sm text-white/70 leading-relaxed max-w-xs">{org.tagline}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {socialLinks.map((s) => {
              const Icon = platformIcon[s.platform]
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/95 flex items-center justify-center hover:bg-white transition-colors"
                  aria-label={s.label}
                  title={s.label}
                >
                  <Icon size={16} />
                </a>
              )
            })}
          </div>
        </div>

        <div>
          <p className="font-label text-xs uppercase tracking-[0.2em] text-goldLight font-semibold mb-4">Explore</p>
          <ul className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm text-white/75 font-label">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-white transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-label text-xs uppercase tracking-[0.2em] text-goldLight font-semibold mb-4">Reach Us</p>
          <a href={`tel:${org.phone.replace(/\s/g, '')}`} className="block text-sm text-white/85 hover:text-white transition-colors">
            {org.phone}
          </a>
          <a href={`tel:${org.phoneSecondary.replace(/\s/g, '')}`} className="block mt-1 text-sm text-white/85 hover:text-white transition-colors">
            {org.phoneSecondary}
          </a>
          <p className="mt-4 text-xs text-white/50 leading-relaxed">{org.registration}</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50 font-label">
          <p>© {new Date().getFullYear()} {org.name} · {org.networkName}</p>
          <p>{org.revived}</p>
        </div>
      </div>
    </footer>
  )
}
