import React, { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase, type Exam, type News } from '../lib/supabase'
import ExamForm from './ExamForm'
import NewsForm from './NewsForm'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Alert, AlertDescription } from './ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Trash2, ExternalLink, LogOut, Shield, Clock, Activity, AlertTriangle } from 'lucide-react'

const AdminPanel: React.FC = () => {
  const { user, logout, session } = useAuth()
  const [exams, setExams] = useState<Exam[]>([])
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [sessionTime, setSessionTime] = useState<string>('')
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [warningCountdown, setWarningCountdown] = useState(300) // 5 dəqiqə

  // Session timeout constants
  const SESSION_TIMEOUT = 30 * 60 * 1000 // 30 dəqiqə
  const WARNING_TIME = 5 * 60 * 1000 // 5 dəqiqə əvvəl xəbərdarliq

  // Activity tracking
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    let warningTimeoutId: NodeJS.Timeout
    let lastActivity = Date.now()

    const resetTimer = () => {
      lastActivity = Date.now()
      setShowWarning(false)
      
      // Clear existing timers
      clearTimeout(timeoutId)
      clearTimeout(warningTimeoutId)

      // Set warning timer
      warningTimeoutId = setTimeout(() => {
        setShowWarning(true)
        setWarningCountdown(300) // 5 dəqiqə
      }, SESSION_TIMEOUT - WARNING_TIME)

      // Set logout timer
      timeoutId = setTimeout(() => {
        handleLogout()
      }, SESSION_TIMEOUT)
    }

    // Activity events
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']
    
    events.forEach(event => {
      document.addEventListener(event, resetTimer, true)
    })

    // Initial timer setup
    resetTimer()

    // Cleanup
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, resetTimer, true)
      })
      clearTimeout(timeoutId)
      clearTimeout(warningTimeoutId)
    }
  }, [])

  // Warning countdown
  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (showWarning) {
      interval = setInterval(() => {
        setWarningCountdown(prev => {
          if (prev <= 1) {
            handleLogout()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [showWarning])

  // Session time tracker
  useEffect(() => {
    const updateSessionTime = () => {
      if (session?.user) {
        const loginTime = new Date(session.user.last_sign_in_at || session.user.created_at)
        const now = new Date()
        const diff = now.getTime() - loginTime.getTime()
        const minutes = Math.floor(diff / 60000)
        const seconds = Math.floor((diff % 60000) / 1000)
        setSessionTime(`${minutes}:${seconds.toString().padStart(2, '0')}`)
      }
    }

    updateSessionTime()
    const interval = setInterval(updateSessionTime, 1000)
    
    return () => clearInterval(interval)
  }, [session])

  // Logout funksiyası
  const handleLogout = useCallback(async () => {
    if (isLoggingOut) return
    
    setIsLoggingOut(true)
    setShowWarning(false)
    
    try {
      // Clear all storage
      localStorage.clear()
      sessionStorage.clear()
      
      await logout()
    } catch (error) {
      console.error('Logout error:', error)
      setError('Çıxış zamanı xəta baş verdi')
    } finally {
      setIsLoggingOut(false)
    }
  }, [logout, isLoggingOut])

  // Extend session
  const extendSession = useCallback(() => {
    setShowWarning(false)
    // Activity will automatically reset the timer
    document.dispatchEvent(new Event('mousemove'))
  }, [])

  // Keyboard shortcut - Ctrl+L ile logout
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'l') {
        event.preventDefault()
        handleLogout()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleLogout])

  // İmtahanları yüklə
  const fetchExams = async () => {
    try {
      const { data, error } = await supabase
        .from('exams')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setExams(data || [])
    } catch (err: any) {
      setError('İmtahanlar yüklənərkən xəta: ' + err.message)
    }
  }

  // Xəbərləri yüklə
  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setNews(data || [])
    } catch (err: any) {
      setError('Xəbərlər yüklənərkən xəta: ' + err.message)
    }
  }

  const fetchAllData = async () => {
    setLoading(true)
    await Promise.all([fetchExams(), fetchNews()])
    setLoading(false)
  }

  useEffect(() => {
    fetchAllData()
  }, [])

  // Xəbər silmə
  const deleteNews = async (newsId: number) => {
    if (!confirm('Xəbəri silmək istədiyinizdən əminsiniz?')) return

    try {
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', newsId)

      if (error) throw error
      fetchNews()
    } catch (err: any) {
      setError('Xəbər silinərkən xəta: ' + err.message)
    }
  }

  // İmtahan silmə
  const deleteExam = async (examId: number) => {
    if (!confirm('İmtahanı silmək istədiyinizdən əminsiniz?')) return

    try {
      const { error } = await supabase
        .from('exams')
        .delete()
        .eq('id', examId)

      if (error) throw error
      fetchExams()
    } catch (err: any) {
      setError('İmtahan silinərkən xəta: ' + err.message)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('az-AZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const warningMinutes = Math.floor(warningCountdown / 60)
  const warningSeconds = warningCountdown % 60

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Session Warning Modal */}
        {showWarning && (
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
                    {warningMinutes}:{warningSeconds.toString().padStart(2, '0')}
                  </span> ərzində avtomatik olaraq bitəcək
                </AlertDescription>
              </Alert>

              <div className="flex gap-3">
                <Button
                  onClick={extendSession}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  Session-ı Uzat
                </Button>
                <Button
                  onClick={handleLogout}
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
        )}

        {/* Enhanced Header with Session Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Paneli</h1>
                <p className="text-gray-600 flex items-center gap-2">
                  <span>Xoş gəlmisiniz, {user?.email}</span>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Activity className="w-3 h-3" />
                    Aktiv
                  </Badge>
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Session Time */}
              <div className="bg-gray-50 rounded-lg px-4 py-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-mono text-gray-700">
                  Session: {sessionTime}
                </span>
              </div>
              
              {/* Logout Button */}
              <Button 
                onClick={handleLogout} 
                variant="outline"
                disabled={isLoggingOut}
                className="flex items-center gap-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
              >
                <LogOut className="w-4 h-4" />
                {isLoggingOut ? 'Çıxılır...' : 'Çıxış'}
              </Button>
            </div>
          </div>
          
          {/* Session Info Bar */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>🔐 Təhlükəsizlik: Session avtomatik olaraq 30 dəqiqə aktivlik olmadıqda bitir</span>
              <span>💡 Sürətli çıxış: Ctrl + L</span>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert className="border-red-200 bg-red-50 mb-6">
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="news" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="news">Xəbərlər İdarəsi</TabsTrigger>
            <TabsTrigger value="exams">İmtahan İdarəsi</TabsTrigger>
          </TabsList>

          {/* Xəbərlər Tab */}
          <TabsContent value="news" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Sol tərəf - Xəbər əlavə etmə formu */}
              <div className="w-full">
                <NewsForm onNewsAdded={fetchNews} />
              </div>

              {/* Sağ tərəf - Mövcud xəbərlər siyahısı */}
              <div className="w-full">
                <Card>
                  <CardHeader>
                    <CardTitle>Mövcud Xəbərlər ({news.length})</CardTitle>
                    <CardDescription>
                      Yaradılmış xəbərlərin siyahısı
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <div className="text-center py-4">Yüklənir...</div>
                    ) : news.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        Hələ xəbər əlavə edilməyib
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                        {news.map((item) => (
                          <div
                            key={item.id}
                            className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium text-gray-900 text-sm truncate">
                                {item.title}
                              </h3>
                              <div className="flex gap-1 ml-2 flex-shrink-0">
                                {item.important && (
                                  <Badge variant="destructive" className="text-xs px-1 py-0">
                                    Vacib
                                  </Badge>
                                )}
                                <Badge variant="secondary" className="text-xs px-1 py-0">
                                  {item.tag}
                                </Badge>
                              </div>
                            </div>
                            <p 
                              className="text-sm text-gray-600 mb-2 overflow-hidden text-ellipsis"
                              style={{ 
                                display: '-webkit-box', 
                                WebkitLineClamp: 2, 
                                WebkitBoxOrient: 'vertical' 
                              }}
                            >
                              {item.description}
                            </p>
                            <div className="flex justify-between items-center">
                              <div className="text-xs text-gray-400">
                                {formatDate(item.date)} • {item.author || 'Admin'}
                              </div>
                              <div className="flex gap-1">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => window.open(`/news/${item.id}`, '_blank')}
                                  className="text-xs px-2 py-1 h-7"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => deleteNews(item.id!)}
                                  className="text-xs px-2 py-1 h-7"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* İmtahanlar Tab */}
          <TabsContent value="exams" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Sol tərəf - İmtahan əlavə etmə formu */}
              <div className="w-full">
                <ExamForm onExamAdded={fetchExams} />
              </div>

              {/* Sağ tərəf - Mövcud imtahanlar siyahısı */}
              <div className="w-full">
                <Card>
                  <CardHeader>
                    <CardTitle>Mövcud İmtahanlar ({exams.length})</CardTitle>
                    <CardDescription>
                      Yaradılmış imtahanların siyahısı
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <div className="text-center py-4">Yüklənir...</div>
                    ) : exams.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        Hələ imtahan əlavə edilməyib
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                        {exams.map((exam) => (
                          <div
                            key={exam.id}
                            className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium text-gray-900 text-sm truncate">
                                {exam.title}
                              </h3>
                              <div className="flex gap-1 ml-2 flex-shrink-0">
                                <Badge variant="outline" className="text-xs px-1 py-0">
                                  {exam.subject || 'Ümumi'}
                                </Badge>
                                <Badge 
                                  variant={exam.status === 'active' ? 'default' : 'secondary'} 
                                  className="text-xs px-1 py-0"
                                >
                                  {exam.status === 'active' ? 'Aktiv' : 'Passiv'}
                                </Badge>
                              </div>
                            </div>
                            <p 
                              className="text-sm text-gray-600 mb-2 overflow-hidden text-ellipsis"
                              style={{ 
                                display: '-webkit-box', 
                                WebkitLineClamp: 2, 
                                WebkitBoxOrient: 'vertical' 
                              }}
                            >
                              {exam.description}
                            </p>
                            <div className="flex justify-between items-center">
                              <div className="text-xs text-gray-400">
                                📅 {formatDate(exam.date)} • ⏰ {exam.time || '00:00'} • 👥 {exam.participants || 0} nəfər
                              </div>
                              <div className="flex gap-1">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => window.open(`/exams`, '_blank')}
                                  className="text-xs px-2 py-1 h-7"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => deleteExam(exam.id!)}
                                  className="text-xs px-2 py-1 h-7"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer with Additional Info */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <div>
                            © 2024 Rodoos Education Center - Admin Panel
            </div>
            <div className="flex items-center gap-4">
              <span>📊 Xəbərlər: {news.length}</span>
              <span>📝 İmtahanlar: {exams.length}</span>
              <span>🕐 Son yenilənmə: {new Date().toLocaleTimeString('az-AZ')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
             