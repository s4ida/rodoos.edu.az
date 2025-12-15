import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase, type News } from '../lib/supabase'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from './ui/carousel'
import Header from './Header'
import Footer from './Footer'

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [news, setNews] = useState<News | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchNewsById(parseInt(id))
    }
  }, [id])

  const fetchNewsById = async (newsId: number) => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('id', newsId)
        .single()

      if (error) throw error
      setNews(data)
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="p-8 text-center">Yüklənir...</div>
  if (!news) return <div className="p-8 text-center">Xəbər tapılmadı</div>

  const validImages = news.images?.filter(img => img && img.length > 0) || []

  return (
    <>
      <Header />
      
      <div className="min-h-screen pt-20 px-4">
        <div className="container mx-auto py-8">
          
          {/* Geri qayıt düyməsi */}
          <Button 
            onClick={() => navigate('/')} 
            variant="outline" 
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Ana səhifəyə qayıt
          </Button>

          {/* Ana məzmun - Col-6 layout */}
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Sol tərəf - Məlumat */}
            <div className="space-y-6">
              
              {/* Başlıq və meta məlumat */}
              <div>
                <Badge className="mb-3">{news.tag}</Badge>
                <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
                
                <div className="flex gap-4 text-gray-600 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(news.date).toLocaleDateString('az-AZ')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{news.author}</span>
                  </div>
                </div>
              </div>

              {/* Təsvir */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Qısa məzmun</h3>
                  <p className="text-gray-700">{news.description}</p>
                </CardContent>
              </Card>

              {/* Ətraflı məzmun */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Ətraflı məlumat</h3>
                  <div className="prose max-w-none">
                    {news.content.split('\n').map((paragraph, index) => (
                      paragraph.trim() && (
                        <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                          {paragraph}
                        </p>
                      )
                    ))}
                  </div>
                </CardContent>
              </Card>

            </div>

            {/* Sağ tərəf - Şəkillər Carousel */}
            <div className="sticky top-24 h-fit">
              {validImages.length > 0 ? (
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <Carousel className="w-full">
                      <CarouselContent>
                        {validImages.map((image, index) => (
                          <CarouselItem key={index}>
                            <div className="relative">
                              <img
                                src={image}
                                alt={`${news.title} - ${index + 1}`}
                                className="w-full h-80 object-cover"
                                onError={(e) => e.currentTarget.style.display = 'none'}
                              />
                              {/* Şəkil sayı */}
                              <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
                                {index + 1} / {validImages.length}
                              </div>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      {validImages.length > 1 && (
                        <>
                          <CarouselPrevious className="left-4" />
                          <CarouselNext className="right-4" />
                        </>
                      )}
                    </Carousel>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-gray-100">
                  <CardContent className="p-12 text-center">
                    <div className="text-gray-400 mb-4">
                      <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-500">Şəkil yoxdur</p>
                  </CardContent>
                </Card>
              )}
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default NewsDetail