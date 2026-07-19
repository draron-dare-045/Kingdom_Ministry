import { Router } from 'express'
import multer from 'multer'
import streamifier from 'streamifier'
import { v2 as cloudinary } from 'cloudinary'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed.'))
    }
    cb(null, true)
  },
})

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

function streamUpload(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'kingdom-missions-centre/activities' },
      (error, result) => {
        if (result) resolve(result)
        else reject(error)
      }
    )
    streamifier.createReadStream(buffer).pipe(stream)
  })
}

router.post('/', requireAuth, upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file was received.' })
  }

  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    return res.status(500).json({
      error: 'Cloudinary is not configured on the server yet. Add CLOUDINARY_* values to .env.',
    })
  }

  try {
    const result = await streamUpload(req.file.buffer)
    res.json({ url: result.secure_url, publicId: result.public_id })
  } catch (err) {
    console.error('Cloudinary upload failed:', err)
    res.status(502).json({ error: 'Image upload to Cloudinary failed. Please try again.' })
  }
})

export default router
