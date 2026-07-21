import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import AdminApp from './admin/AdminApp.jsx'
import Home from './pages/Home.jsx'
import AboutPage from './pages/AboutPage.jsx'
import VisionPage from './pages/VisionPage.jsx'
import FoundersPage from './pages/FoundersPage.jsx'
import MinistriesPage from './pages/MinistriesPage.jsx'
import ActivitiesPage from './pages/ActivitiesPage.jsx'
import TestimonialsPage from './pages/TestimonialsPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="vision" element={<VisionPage />} />
          <Route path="founders" element={<FoundersPage />} />
          <Route path="ministries" element={<MinistriesPage />} />
          <Route path="activities" element={<ActivitiesPage />} />
          <Route path="testimonials" element={<TestimonialsPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)

// Register the service worker only in production builds — in dev this
// would cache stale modules and fight with Vite's hot reload.
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Non-fatal — the site works fine without offline support.
    })
  })
}