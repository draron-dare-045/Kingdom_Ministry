import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LogOut,
  Plus,
  Pencil,
  Trash2,
  ImageIcon,
  UploadCloud,
  X,
  Loader2,
  ExternalLink,
  CheckCircle2,
  Quote,
} from 'lucide-react'
import { useAuth } from './AuthContext'
import { api } from '../api'
import { activityCategories, org } from '../data'

const EMPTY_FORM = { title: '', category: activityCategories[1] || 'Outreach', description: '', date: '', image: '', imagePublicId: '' }

function ActivitiesPanel() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  const load = () => {
    setLoading(true)
    api
      .getActivities()
      .then(setActivities)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const openNew = () => {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setFormOpen(true)
  }

  const openEdit = (a) => {
    setEditingId(a.id)
    setForm({
      title: a.title,
      category: a.category,
      description: a.description,
      date: a.date || '',
      image: a.image || '',
      imagePublicId: a.imagePublicId || '',
    })
    setFormOpen(true)
  }

  const closeForm = () => {
    setFormOpen(false)
    setEditingId(null)
    setForm(EMPTY_FORM)
  }

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const res = await api.uploadImage(file)
      setForm((f) => ({ ...f, image: res.url, imagePublicId: res.publicId }))
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      if (editingId) {
        const updated = await api.updateActivity(editingId, form)
        setActivities((list) => list.map((a) => (a.id === editingId ? updated : a)))
      } else {
        const created = await api.createActivity(form)
        setActivities((list) => [created, ...list])
      }
      closeForm()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this activity? This also removes its photo from storage.')) return
    setDeletingId(id)
    try {
      await api.deleteActivity(id)
      setActivities((list) => list.filter((a) => a.id !== id))
    } catch (err) {
      setError(err.message)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <p className="text-sm text-muted">
          {activities.length} {activities.length === 1 ? 'entry' : 'entries'} · shown live on the public
          Activities & Gallery section
        </p>
        <button onClick={openNew} className="btn-primary !px-4 !py-2.5 !text-sm">
          <Plus size={16} /> Add Activity
        </button>
      </div>

      {error && (
        <p className="mb-6 text-sm text-wine bg-wine/5 border border-wine/20 rounded-lg px-4 py-3">{error}</p>
      )}

      {loading ? (
        <div className="flex items-center gap-2 text-muted text-sm py-20 justify-center">
          <Loader2 size={16} className="animate-spin" /> Loading activities...
        </div>
      ) : activities.length === 0 ? (
        <div className="text-center py-20 text-muted">
          <ImageIcon size={28} className="mx-auto mb-3 opacity-50" />
          <p className="text-sm">No activities yet. Add the first one.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {activities.map((a) => (
            <div key={a.id} className="card overflow-hidden">
              <div className="aspect-video bg-surfaceAlt flex items-center justify-center overflow-hidden">
                {a.image ? (
                  <img src={a.image} alt={a.title} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon size={22} className="text-muted" />
                )}
              </div>
              <div className="p-5">
                <p className="font-label text-xs text-forest font-medium mb-1.5">{a.category}</p>
                <h3 className="font-display text-base font-semibold text-ink">{a.title}</h3>
                <p className="text-sm text-muted mt-1.5 leading-relaxed line-clamp-2">{a.description}</p>
                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={() => openEdit(a)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-border text-xs font-label font-medium text-ink hover:border-forest hover:text-forest transition-colors"
                  >
                    <Pencil size={13} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(a.id)}
                    disabled={deletingId === a.id}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-wine/30 text-xs font-label font-medium text-wine hover:bg-wine/5 transition-colors disabled:opacity-50"
                  >
                    {deletingId === a.id ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {formOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm flex items-center justify-center px-4 py-8 overflow-y-auto"
            onClick={closeForm}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-lift w-full max-w-lg p-6 md:p-8 my-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-lg font-semibold text-ink">
                  {editingId ? 'Edit Activity' : 'Add Activity'}
                </h2>
                <button onClick={closeForm} className="text-muted hover:text-ink">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-label text-muted">Title</label>
                  <input
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full mt-1.5 bg-surfaceAlt border border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-forest transition-colors"
                    placeholder="e.g. Youth Outreach — Kibera"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-label text-muted">Category</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full mt-1.5 bg-surfaceAlt border border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-forest transition-colors"
                    >
                      {activityCategories.filter((c) => c !== 'All').map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-label text-muted">Date</label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full mt-1.5 bg-surfaceAlt border border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-forest transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-label text-muted">Description</label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full mt-1.5 bg-surfaceAlt border border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-forest transition-colors resize-none"
                    placeholder="A short line about what happened..."
                  />
                </div>

                <div>
                  <label className="text-xs font-label text-muted">Photo</label>
                  <div className="mt-1.5 border-2 border-dashed border-border rounded-lg p-4 text-center">
                    {form.image ? (
                      <div className="relative inline-block">
                        <img src={form.image} alt="" className="max-h-32 rounded-lg mx-auto" />
                        <button
                          type="button"
                          onClick={() => setForm({ ...form, image: '', imagePublicId: '' })}
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-wine text-white flex items-center justify-center"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center gap-2 cursor-pointer text-muted py-4">
                        {uploading ? (
                          <Loader2 size={20} className="animate-spin" />
                        ) : (
                          <UploadCloud size={20} />
                        )}
                        <span className="text-xs font-label">
                          {uploading ? 'Uploading...' : 'Click to upload a photo'}
                        </span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
                      </label>
                    )}
                  </div>
                </div>

                <button type="submit" disabled={saving || uploading} className="btn-primary w-full disabled:opacity-60">
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                  {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Add Activity'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const EMPTY_TESTIMONIAL_FORM = { name: '', context: '', quote: '', approved: true }

function TestimonialsPanel() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busyId, setBusyId] = useState(null)

  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(EMPTY_TESTIMONIAL_FORM)
  const [saving, setSaving] = useState(false)

  const load = () => {
    setLoading(true)
    api
      .getAllTestimonials()
      .then(setTestimonials)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const openNew = () => {
    setEditingId(null)
    setForm(EMPTY_TESTIMONIAL_FORM)
    setFormOpen(true)
  }

  const openEdit = (t) => {
    setEditingId(t.id)
    setForm({ name: t.name, context: t.context || '', quote: t.quote, approved: t.approved })
    setFormOpen(true)
  }

  const closeForm = () => {
    setFormOpen(false)
    setEditingId(null)
    setForm(EMPTY_TESTIMONIAL_FORM)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      if (editingId) {
        const updated = await api.updateTestimonial(editingId, form)
        setTestimonials((list) => list.map((t) => (t.id === editingId ? updated : t)))
      } else {
        const created = await api.createTestimonial(form)
        setTestimonials((list) => [created, ...list])
      }
      closeForm()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const setApproved = async (id, approved) => {
    setBusyId(id)
    try {
      const updated = await api.updateTestimonial(id, { approved })
      setTestimonials((list) => list.map((t) => (t.id === id ? updated : t)))
    } catch (err) {
      setError(err.message)
    } finally {
      setBusyId(null)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimony? This cannot be undone.')) return
    setBusyId(id)
    try {
      await api.deleteTestimonial(id)
      setTestimonials((list) => list.filter((t) => t.id !== id))
    } catch (err) {
      setError(err.message)
    } finally {
      setBusyId(null)
    }
  }

  const pending = testimonials.filter((t) => !t.approved)
  const approved = testimonials.filter((t) => t.approved)

  const Row = ({ t }) => (
    <div className="card card-hover relative overflow-hidden p-6 flex flex-col border-l-4 border-gold">
      <Quote size={64} className="absolute -top-3 -right-3 text-gold/10 rotate-12" />

      <div className="relative flex items-start justify-between gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-brand-gradient flex items-center justify-center text-white font-display font-semibold text-sm flex-shrink-0">
          {t.name?.[0]?.toUpperCase() || '?'}
        </div>
        {!t.approved && (
          <span className="text-[11px] font-label font-semibold uppercase tracking-wide text-gold bg-goldLight px-2 py-0.5 rounded-full">
            Pending
          </span>
        )}
      </div>

      <p className="relative text-sm text-ink leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>

      <div className="relative mt-4 pt-4 border-t border-border">
        <p className="font-display text-sm font-semibold text-ink">{t.name}</p>
        {t.context && <p className="font-label text-xs text-muted mt-0.5">{t.context}</p>}
      </div>

      <div className="relative mt-4 flex flex-wrap items-center gap-2">
        <button
          onClick={() => openEdit(t)}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-border text-xs font-label font-medium text-ink hover:border-forest hover:text-forest transition-colors"
        >
          <Pencil size={13} /> Edit
        </button>
        {!t.approved ? (
          <button
            onClick={() => setApproved(t.id, true)}
            disabled={busyId === t.id}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-brand-gradient text-white text-xs font-label font-medium disabled:opacity-50"
          >
            {busyId === t.id ? <Loader2 size={13} className="animate-spin" /> : <CheckCircle2 size={13} />}
            Approve
          </button>
        ) : (
          <button
            onClick={() => setApproved(t.id, false)}
            disabled={busyId === t.id}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-border text-xs font-label font-medium text-ink hover:border-forest hover:text-forest transition-colors disabled:opacity-50"
          >
            Unpublish
          </button>
        )}
        <button
          onClick={() => handleDelete(t.id)}
          disabled={busyId === t.id}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-wine/30 text-xs font-label font-medium text-wine hover:bg-wine/5 transition-colors disabled:opacity-50"
        >
          {busyId === t.id ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
        </button>
      </div>
    </div>
  )

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <p className="text-sm text-muted">
          {pending.length} pending review · {approved.length} live on the public Testimonials page
        </p>
        <button onClick={openNew} className="btn-primary !px-4 !py-2.5 !text-sm">
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      {error && (
        <p className="mb-6 text-sm text-wine bg-wine/5 border border-wine/20 rounded-lg px-4 py-3">{error}</p>
      )}

      {loading ? (
        <div className="flex items-center gap-2 text-muted text-sm py-20 justify-center">
          <Loader2 size={16} className="animate-spin" /> Loading testimonials...
        </div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-20 text-muted">
          <Quote size={28} className="mx-auto mb-3 opacity-50" />
          <p className="text-sm">No testimonials yet. Add the first one.</p>
        </div>
      ) : (
        <div className="space-y-10">
          {pending.length > 0 && (
            <div>
              <p className="font-label text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-4">
                Awaiting review
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {pending.map((t) => <Row key={t.id} t={t} />)}
              </div>
            </div>
          )}
          {approved.length > 0 && (
            <div>
              <p className="font-label text-xs uppercase tracking-[0.2em] text-forest font-semibold mb-4">
                Live on site
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {approved.map((t) => <Row key={t.id} t={t} />)}
              </div>
            </div>
          )}
        </div>
      )}

      <AnimatePresence>
        {formOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm flex items-center justify-center px-4 py-8 overflow-y-auto"
            onClick={closeForm}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-lift w-full max-w-lg p-6 md:p-8 my-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-lg font-semibold text-ink">
                  {editingId ? 'Edit Testimonial' : 'Add Testimonial'}
                </h2>
                <button onClick={closeForm} className="text-muted hover:text-ink">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-label text-muted">Name</label>
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
                  <label className="text-xs font-label text-muted">Testimony</label>
                  <textarea
                    required
                    rows={4}
                    value={form.quote}
                    onChange={(e) => setForm({ ...form, quote: e.target.value })}
                    className="w-full mt-1.5 bg-surfaceAlt border border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-forest transition-colors resize-none"
                    placeholder="Share how this ministry has impacted them..."
                  />
                </div>

                <label className="flex items-center gap-2.5 text-sm text-ink cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={form.approved}
                    onChange={(e) => setForm({ ...form, approved: e.target.checked })}
                    className="w-4 h-4 rounded border-border accent-forest"
                  />
                  Publish immediately (show on the live Testimonials page)
                </label>

                <button type="submit" disabled={saving} className="btn-primary w-full disabled:opacity-60">
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                  {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Add Testimonial'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default function AdminDashboard() {
  const { username, logout } = useAuth()
  const [tab, setTab] = useState('activities')

  return (
    <div className="min-h-screen bg-surface font-body">
      <header className="bg-white border-b border-border sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt={org.name} className="w-14 h-14 object-contain rounded-lg" />
            <div>
              <p className="eyebrow mb-1">admin dashboard</p>
              <h1 className="font-display text-xl font-semibold text-ink">
                {tab === 'activities' ? 'Activities & Gallery' : 'Testimonials'}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm text-muted hover:text-forest font-label"
            >
              View site <ExternalLink size={13} />
            </a>
            <span className="hidden sm:block text-sm text-muted font-label">Hi, {username}</span>
            <button onClick={logout} className="btn-secondary !px-4 !py-2 !text-xs">
              <LogOut size={14} /> Log out
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 flex items-center gap-6 -mb-px">
          {[
            { key: 'activities', label: 'Activities & Gallery' },
            { key: 'testimonials', label: 'Testimonials' },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`py-3 text-sm font-label font-medium border-b-2 transition-colors ${
                tab === t.key ? 'border-forest text-forest' : 'border-transparent text-muted hover:text-ink'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {tab === 'activities' ? <ActivitiesPanel /> : <TestimonialsPanel />}
      </main>
    </div>
  )
}
