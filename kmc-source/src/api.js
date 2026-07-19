// Points at the backend in kmc-backend/. In development Vite proxies
// nothing by default, so set VITE_API_URL in a .env file at the project
// root if your API isn't running on the default http://localhost:4000.
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

function authHeaders() {
  const token = localStorage.getItem('kmc_admin_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function handle(res) {
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`)
  }
  return data
}

export const api = {
  // Public
  getActivities: () => fetch(`${API_URL}/api/activities`).then(handle),
  getTestimonials: () => fetch(`${API_URL}/api/testimonials`).then(handle),
  submitTestimonial: (payload) =>
    fetch(`${API_URL}/api/testimonials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then(handle),

  // Auth
  login: (username, password) =>
    fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    }).then(handle),

  verify: () =>
    fetch(`${API_URL}/api/auth/verify`, { headers: authHeaders() }).then(handle),

  // Admin — activities
  createActivity: (payload) =>
    fetch(`${API_URL}/api/activities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(payload),
    }).then(handle),

  updateActivity: (id, payload) =>
    fetch(`${API_URL}/api/activities/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(payload),
    }).then(handle),

  deleteActivity: (id) =>
    fetch(`${API_URL}/api/activities/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    }).then(handle),

  // Admin — image upload (multipart)
  uploadImage: (file) => {
    const formData = new FormData()
    formData.append('image', file)
    return fetch(`${API_URL}/api/upload`, {
      method: 'POST',
      headers: authHeaders(),
      body: formData,
    }).then(handle)
  },

  // Admin — testimonials moderation
  getAllTestimonials: () =>
    fetch(`${API_URL}/api/testimonials/all`, { headers: authHeaders() }).then(handle),

  createTestimonial: (payload) =>
    fetch(`${API_URL}/api/testimonials/admin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(payload),
    }).then(handle),

  updateTestimonial: (id, payload) =>
    fetch(`${API_URL}/api/testimonials/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(payload),
    }).then(handle),

  deleteTestimonial: (id) =>
    fetch(`${API_URL}/api/testimonials/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    }).then(handle),
}
