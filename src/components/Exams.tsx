import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Calendar, Clock, FileText } from "lucide-react";

const exams = [
  {
    id: 1,
    name: "Web Development Sertifikasiya İmtahanı",
    date: "25 Dekabr 2024",
    time: "10:00",
    description: "HTML, CSS, JavaScript və React üzrə bilik səviyyənizi yoxlayın",
    duration: "3 saat",
    level: "Orta",
  },
  {
    id: 2,
    name: "IELTS Mock Test",
    date: "2 Yanvar 2025",
    time: "09:00",
    description: "IELTS imtahanına hazırlıq üçün tam formatda sınaq imtahanı",
    duration: "4 saat",
    level: "Bütün səviyyələr",
  },
  {
    id: 3,
    name: "Python Programming Certification",
    date: "15 Yanvar 2025",
    time: "14:00",
    description: "Python proqramlaşdırma dili üzrə professional sertifikat imtahanı",
    duration: "2.5 saat",
    level: "İlkin-Orta",
  },
];

export default function Exams() {
  return (
    <section id="exams" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4 text-blue-900">İmtahanlar</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Qarşıdakı sertifikasiya və sınaq imtahanları
          </p>
        </div>
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
                  <span className="px-2 py-1 bg-blue-50 rounded-full">{exam.level}</span>
                </div>
                <CardTitle className="text-xl text-blue-900">{exam.name}</CardTitle>
                <CardDescription className="text-gray-600 mt-2">{exam.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span>{exam.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span>{exam.time} - {exam.duration}</span>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Qeydiyyatdan Keç
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}