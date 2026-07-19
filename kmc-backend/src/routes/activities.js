import { Router } from 'express'
import { nanoid } from 'nanoid'
import { v2 as cloudinary } from 'cloudinary'
import { db } from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// Public — the live site reads from here.
router.get('/', async (req, res, next) => {
  try {
    res.json(await db.getActivities())
  } catch (err) {
    next(err)
  }
})

// Admin-only from here down.
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const { title, category, description, image, imagePublicId, date } = req.body || {}

    if (!title || !category) {
      return res.status(400).json({ error: 'Title and category are required.' })
    }

    const activity = {
      id: nanoid(10),
      title,
      category,
      description: description || '',
      image: image || '',
      imagePublicId: imagePublicId || '',
      date: date || '',
      createdAt: new Date().toISOString(),
    }

    await db.addActivity(activity)
    res.status(201).json(activity)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', requireAuth, async (req, res, next) => {
  try {
    const { title, category, description, image, imagePublicId, date } = req.body || {}
    const updated = await db.updateActivity(req.params.id, {
      ...(title !== undefined && { title }),
      ...(category !== undefined && { category }),
      ...(description !== undefined && { description }),
      ...(image !== undefined && { image }),
      ...(imagePublicId !== undefined && { imagePublicId }),
      ...(date !== undefined && { date }),
    })

    if (!updated) return res.status(404).json({ error: 'Activity not found.' })
    res.json(updated)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const existing = await db.getActivity(req.params.id)
    if (!existing) return res.status(404).json({ error: 'Activity not found.' })

    // Best-effort: also remove the image from Cloudinary storage.
    if (existing.imagePublicId && process.env.CLOUDINARY_CLOUD_NAME) {
      try {
        await cloudinary.uploader.destroy(existing.imagePublicId)
      } catch (err) {
        console.warn('Could not delete Cloudinary image (continuing anyway):', err.message)
      }
    }

    await db.deleteActivity(req.params.id)
    res.json({ success: true })
  } catch (err) {
    next(err)
  }
})

export default router
