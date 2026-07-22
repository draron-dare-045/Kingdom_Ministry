import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, ShieldCheck } from 'lucide-react'
import { useAuth } from './AuthContext'
import { org } from '../data'

export default function AdminLogin() {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(username, password)
    } catch (err) {
      setError(err.message || 'Could not log in.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-gradient-deep texture-grain flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-1.5 ribbon-strip" />
      <div className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-gold/10 blur-[110px]" />
      <div className="absolute -bottom-32 -left-32 w-[420px] h-[420px] rounded-full bg-leaf/10 blur-[110px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-sm bg-white rounded-2xl shadow-lift p-8"
      >
        <div className="flex flex-col items-center text-center mb-7">
          <img src="/logo.svg" alt={org.name} className="w-24 h-24 object-contain mb-4" />
          <p className="eyebrow mb-2">admin access</p>
          <h1 className="font-display text-xl font-semibold text-kingdomGreen">{org.name}</h1>
          <p className="text-sm text-muted mt-1">Sign in to manage Activities & Gallery.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-label text-muted">Username</label>
            <input
              required
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-1.5 bg-surfaceAlt border border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-forest transition-colors"
              placeholder="admin"
            />
          </div>
          <div>
            <label className="text-xs font-label text-muted">Password</label>
            <div className="relative mt-1.5">
              <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surfaceAlt border border-border rounded-lg pl-10 pr-4 py-3 text-sm outline-none focus:border-forest transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <p className="text-xs text-wine bg-wine/5 border border-wine/20 rounded-lg px-3 py-2">{error}</p>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
            <ShieldCheck size={16} /> {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}
