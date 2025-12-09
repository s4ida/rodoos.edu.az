import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { supabase, type News } from '../lib/supabase'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { ArrowLeft, Calendar, User, Clock, Loader2, AlertCircle } from 'lucide-react'

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [news, setNews] = useState<News | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (id) {
      fetchNewsById(parseInt(id))
    }
  }, [id])

  const fetchNewsById = async (newsId: number) => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('id', newsId)
        .single()

      if (error) {
        throw error
      }

      setNews(data)
    } catch (err: any) {
      setError('Xəbər tapılmadı və ya yüklənərkən xəta baş verdi')
      console.error('Error fetching news:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('az-AZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('az-AZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Yüklənmə vəziyyəti
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-xl text-gray-600">Xəbər yüklənir...</p>
        </div>
      </div>
    )
  }

  // Xəta vəziyyəti
  if (error || !news) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Xəbər tapılmadı</h1>
          <p className="text-gray-600 mb-6">
            {error || 'Axtardığınız xəbər mövcud deyil və ya silinib'}
          </p>
          <Button onClick={() => navigate('/')} className="bg-blue-600 hover:bg-blue-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Ana səhifəyə qayıt
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Ana səhifəyə qayıt
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <article className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Badge variant="secondary" className="text-sm">
                {news.tag}
              </Badge>
              {news.important && (
                <Badge variant="destructive" className="bg-red-500">
                  VACİB XƏBƏR
                </Badge>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {news.title}
            </h1>
            
            <div className="flex items-center justify-center gap-6 text-gray-600 flex-wrap">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(news.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{news.author}</span>
              </div>
              {news.created_at && (
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>Yayımlanıb: {formatTime(news.created_at)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Featured Image */}
          {news.images && news.images.length > 0 && (
            <div className="w-full">
              <img
                src={news.images[0]}
                alt={news.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                onError={(e) => {
                  // Şəkil yüklənmədikdə gizlət
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Description */}
          <Card className="border-l-4 border-l-blue-600">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Xülasə</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {news.description}
              </p>
            </CardContent>
          </Card>

          {/* Main Content */}
          <Card>
            <CardContent className="p-6 md:p-8">
              <div className="prose max-w-none">
                {news.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed mb-4 text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Additional Images */}
          {news.images && news.images.length > 1 && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Şəkillər</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {news.images.slice(1).map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`${news.title} - ${index + 2}`}
                        className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => window.open(image, '_blank')}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                        <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          Böyüt
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

               {/* Back Button */}
          <div className="flex justify-center pt-8">
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              size="lg"
              className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Ana səhifəyə qayıt
            </Button>
          </div>
        </article>
      </div>
    </div>
  )
}

export default NewsDetail