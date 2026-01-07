import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Calendar, FileText, Loader2, MessageCircle } from "lucide-react";
import { supabase, type Exam } from '../lib/supabase';

export default function Exams() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // WhatsApp yönləndirməsi
  const handleWhatsAppRedirect = (examTitle: string) => {
    const phoneNumber = "994774162500"; // dəyişə bilərsən
    const message = `Salam! "${examTitle}" imtahanı üçün qeydiyyatdan keçmək istəyirəm. Ətraflı məlumat verə bilərsinizmi?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  // İmtahanları Supabase-dən yükləmə
  const fetchExams = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('exams')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;
      setExams(data || []);
    } catch (err: any) {
      setError('İmtahanlar yüklənərkən xəta: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  // Tarixi formatlama
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("az-AZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <section id="exams" className="py-20 bg-gray-50">
        <div className="container mx-auto text-center">
          <Loader2 className="w-8 h-8 mx-auto animate-spin text-blue-600" />
          <p className="mt-2 text-blue-600 text-lg">İmtahanlar yüklənir...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="exams" className="py-20 bg-gray-50">
        <div className="container mx-auto text-center">
          <p className="text-red-600 text-lg">{error}</p>
          <Button onClick={fetchExams} className="mt-4 bg-blue-600 hover:bg-blue-700">
            Yenidən cəhd et
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section id="exams" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8 examscontainer">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900 mb-2">İmtahanlar</h2>
          <p className="text-gray-600 text-lg">
            {exams.length > 0 
              ? `Qarşıda ${exams.length} imtahan mövcuddur`
              : 'Hər hansı imtahan planlaşdırılmayıb'}
          </p>
        </div>

        {exams.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl text-gray-500 mb-2">Hələ imtahan əlavə edilməyib</h3>
            <p className="text-gray-400">İmtahan tarixləri yaxınlarda paylaşılacaq!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {exams.map((exam) => (
              <Card
                key={exam.id}
                className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 relative examscard"
              >
                <CardHeader>
                  <div className="flex items-center gap-2 text-blue-600 text-sm mb-3">
                    <FileText className="w-4 h-4" />
                    <span className="px-2 py-1 bg-blue-50 rounded-full">Yeni</span>
                  </div>
                  <CardTitle className="text-xl text-blue-900">{exam.title}</CardTitle>
                  <CardDescription className="text-gray-600 mt-2">
                    {exam.description}
                  </CardDescription>
                  <div className="flex items-center gap-2 text-gray-600 mt-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span>{formatDate(exam.date)}</span>
                  </div>
                </CardHeader>

                {/* ---------- CardContent: Mövzulara bax + WhatsApp ---------- */}
                <CardContent className="space-y-2">
                  {/* PDF varsa Mövzulara bax */}
                  {exam.pdf_url && (
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2 movzu"
                      onClick={() => window.open(exam.pdf_url!, "_blank")}
                    >
                      <FileText className="w-4 h-4" />
                      Mövzulara bax
                    </Button>
                  )}

                  {/* WhatsApp Qeydiyyat */}
                  <Button 
                    onClick={() => handleWhatsAppRedirect(exam.title)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl qeydiyyat"
                  >
                    <MessageCircle className="w-4 h-4" />
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
