# Kingdom Missions Centre — Website + Admin System

This project now has three parts:

```
kmc-project/
├── kmc-source/     ← the public website (React + Vite + Tailwind)
├── kmc-backend/    ← the API that stores activities + handles photo uploads
└── package.json    ← runs both of the above together with one command
```

The public site's **Activities & Gallery** section now reads live data from
the backend. Church staff manage that content through a password-protected
admin dashboard at **`/admin`** — no code editing required to post a new
event or photo.

---

## 1. One-time setup

You need [Node.js](https://nodejs.org) 18+ installed. Then, from the
`kmc-project` folder:

```bash
npm run install:all
```

This installs dependencies for both the website and the backend.

### Create your environment files

Copy the two example files and fill in real values:

```bash
cp kmc-backend/.env.example kmc-backend/.env
cp kmc-source/.env.example kmc-source/.env
```

Open `kmc-backend/.env` and set:

| Variable | What it is |
|---|---|
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | The login for the admin dashboard. Change these from the defaults. |
| `JWT_SECRET` | Any long random string. Generate one with `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"` |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | From a free [Cloudinary](https://cloudinary.com) account — Dashboard → Account Details. This is where uploaded photos are stored. |
| `FRONTEND_ORIGIN` | Where the website runs. Leave as `http://localhost:5173` for local dev. |

`kmc-source/.env` only needs `VITE_API_URL` — the default (`http://localhost:4000`) is correct for local dev.

---

## 2. Run it

From `kmc-project/`:

```bash
npm run dev
```

This starts **both** the backend API (port 4000) and the website (port
5173) together. Open:

- **http://localhost:5173** — the public website
- **http://localhost:5173/admin** — the admin dashboard (log in with the
  `ADMIN_USERNAME` / `ADMIN_PASSWORD` you set)

If you'd rather run them in separate terminals: `npm run dev:backend` and
`npm run dev:frontend`.

---

## 3. Using the admin dashboard

Once logged in at `/admin`, staff can:

- **Add Activity** — title, category, date, description, and a photo
  (uploaded straight to Cloudinary — no file size headaches).
- **Edit** any existing entry.
- **Delete** an entry (its photo is removed from Cloudinary too).

Every change appears on the public Activities & Gallery section
immediately — no rebuild or redeploy needed.

If the backend is ever offline, the public site quietly falls back to the
built-in activity list in `kmc-source/src/data.js` so it never looks
broken to visitors.

---

## 4. What's what, for developers

- **Backend** (`kmc-backend/`): Express API. Activities are stored in
  `kmc-backend/data/db.json` — a simple file-based store, no database
  server to install. Swap it for Postgres/MongoDB later by replacing
  `src/db.js` only; nothing else needs to change.
- **Auth**: a single admin account, checked against `.env`, issuing a JWT
  used by the dashboard for all write requests.
- **Images**: uploaded via `multipart/form-data` to `/api/upload`, streamed
  straight to Cloudinary from the server (the API secret never reaches the
  browser).
- **Frontend routing**: `react-router-dom` — `/` is the public site,
  `/admin/*` is the dashboard, gated by `src/admin/AuthContext.jsx`.

---

## 5. Deploying (when you're ready to go live)

- **Backend**: any Node host works (Render, Railway, Fly.io, a VPS). Set
  the same env vars there. Render's free tier is a common starting point.
- **Frontend**: `npm run build` inside `kmc-source/` produces a static
  `dist/` folder — deploy it to Netlify, Vercel, or Cloudflare Pages. Set
  `VITE_API_URL` there to your live backend URL.
- Update `FRONTEND_ORIGIN` in the backend's `.env` to your live site's URL
  so the browser is allowed to talk to the API.
