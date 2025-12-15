import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import AdminLogin from './AdminLogin'
import AdminPanel from './AdminPanel'
import { Shield, Loader2 } from 'lucide-react'

const AdminRoute: React.FC = () => {
  const { isAdmin, loading } = useAuth()

  // Loading vəziyyəti
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-20 h-20 bg-white rounded-2xl shadow-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-10 h-10 text-blue-600" />
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Admin Panel Yüklənir
            </h2>
            <p className="text-gray-600 mb-4">
              Admin məlumatları yoxlanılır...
            </p>
            
            {/* Loading progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full animate-pulse"></div>
            </div>
            
            <div className="mt-4 text-sm text-gray-500">
              🔐 Rodoos Education Center
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Admin deyilsə login səhifəsini göstər
  if (!isAdmin) {
    return <AdminLogin />
  }

  // Admin isə panel göstər
  return <AdminPanel />
}

export default AdminRoute