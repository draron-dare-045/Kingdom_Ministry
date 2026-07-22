import { Link } from 'react-router-dom'
import { org, socialLinks } from '../data'
import { FacebookIcon, TiktokIcon } from './BrandIcons'

const platformIcon = {
  facebook: FacebookIcon,
  tiktok: TiktokIcon,
}

export default function Footer() {
  return (
    <footer className="bg-[#0A2418] text-white">
      {/* Gold Accent */}
      <div className="h-[2px] bg-gold" />

      <div className="max-w-4xl mx-auto px-4 py-4">
        
        {/* Logo */}
        <div className="flex items-center justify-center gap-2">
          <img
            src="/logo.png"
            alt={org.name}
            className="w-8 h-8 bg-white rounded-md p-0.5"
          />

          <span className="font-display text-sm font-semibold text-gold">
            {org.name}
          </span>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-3">
          <Link to="/about" className="text-xs text-white/70 hover:text-gold">
            About
          </Link>

          <Link to="/vision" className="text-xs text-white/70 hover:text-gold">
            Vision
          </Link>

          <Link to="/ministries" className="text-xs text-white/70 hover:text-gold">
            Ministries
          </Link>

          <Link to="/contact" className="text-xs text-white/70 hover:text-gold">
            Contact
          </Link>
        </div>

        {/* Socials */}
        <div className="flex justify-center gap-2 mt-3">
          {socialLinks
            .filter(
              (s) =>
                s.platform === 'facebook' ||
                s.platform === 'tiktok'
            )
            .map((s) => {
              const Icon = platformIcon[s.platform]

              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-gold hover:text-black transition flex items-center justify-center"
                >
                  <Icon size={12} />
                </a>
              )
            })}
        </div>

        {/* Copyright */}
        <div className="mt-3 pt-2 border-t border-white/10 text-center">
          <p className="text-[10px] text-white/50">
            © {new Date().getFullYear()} {org.name}
          </p>
        </div>
      </div>
    </footer>
  )
}