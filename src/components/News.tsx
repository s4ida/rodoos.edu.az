import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { User, ArrowRight, Loader2 } from "lucide-react";
import { supabase, type News } from '../lib/supabase';
import { Link } from 'react-router-dom';

export default function NewsSection() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Supabase-dən xəbərləri yüklə
  const fetchNews = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('important', { ascending: false }) // Vacib xəbərləri önə
        .order('date', { ascending: false }) // Sonra tarixə görə
        .limit(6); // Maksimum 6 xəbər göstər

      if (error) {
        throw error;
      }

      setNews(data || []);
    } catch (err: any) {
      setError('Xəbərlər yüklənərkən xəta: ' + err.message);
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Tarixi formatla


  // Yüklənmə vəziyyəti
  if (loading) {
    return (
      <section id="news" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-blue-600">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className="text-xl">Xəbərlər yüklənir...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Xəta vəziyyəti
  if (error) {
    return (
      <section id="news" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center">
            <div className="text-red-600 text-xl mb-4">
              {error}
            </div>
            <Button 
              onClick={fetchNews} 
              className="bg-blue-600 hover:bg-blue-700"
            >
              Yenidən cəhd et
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="news" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4 text-blue-900">Son Xəbərlər</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {news.length > 0 
              ? 'Təhsil və kurs fəaliyyətlərimiz haqqında ən son xəbərlər'
              : 'Hazırda xəbər mövcud deyil'
            }
          </p>
        </div>

        {news.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl text-gray-500 mb-2">Hələ xəbər əlavə edilməyib</h3>
            <p className="text-gray-400">
              Kursumuz haqqında yeni xəbərlər üçün gözləyin!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {news.map((item) => (
              <Card
                key={item.id}
                className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg relative overflow-hidden group"
              >
                {/* Vacib badge */}
                {item.important && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge variant="destructive" className="bg-red-500">
                      VACİB
                    </Badge>
                  </div>
                )}

                {/* Hero şəkil */}
                {item.images && item.images.length > 0 && (
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        // Şəkil yüklənmədikdə gizlət
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}

                <CardHeader>
                  <div className="flex items-center gap-2 text-blue-600 text-sm mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {item.tag}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-blue-900 line-clamp-2">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 mt-2 line-clamp-3">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                   
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{item.author}</span>
                    </div>
                  </div>
                  
                  <Link to={`/news/${item.id}`}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 group">
                      Ətraflı oxu
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}