import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { org } from '../data'

const links = [
  { label: 'About', to: '/about' },
  { label: 'Vision', to: '/vision' },
  { label: 'Ministries', to: '/ministries' },
  { label: 'Founders', to: '/founders' },
  { label: 'Activities', to: '/activities' },
  { label: 'Testimonials', to: '/testimonials' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md border-b border-border shadow-soft' : 'bg-white/70 backdrop-blur-sm'
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/logo.png" alt={org.name} className="w-14 h-14 object-contain" />
          <span className="font-display font-semibold text-base sm:text-lg tracking-tight text-kingdomGreen leading-none">
            {org.name}
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-7 font-label text-sm text-muted">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `transition-colors ${isActive ? 'text-forest font-medium' : 'hover:text-forest'}`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <Link
          to="/contact"
          className="hidden lg:inline-flex items-center px-4 py-2 rounded-full text-white font-label font-medium text-sm shadow-soft hover:brightness-110 hover:-translate-y-0.5 transition-all duration-200"
          style={{ background: 'linear-gradient(135deg, #3D0000 0%, #B0000D 100%)' }}
        >
          Contact Us
        </Link>

        <button
          className="lg:hidden text-ink"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <div className={`h-[3px] ribbon-strip transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="lg:hidden bg-white border-b border-border px-6 pb-6"
        >
          <ul className="flex flex-col gap-4 font-label text-sm text-muted">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => (isActive ? 'text-forest font-medium' : 'hover:text-forest')}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li>
              <Link to="/contact" onClick={() => setOpen(false)} className="text-forest font-medium">
                Contact Us &rarr;
              </Link>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.header>
  )
}
