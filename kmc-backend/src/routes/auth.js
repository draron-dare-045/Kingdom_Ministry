import { Router } from 'express'
import jwt from 'jsonwebtoken'

const router = Router()

router.post('/login', (req, res) => {
  const { username, password } = req.body || {}

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' })
  }

  const validUsername = username === process.env.ADMIN_USERNAME
  const validPassword = password === process.env.ADMIN_PASSWORD

  if (!validUsername || !validPassword) {
    return res.status(401).json({ error: 'Incorrect username or password.' })
  }

  const token = jwt.sign(
    { username, role: 'admin' },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

  res.json({ token, username })
})

// Lets the admin dashboard check whether a stored token is still valid on load.
router.get('/verify', (req, res) => {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return res.status(401).json({ valid: false })

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    res.json({ valid: true, username: payload.username })
  } catch {
    res.status(401).json({ valid: false })
  }
})

export default router
