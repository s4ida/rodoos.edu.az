import { useEffect, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'

const useAdminTimeout = (timeoutMinutes: number = 30) => {
  const { logout } = useAuth()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const warningTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isAdminPageRef = useRef(false)
  const isWarningShownRef = useRef(false)

  const clearTimeouts = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current)
      warningTimeoutRef.current = null
    }
  }

  const resetTimeout = () => {
    clearTimeouts()
    isWarningShownRef.current = false
    
    // Sadəcə admin paneldə olanda timeout başlat
    if (isAdminPageRef.current) {
      // 25 dəqiqədən sonra xəbərdarlıq (5 dəqiqə əvvəl)
      warningTimeoutRef.current = setTimeout(() => {
        if (isAdminPageRef.current && !isWarningShownRef.current) {
          isWarningShownRef.current = true
          const shouldStay = window.confirm(
            'Admin sessiyası 5 dəqiqə sonra bitəcək. Davam etmək istəyirsiniz?\n\n' +
            'Təsdiqləsəniz session uzadılacaq.'
          )
          if (shouldStay) {
            resetTimeout() // Session uzat
          } else {
            // İstifadəçi çıxmaq istəyir
            logout()
          }
        }
      }, (timeoutMinutes - 5) * 60 * 1000)

      // 30 dəqiqədən sonra avtomatik logout
      timeoutRef.current = setTimeout(() => {
        if (isAdminPageRef.current) {
          alert('Admin sessiyası müddəti bitdi. Avtomatik çıxış edildi.')
          logout()
        }
      }, timeoutMinutes * 60 * 1000)
    }
  }

  const setAdminPage = (isAdmin: boolean) => {
    isAdminPageRef.current = isAdmin
    if (isAdmin) {
      console.log('Admin panel aktivləşdirildi - timeout başladı')
      resetTimeout()
    } else {
      console.log('Admin paneldən çıxıldı - timeout dayandırıldı')
      clearTimeouts()
      isWarningShownRef.current = false
    }
  }

  useEffect(() => {
    const handleActivity = (e: Event) => {
      // Sadəcə admin paneldə olanda activity track et
      if (isAdminPageRef.current) {
        // Console.log azalt, sadəcə vacib activity'ləri track et
        if (e.type === 'click' || e.type === 'keydown') {
          console.log('Admin panel activity detected:', e.type)
        }
        resetTimeout()
      }
    }

    const handleVisibilityChange = () => {
      // Tab visibility dəyişəndə HEÇNƏ ETMƏ!
      // Əvvəlki kod burada logout edirdi
      if (document.hidden) {
        console.log('Tab hidden - amma admin session davam edir')
      } else {
        console.log('Tab visible - admin session hələ aktivdir')
      }
    }

    const handleBeforeUnload = () => {
      console.log('Page unloading - timeouts cleared')
      clearTimeouts()
    }

    // Event listener'ları əlavə et
    const events = ['mousedown', 'keydown', 'click', 'scroll', 'touchstart']
    events.forEach(event => {
      document.addEventListener(event, handleActivity, { passive: true })
    })
    
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      clearTimeouts()
      events.forEach(event => {
        document.removeEventListener(event, handleActivity)
      })
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  return {
    setAdminPage,
    resetTimeout,
    clearTimeouts
  }
}

export default useAdminTimeout