import { useEffect, useCallback, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'

interface UseAdminTimeoutOptions {
  timeoutMinutes?: number
  warningMinutes?: number
  onWarning?: () => void
  onTimeout?: () => void
}

export const useAdminTimeout = ({
  timeoutMinutes = 30,
  warningMinutes = 5,
  onWarning,
  onTimeout
}: UseAdminTimeoutOptions = {}) => {
  const { logout, user, session } = useAuth()
  const timeoutRef = useRef<NodeJS.Timeout>()
  const warningRef = useRef<NodeJS.Timeout>()
  const lastActivityRef = useRef<number>(Date.now())

  const resetTimeout = useCallback(() => {
    lastActivityRef.current = Date.now()
    
    // Clear existing timers
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (warningRef.current) clearTimeout(warningRef.current)

    // Only set timers if admin is logged in
    if (!user || !session) return

    // Set warning timer
    const warningMs = (timeoutMinutes - warningMinutes) * 60 * 1000
    warningRef.current = setTimeout(() => {
      onWarning?.()
    }, warningMs)

    // Set logout timer
    const timeoutMs = timeoutMinutes * 60 * 1000
    timeoutRef.current = setTimeout(async () => {
      console.log('Admin session timeout - logging out...')
      try {
        await logout()
        onTimeout?.()
      } catch (error) {
        console.error('Logout error:', error)
      }
    }, timeoutMs)
  }, [timeoutMinutes, warningMinutes, onWarning, onTimeout, logout, user, session])

  // Track user activity
  useEffect(() => {
    if (!user || !session) return

    const events = [
      'mousedown', 'mousemove', 'keypress', 'scroll', 
      'touchstart', 'click', 'keydown'
    ]

    const handleActivity = () => {
      resetTimeout()
    }

    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true)
    })

    // Initial timer setup
    resetTimeout()

    // Cleanup
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true)
      })
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (warningRef.current) clearTimeout(warningRef.current)
    }
  }, [resetTimeout, user, session])

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (warningRef.current) clearTimeout(warningRef.current)
    }
  }, [])

  return {
    resetTimeout,
    lastActivity: lastActivityRef.current
  }
}