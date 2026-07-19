// One-off migration: copies the old data/db.json content into Postgres.
// Run once, after setting DATABASE_URL in .env:
//   node scripts/seed-from-json.js
import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { connectDb, db } from '../src/db.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_PATH = path.join(__dirname, '..', 'data', 'db.json')

async function run() {
  if (!fs.existsSync(DB_PATH)) {
    console.log('No data/db.json found — nothing to migrate.')
    return
  }

  const raw = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'))
  await connectDb()

  let activityCount = 0
  for (const activity of raw.activities || []) {
    const existing = await db.getActivity(activity.id)
    if (!existing) {
      await db.addActivity(activity)
      activityCount++
    }
  }

  let testimonialCount = 0
  for (const testimonial of raw.testimonials || []) {
    const existing = await db.getAllTestimonials()
    if (!existing.some((t) => t.id === testimonial.id)) {
      await db.addTestimonial(testimonial)
      testimonialCount++
    }
  }

  console.log(`Migrated ${activityCount} activities and ${testimonialCount} testimonials.`)
  process.exit(0)
}

run().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
