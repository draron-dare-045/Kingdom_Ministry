import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { org, socialLinks } from '../data'
import {
  FacebookIcon,
  TiktokIcon,
  YoutubeIcon,
} from './BrandIcons'

const platformIcon = {
  facebook: FacebookIcon,
  tiktok: TiktokIcon,
  youtube: YoutubeIcon,
}

export default function Footer() {
  return (
    <footer className="bg-[#0A2418] text-white">
      <div className="h-[2px] bg-gold" />
      <div className="max-w-4xl mx-auto px-4 py-5">
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
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-3">
          <Link
            to="/about"
            className="text-xs text-white/70 hover:text-gold transition-colors"
          >
            About
          </Link>

          <Link
            to="/vision"
            className="text-xs text-white/70 hover:text-gold transition-colors"
          >
            Vision
          </Link>

          <Link
            to="/ministries"
            className="text-xs text-white/70 hover:text-gold transition-colors"
          >
            Ministries
          </Link>

          <Link
            to="/contact"
            className="text-xs text-white/70 hover:text-gold transition-colors"
          >
            Contact
          </Link>
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {socialLinks
            .filter(
              (s) =>
                s.platform === 'facebook' ||
                s.platform === 'tiktok' ||
                s.platform === 'youtube'
            )
            .map((s) => {
              const Icon = platformIcon[s.platform]

              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-gold hover:text-black transition-all duration-300 flex items-center justify-center"
                >
                  <Icon size={14} />
                </a>
              )
            })}
        </div>
        <div className="flex items-center justify-center gap-2 mt-4 text-white/70">
          <MapPin size={14} className="text-gold" />
          <span className="text-xs">
            Nairobi, Kenya, East Africa
          </span>
        </div>
        <div className="mt-4 pt-3 border-t border-white/10 text-center">
          <p className="text-[10px] text-white/50">
            © {new Date().getFullYear()} {org.name}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}