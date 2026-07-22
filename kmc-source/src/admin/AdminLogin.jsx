import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Lock,
  ShieldCheck,
  User,
  Eye,
  EyeOff,
} from 'lucide-react'
import { useAuth } from './AuthContext'
import { org } from '../data'

export default function AdminLogin() {
  const { login } = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 sm:px-6 relative overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute -top-20 -right-20 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-forest/10 blur-[90px]" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gold/15 blur-[90px]" />

      {/* Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="w-full h-full bg-[radial-gradient(circle,_#000_1px,_transparent_1px)] bg-[length:24px_24px]" />
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gold/20 p-6 sm:p-8"
      >
        {/* Logo & Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <img
            src="/logo.png"
            alt={org.name}
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
          />

          <span className="mt-4 text-xs uppercase tracking-[0.25em] text-gold font-semibold">
            Admin Portal
          </span>

          <h1 className="mt-2 text-2xl font-bold text-kingdomGreen">
            {org.name}
          </h1>

          <p className="mt-2 text-sm text-muted">
            Sign in to manage ministry content.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-muted mb-2">
              Username
            </label>

            <div className="relative">
              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                type="text"
                required
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full pl-11 pr-4 py-3 border border-border rounded-xl bg-surfaceAlt focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-muted mb-2">
              Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-11 pr-12 py-3 border border-border rounded-xl bg-surfaceAlt focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-kingdomGreen transition-colors"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8B0000] hover:bg-[#6E0000] text-white font-medium py-3 rounded-xl transition duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <ShieldCheck size={18} />
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}