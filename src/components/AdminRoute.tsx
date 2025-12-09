import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import AdminLogin from './AdminLogin'
import AdminPanel from './AdminPanel'

const AdminRoute: React.FC = () => {
  const { user, isAdmin, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!user || !isAdmin) {
    return <AdminLogin />
  }

  return <AdminPanel />
}

export default AdminRoute