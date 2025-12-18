import { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import AdminLogin from './AdminLogin'
import AdminPanel from './AdminPanel'

const AdminRoute = () => {
  const { user, isAdmin, loading, forceLogout } = useAuth()

  useEffect(() => {
    if (!isAdmin) return

    // Dummy history state əlavə edirik
    window.history.pushState(null, '', window.location.href)

    const handlePopState = () => {
      // Geri düyməsi basıldıqda logout
      forceLogout()
    }

    window.addEventListener('popstate', handlePopState)

    return () => window.removeEventListener('popstate', handlePopState)
  }, [isAdmin, forceLogout])

  if (loading) return <div>Yüklənir...</div>

  if (!user || !isAdmin) return <AdminLogin />

  return <AdminPanel />
}

export default AdminRoute
