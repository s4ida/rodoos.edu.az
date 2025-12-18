import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase, type Exam, type News } from '../lib/supabase'
import ExamForm from './ExamForm'
import NewsForm from './NewsForm'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Alert, AlertDescription } from './ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import {
  Trash2,
  LogOut,
  Shield,
  AlertTriangle,
  Edit,
  ArrowLeft
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const AdminPanel: React.FC = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [news, setNews] = useState<News[]>([])
  const [exams, setExams] = useState<Exam[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingNews, setEditingNews] = useState<News | null>(null)
  const [editingExam, setEditingExam] = useState<Exam | null>(null)

  /* ================= BACK → LOGOUT ================= */
  const handleBack = async () => {
    await logout()        // 🔐 sessiyanı bağla
    navigate('/')         // ana səhifəyə at
  }

  /* ================= DATA ================= */
  const fetchNews = async () => {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) setError(error.message)
    else setNews(data || [])
  }

  const fetchExams = async () => {
    const { data, error } = await supabase
      .from('exams')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) setError(error.message)
    else setExams(data || [])
  }

  useEffect(() => {
    setLoading(true)
    Promise.all([fetchNews(), fetchExams()]).finally(() =>
      setLoading(false)
    )
  }, [])

  /* ================= DELETE ================= */
  const deleteNews = async (id: number) => {
    if (!confirm('Xəbəri silmək istədiyinizdən əminsiniz?')) return
    await supabase.from('news').delete().eq('id', id)
    fetchNews()
  }

  const deleteExam = async (id: number) => {
    if (!confirm('İmtahanı silmək istədiyinizdən əminsiniz?')) return
    await supabase.from('exams').delete().eq('id', id)
    fetchExams()
  }

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-50 p-8">

      {/* HEADER */}
      <div className="bg-white rounded-2xl p-6 shadow mb-8 flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* ⬅️ GERİ → LOGOUT */}
          <button
            onClick={handleBack}
            className="p-2 rounded-lg hover:bg-gray-100"
            title="Çıxış və geri qayıt"
          >
            <ArrowLeft />
          </button>

          <Shield className="w-10 h-10 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>

        {/* 🔴 ÇIXIŞ */}
        <Button
          variant="outline"
          onClick={logout}
          className="text-red-600 border-red-200"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Çıxış
        </Button>
      </div>

      {error && (
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertTriangle className="w-4 h-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* TABS */}
      <Tabs defaultValue="news">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="news">Xəbərlər</TabsTrigger>
          <TabsTrigger value="exams">İmtahanlar</TabsTrigger>
        </TabsList>

        {/* NEWS */}
        <TabsContent value="news" className="grid md:grid-cols-2 gap-6">
          
          <Card>
            <CardHeader>
              <CardTitle>
                {editingNews ? 'Xəbəri redaktə et' : 'Yeni xəbər'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <NewsForm
                editingNews={editingNews}
                onSuccess={() => {
                  fetchNews()
                  setEditingNews(null)
                }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mövcud xəbərlər</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-96 overflow-y-auto">
              {news.map(item => (
                <div key={item.id} className="border rounded p-4 flex justify-between">
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => setEditingNews(item)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => deleteNews(item.id)}>
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* EXAMS */}
        <TabsContent value="exams" className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {editingExam ? 'İmtahanı redaktə et' : 'Yeni imtahan'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ExamForm
                editingExam={editingExam}
                onSuccess={() => {
                  fetchExams()
                  setEditingExam(null)
                }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mövcud imtahanlar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-96 overflow-y-auto">
              {exams.map(item => (
                <div key={item.id} className="border rounded p-4 flex justify-between">
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => setEditingExam(item)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => deleteExam(item.id)}>
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdminPanel
