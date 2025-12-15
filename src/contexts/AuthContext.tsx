import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  isAdmin: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  forceLogout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const ADMIN_EMAIL = 'rodoos.itm.office@gmail.com'

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastActivity, setLastActivity] = useState<number>(Date.now())

  // Session timeout - 30 dəqiqə
  const SESSION_TIMEOUT = 30 * 60 * 1000

  // Admin yoxlanılması - daha ciddi yoxlama
  const isAdmin = Boolean(
    user?.email === ADMIN_EMAIL && 
    session?.access_token &&
    (Date.now() - lastActivity) < SESSION_TIMEOUT &&
    !localStorage.getItem('admin_force_logout') // Məcburi logout yoxlanışı
  )

  useEffect(() => {
    const getInitialSession = async () => {
      // Əgər məcburi logout flag-ı varsa, sessiyonu təmizlə
      if (localStorage.getItem('admin_force_logout')) {
        await supabase.auth.signOut()
        localStorage.removeItem('admin_force_logout')
        setUser(null)
        setSession(null)
        setLoading(false)
        return
      }

      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getInitialSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email)
        
        // Məcburi logout flag-ı yoxla
        if (localStorage.getItem('admin_force_logout')) {
          setUser(null)
          setSession(null)
          setLastActivity(0)
          localStorage.removeItem('admin_force_logout')
          setLoading(false)
          return
        }

        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
        
        if (event === 'SIGNED_OUT') {
          setLastActivity(0)
          // Bütün storage-ı təmizlə
          localStorage.clear()
          sessionStorage.clear()
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // Activity tracker - yalnız admin sessiyası üçün
  useEffect(() => {
    if (!user || user.email !== ADMIN_EMAIL) return

    const updateActivity = () => {
      setLastActivity(Date.now())
    }

    const events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart', 'click']
    
    events.forEach(event => {
      document.addEventListener(event, updateActivity, true)
    })

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, updateActivity, true)
      })
    }
  }, [user])

  // Session timeout yoxlayıcı
  useEffect(() => {
    if (!session || !user || user.email !== ADMIN_EMAIL) return

    const checkTimeout = setInterval(() => {
      const timeSinceActivity = Date.now() - lastActivity
      
      if (timeSinceActivity > SESSION_TIMEOUT) {
        console.log('Admin session timeout, logging out...')
        forceLogout()
      }
    }, 60000) // Hər dəqiqə yoxla

    return () => clearInterval(checkTimeout)
  }, [session, user, lastActivity])

  // Page unload və visibility change tracking
  useEffect(() => {
    if (!user || user.email !== ADMIN_EMAIL) return

    const handleBeforeUnload = () => {
      // Səhifə qapatılanda məcburi logout flag-ı set et
      localStorage.setItem('admin_force_logout', 'true')
      forceLogout()
    }

    const handleVisibilityChange = () => {
      // Səhifə gizləndikdə (tab dəyişikliyi) logout
      if (document.hidden) {
        localStorage.setItem('admin_force_logout', 'true')
        forceLogout()
      }
    }

    const handlePopState = () => {
      // Navigation zamanı admin paneldən çıxış
      if (window.location.pathname !== '/admin') {
        localStorage.setItem('admin_force_logout', 'true')
        forceLogout()
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [user])

  const login = async (email: string, password: string): Promise<void> => {
    try {
      console.log('Admin login attempt:', { email })
      
      // Login öncə bütün flag-ları təmizlə
      localStorage.removeItem('admin_force_logout')
      localStorage.removeItem('supabase.auth.token')
      sessionStorage.clear()
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log('Login result:', { data, error })

      if (error) throw error
      
      // Successful login zamanı activity time-ı set et
      setLastActivity(Date.now())
      
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const logout = async (): Promise<void> => {
    try {
      console.log('Normal logout...')
      
      // Məcburi logout flag-ı set et
      localStorage.setItem('admin_force_logout', 'true')
      
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      // Bütün storage-ı təmizlə
      localStorage.clear()
      sessionStorage.clear()
      
      // State-i təmizlə
      setUser(null)
      setSession(null)
      setLastActivity(0)
      
      console.log('Logout successful')
    } catch (error) {
      console.error('Logout error:', error)
      // Error olsa belə state-i təmizlə
      localStorage.clear()
      sessionStorage.clear()
      setUser(null)
      setSession(null)
      setLastActivity(0)
      throw error
    }
  }

  const forceLogout = async (): Promise<void> => {
    try {
      console.log('Force logout...')
      
      // Dərhal flag set et
      localStorage.setItem('admin_force_logout', 'true')
      
      // Supabase sessiyasını bitir
      await supabase.auth.signOut()
      
      // Bütün storage təmizlə
      localStorage.clear()
      sessionStorage.clear()
      
      // State təmizlə
      setUser(null)
      setSession(null)
      setLastActivity(0)
      
      // Səhifəni yenilə ki, təmiz başlanğıc olsun
      window.location.reload()
      
    } catch (error) {
      console.error('Force logout error:', error)
      // Error olsa da state təmizlə
      localStorage.clear()
      sessionStorage.clear()
      setUser(null)
      setSession(null)
      setLastActivity(0)
      window.location.reload()
    }
  }

  const value: AuthContextType = {
    user,
    session,
    loading,
    isAdmin,
    login,
    logout,
    forceLogout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}