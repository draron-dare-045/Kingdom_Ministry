import pg from 'pg'

const { Pool } = pg

let pool

// Connects once at server startup (called from server.js) and creates the
// tables if they don't exist yet. Render's own Postgres needs SSL for
// external connections; rejectUnauthorized:false matches what Render's
// docs recommend since it uses a Render-issued cert chain.
export async function connectDb() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set — add it to your .env (see .env.example).')
  }

  pool = new Pool({
    connectionString,
    ssl: connectionString.includes('localhost') ? false : { rejectUnauthorized: false },
  })

  await pool.query('SELECT 1') // fail fast if the connection is bad

  await pool.query(`
    CREATE TABLE IF NOT EXISTS activities (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT DEFAULT '',
      image TEXT DEFAULT '',
      image_public_id TEXT DEFAULT '',
      date TEXT DEFAULT '',
      created_at TEXT DEFAULT ''
    )
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS testimonials (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      context TEXT DEFAULT '',
      quote TEXT NOT NULL,
      approved BOOLEAN DEFAULT false,
      created_at TEXT DEFAULT ''
    )
  `)

  console.log('Connected to Postgres')
}

// Row <-> JS object mapping — keeps the same camelCase shape the app has
// always used (image PublicId, createdAt) even though Postgres columns
// are snake_case.
function activityFromRow(row) {
  if (!row) return null
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    description: row.description,
    image: row.image,
    imagePublicId: row.image_public_id,
    date: row.date,
    createdAt: row.created_at,
  }
}

function testimonialFromRow(row) {
  if (!row) return null
  return {
    id: row.id,
    name: row.name,
    context: row.context,
    quote: row.quote,
    approved: row.approved,
    createdAt: row.created_at,
  }
}

export const db = {
  async getActivities() {
    const { rows } = await pool.query('SELECT * FROM activities ORDER BY created_at DESC')
    return rows.map(activityFromRow)
  },
  async addActivity(activity) {
    await pool.query(
      `INSERT INTO activities (id, title, category, description, image, image_public_id, date, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        activity.id,
        activity.title,
        activity.category,
        activity.description || '',
        activity.image || '',
        activity.imagePublicId || '',
        activity.date || '',
        activity.createdAt,
      ]
    )
    return activity
  },
  async updateActivity(id, updates) {
    const existing = await db.getActivity(id)
    if (!existing) return null
    const merged = { ...existing, ...updates }
    await pool.query(
      `UPDATE activities SET title=$2, category=$3, description=$4, image=$5, image_public_id=$6, date=$7
       WHERE id=$1`,
      [id, merged.title, merged.category, merged.description, merged.image, merged.imagePublicId, merged.date]
    )
    return merged
  },
  async deleteActivity(id) {
    const existing = await db.getActivity(id)
    if (!existing) return null
    await pool.query('DELETE FROM activities WHERE id=$1', [id])
    return existing
  },
  async getActivity(id) {
    const { rows } = await pool.query('SELECT * FROM activities WHERE id=$1', [id])
    return activityFromRow(rows[0])
  },

  // Testimonials — public submissions land as approved:false and only
  // show on the live site once an admin approves them.
  async getApprovedTestimonials() {
    const { rows } = await pool.query('SELECT * FROM testimonials WHERE approved=true ORDER BY created_at DESC')
    return rows.map(testimonialFromRow)
  },
  async getAllTestimonials() {
    const { rows } = await pool.query('SELECT * FROM testimonials ORDER BY created_at DESC')
    return rows.map(testimonialFromRow)
  },
  async addTestimonial(testimonial) {
    await pool.query(
      `INSERT INTO testimonials (id, name, context, quote, approved, created_at)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        testimonial.id,
        testimonial.name,
        testimonial.context || '',
        testimonial.quote,
        testimonial.approved || false,
        testimonial.createdAt,
      ]
    )
    return testimonial
  },
  async updateTestimonial(id, updates) {
    const existing = await db.getAllTestimonials().then((all) => all.find((t) => t.id === id))
    if (!existing) return null
    const merged = { ...existing, ...updates }
    await pool.query(
      `UPDATE testimonials SET name=$2, context=$3, quote=$4, approved=$5 WHERE id=$1`,
      [id, merged.name, merged.context, merged.quote, merged.approved]
    )
    return merged
  },
  async deleteTestimonial(id) {
    const existing = await db.getAllTestimonials().then((all) => all.find((t) => t.id === id))
    if (!existing) return null
    await pool.query('DELETE FROM testimonials WHERE id=$1', [id])
    return existing
  },
}
