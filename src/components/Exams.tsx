import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Calendar, Clock, FileText, Loader2 } from "lucide-react";
import { supabase, type Exam } from '../lib/supabase';

export default function Exams() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Supabase-dən imtahanları yüklə
  const fetchExams = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('exams')
        .select('*')
        .order('date', { ascending: true }); // Tarixə görə sırala

      if (error) {
        throw error;
      }

      setExams(data || []);
    } catch (err: any) {
      setError('İmtahanlar yüklənərkən xəta: ' + err.message);
      console.error('Error fetching exams:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  // Tarixi formatla
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('az-AZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Yüklənmə vəziyyəti
  if (loading) {
    return (
      <section id="exams" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-blue-600">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className="text-xl">İmtahanlar yüklənir...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Xəta vəziyyəti
  if (error) {
    return (
      <section id="exams" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center">
            <div className="text-red-600 text-xl">
              {error}
            </div>
            <Button 
              onClick={fetchExams} 
              className="mt-4 bg-blue-600 hover:bg-blue-700"
            >
              Yenidən cəhd et
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="exams" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4 text-blue-900">İmtahanlar</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {exams.length > 0 
              ? `Qarşıdakı ${exams.length} imtahan mövcuddur`
              : 'Həz hansı imtahan planlaşdırılmayıb'
            }
          </p>
        </div>

        {exams.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl text-gray-500 mb-2">Hələ imtahan əlavə edilməyib</h3>
            <p className="text-gray-400">
              İmtahan tarixləri yaxınlarda paylaşılacaq!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {exams.map((exam) => (
              <Card
                key={exam.id}
                className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-16 -mt-16"></div>
                <CardHeader>
                  <div className="flex items-center gap-2 text-blue-600 text-sm mb-3">
                    <FileText className="w-4 h-4" />
                    <span className="px-2 py-1 bg-blue-50 rounded-full">
                      Yeni
                    </span>
                  </div>
                  <CardTitle className="text-xl text-blue-900">
                    {exam.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 mt-2">
                    {exam.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <span>{formatDate(exam.date)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <span>Müddət: Təyin ediləcək</span>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Qeydiyyatdan Keç
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}