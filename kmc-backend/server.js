import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { v2 as cloudinary } from 'cloudinary'

import authRoutes from './src/routes/auth.js'
import activitiesRoutes from './src/routes/activities.js'
import testimonialsRoutes from './src/routes/testimonials.js'
import uploadRoutes from './src/routes/upload.js'
import { connectDb } from './src/db.js'

const app = express()
const PORT = process.env.PORT || 4000

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const allowedOrigins = (process.env.FRONTEND_ORIGIN || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean)

app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : true,
  })
)
app.use(express.json({ limit: '2mb' }))

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    cloudinaryConfigured: Boolean(process.env.CLOUDINARY_CLOUD_NAME),
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/activities', activitiesRoutes)
app.use('/api/testimonials', testimonialsRoutes)
app.use('/api/upload', uploadRoutes)

// Friendly error handler (e.g. multer file-too-large / bad file type errors)
app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status || 500).json({ error: err.message || 'Something went wrong.' })
})

async function start() {
  try {
    await connectDb()
  } catch (err) {
    console.error('❌ Could not connect to Postgres:', err.message)
    process.exit(1)
  }

  app.listen(PORT, () => {
    console.log(`Kingdom Missions Centre API running on http://localhost:${PORT}`)
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      console.warn('⚠️  Cloudinary env vars are not set yet — image uploads will fail until you add them to .env')
    }
    if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'replace-with-a-long-random-string') {
      console.warn('⚠️  JWT_SECRET is missing or still the placeholder — set a real secret in .env before going live')
    }
  })
}

start()
