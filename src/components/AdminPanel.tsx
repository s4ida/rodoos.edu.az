import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase, type Exam, type News } from '../lib/supabase'
import ExamForm from './ExamForm'
import NewsForm from './NewsForm'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Alert, AlertDescription } from './ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Trash2, ExternalLink } from 'lucide-react'

const AdminPanel: React.FC = () => {
  const { user, logout } = useAuth()
  const [exams, setExams] = useState<Exam[]>([])
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Paneli</h1>
            <p className="text-gray-600">Xoş gəlmisiniz, {user?.email}</p>
          </div>
          <Button onClick={logout} variant="outline">
            Çıxış
          </Button>
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
                      <h3 className="font-medium text-gray-900 text-sm line-clamp-1">
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
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-400">
                        {formatDate(item.date)} • {item.author}
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
                      <h3 className="font-medium text-gray-900 text-sm line-clamp-1">
                        {exam.title}
                      </h3>
                      <Badge variant="secondary" className="text-xs px-1 py-0 ml-2 flex-shrink-0">
                        {formatDate(exam.date)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {exam.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-400">
                        Yaradılıb: {exam.created_at && formatDate(exam.created_at)}
                      </div>
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
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  </TabsContent>
</Tabs>
      </div>
    </div>
  )
}

export default AdminPanel