import { Router } from 'express'
import { nanoid } from 'nanoid'
import { db } from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// Public — the live Testimonials page reads from here (approved only).
router.get('/', async (req, res, next) => {
  try {
    res.json(await db.getApprovedTestimonials())
  } catch (err) {
    next(err)
  }
})

// Public — anyone can submit a testimony. It's saved as unapproved and
// won't appear on the site until an admin approves it below.
router.post('/', async (req, res, next) => {
  try {
    const { name, context, quote } = req.body || {}

    if (!name || !quote) {
      return res.status(400).json({ error: 'Name and testimony are required.' })
    }
    if (quote.length > 2000) {
      return res.status(400).json({ error: 'Testimony is too long.' })
    }

    const testimonial = {
      id: nanoid(10),
      name: String(name).slice(0, 120),
      context: String(context || '').slice(0, 160),
      quote: String(quote).slice(0, 2000),
      approved: false,
      createdAt: new Date().toISOString(),
    }

    await db.addTestimonial(testimonial)
    res.status(201).json({ success: true, message: 'Thank you — your testimony has been submitted for review.' })
  } catch (err) {
    next(err)
  }
})

// Admin-only — add a testimonial directly (e.g. one shared in person,
// by phone, or written by staff). Pre-approved by default since an
// admin is entering it themselves, but can be left unapproved by
// passing approved:false.
router.post('/admin', requireAuth, async (req, res, next) => {
  try {
    const { name, context, quote, approved } = req.body || {}

    if (!name || !quote) {
      return res.status(400).json({ error: 'Name and testimony are required.' })
    }
    if (quote.length > 2000) {
      return res.status(400).json({ error: 'Testimony is too long.' })
    }

    const testimonial = {
      id: nanoid(10),
      name: String(name).slice(0, 120),
      context: String(context || '').slice(0, 160),
      quote: String(quote).slice(0, 2000),
      approved: approved !== undefined ? Boolean(approved) : true,
      createdAt: new Date().toISOString(),
    }

    await db.addTestimonial(testimonial)
    res.status(201).json(testimonial)
  } catch (err) {
    next(err)
  }
})

// Admin-only from here down.
router.get('/all', requireAuth, async (req, res, next) => {
  try {
    res.json(await db.getAllTestimonials())
  } catch (err) {
    next(err)
  }
})

router.put('/:id', requireAuth, async (req, res, next) => {
  try {
    const { name, context, quote, approved } = req.body || {}
    const updated = await db.updateTestimonial(req.params.id, {
      ...(name !== undefined && { name }),
      ...(context !== undefined && { context }),
      ...(quote !== undefined && { quote }),
      ...(approved !== undefined && { approved }),
    })

    if (!updated) return res.status(404).json({ error: 'Testimonial not found.' })
    res.json(updated)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const removed = await db.deleteTestimonial(req.params.id)
    if (!removed) return res.status(404).json({ error: 'Testimonial not found.' })
    res.json({ success: true })
  } catch (err) {
    next(err)
  }
})

export default router
