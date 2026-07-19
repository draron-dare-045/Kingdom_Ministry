import { Loader2 } from 'lucide-react'
import { AuthProvider, useAuth } from './AuthContext'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'

function Gate() {
  const { isAuthed, checking } = useAuth()

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted">
        <Loader2 size={20} className="animate-spin" />
      </div>
    )
  }

  return isAuthed ? <AdminDashboard /> : <AdminLogin />
}

export default function AdminApp() {
  return (
    <AuthProvider>
      <Gate />
    </AuthProvider>
  )
}
