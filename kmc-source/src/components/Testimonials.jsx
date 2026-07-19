import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Quote, Loader2, Send, CheckCircle2 } from 'lucide-react'
import { testimonials as fallbackTestimonials } from '../data'
import { api } from '../api'

const EMPTY_FORM = { name: '', context: '', quote: '' }

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials)
  const [loading, setLoading] = useState(true)

  const [form, setForm] = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api
      .getTestimonials()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setTestimonials(data)
      })
      .catch(() => {
        // Backend not reachable yet — keep showing the built-in list
        // from data.js so the section never appears broken.
      })
      .finally(() => setLoading(false))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await api.submitTestimonial(form)
      setSubmitted(true)
      setForm(EMPTY_FORM)
    } catch (err) {
      setError(err.message || 'Something went wrong — please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <p className="eyebrow mb-3">changed lives</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink">Testimonials</h2>
          <p className="text-muted mt-3">Real stories of restoration, healing and hope from within our community.</p>
        </motion.div>

        {loading ? (
          <div className="flex items-center gap-2 text-muted text-sm py-16 justify-center">
            <Loader2 size={16} className="animate-spin" /> Loading testimonials...
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id || t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.08 }}
                className="card card-hover p-7 flex flex-col"
              >
                <Quote size={28} className="text-gold mb-4 flex-shrink-0" />
                <p className="text-ink leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 pt-5 border-t border-border">
                  <p className="font-display text-sm font-semibold text-ink">{t.name}</p>
                  {t.context && <p className="font-label text-xs text-muted mt-0.5">{t.context}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 card p-8 md:p-10 max-w-2xl mx-auto"
        >
          {submitted ? (
            <div className="text-center py-4">
              <CheckCircle2 size={32} className="text-forest mx-auto mb-3" />
              <h3 className="font-display text-lg font-semibold text-ink mb-1.5">Thank you for sharing.</h3>
              <p className="text-sm text-muted max-w-sm mx-auto">
                Your testimony has been submitted. Once it's reviewed, it will appear on this page.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-5 text-sm font-label font-medium text-forest hover:underline"
              >
                Share another testimony
              </button>
            </div>
          ) : (
            <>
              <p className="font-display text-lg font-semibold text-ink mb-1.5">Has this ministry touched your life?</p>
              <p className="text-sm text-muted mb-6">
                Share your story below — with your permission, it may be featured on this page to encourage others.
              </p>

              {error && (
                <p className="mb-4 text-sm text-wine bg-wine/5 border border-wine/20 rounded-lg px-4 py-3">{error}</p>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-label text-muted">Your Name</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full mt-1.5 bg-surfaceAlt border border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-forest transition-colors"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-label text-muted">Context (optional)</label>
                    <input
                      value={form.context}
                      onChange={(e) => setForm({ ...form, context: e.target.value })}
                      className="w-full mt-1.5 bg-surfaceAlt border border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-forest transition-colors"
                      placeholder="e.g. Family & Marriage Forum"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-label text-muted">Your Testimony</label>
                  <textarea
                    required
                    rows={4}
                    value={form.quote}
                    onChange={(e) => setForm({ ...form, quote: e.target.value })}
                    className="w-full mt-1.5 bg-surfaceAlt border border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-forest transition-colors resize-none"
                    placeholder="Share how this ministry has impacted you..."
                  />
                </div>
                <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
                  {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  {submitting ? 'Submitting...' : 'Submit Testimony'}
                </button>
                <p className="text-xs text-muted text-center">
                  Submissions are reviewed before they appear publicly.
                </p>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}
