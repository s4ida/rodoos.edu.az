import React, { useState, useEffect } from 'react'
import { Alert, AlertDescription } from './ui/alert'
import { Button } from './ui/button'
import { Clock, AlertTriangle } from 'lucide-react'

interface AdminSessionWarningProps {
  show: boolean
  onExtendSession: () => void
  onLogout: () => void
  remainingMinutes?: number
}

const AdminSessionWarning: React.FC<AdminSessionWarningProps> = ({
  show,
  onExtendSession,
  onLogout,
  remainingMinutes = 5
}) => {
  const [countdown, setCountdown] = useState(remainingMinutes * 60)

  useEffect(() => {
    if (!show) return

    setCountdown(remainingMinutes * 60)
    
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          onLogout()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [show, remainingMinutes, onLogout])

  if (!show) return null

  const minutes = Math.floor(countdown / 60)
  const seconds = countdown % 60

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Session Bitir
            </h3>
            <p className="text-sm text-gray-600">
              Admin session-ınız tezliklə bitəcək
            </p>
          </div>
        </div>

        <Alert className="border-yellow-200 bg-yellow-50 mb-4">
          <Clock className="w-4 h-4" />
          <AlertDescription className="text-yellow-800">
            Session <span className="font-mono font-bold">
              {minutes}:{seconds.toString().padStart(2, '0')}
            </span> ərzində avtomatik olaraq bitəcək
          </AlertDescription>
        </Alert>

        <div className="flex gap-3">
          <Button
            onClick={onExtendSession}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            Session-ı Uzat
          </Button>
          <Button
            onClick={onLogout}
            variant="outline"
            className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
          >
            İndi Çıx
          </Button>
        </div>

        <p className="text-xs text-gray-500 mt-3 text-center">
          Təhlükəsizlik məqsədilə avtomatik logout
        </p>
      </div>
    </div>
  )
}

export default AdminSessionWarning