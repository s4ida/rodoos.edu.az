import { Badge } from "./ui/badge";
import { Calendar, TrendingUp } from "lucide-react";

const news = [
  {
    id: 1,
    title: "Yeni Proqramlaşdırma Kursu Başlayır",
    date: "20 Noyabr 2024",
    description: "Full-Stack Web Development kursu üçün qeydiyyat başladı. Məhdud yerlərlə 25 Dekabr tarixində start verilir.",
    tag: "Kurslar",
    important: true,
  },
  {
    id: 2,
    title: "Müəllimlərimiz Beynəlxalq Konfransda İştirak Etdi",
    date: "18 Noyabr 2024",
    description: "Mərkəzimizin müəllimləri İstanbulda keçirilən təhsil texnologiyaları konfransında təqdimat etdilər.",
    tag: "Tədbirlər",
    important: false,
  },
  {
    id: 3,
    title: "Tələbələrimizin Uğuru",
    date: "15 Noyabr 2024",
    description: "Mərkəzimizin 15 tələbəsi keçirilən proqramlaşdırma müsabiqəsində ilk 3 yerə layiq görüldü.",
    tag: "Uğurlar",
    important: true,
  },
  {
    id: 4,
    title: "Yeni Tədris İli Üzrə Endirimlər",
    date: "10 Noyabr 2024",
    description: "Dekabr ayı üçün bütün kurslara 20% endirim tətbiq edilir. Tələsməyiniz tövsiyə olunur.",
    tag: "Kampaniyalar",
    important: false,
  },
  {
    id: 5,
    title: "Online Platformamız Yeniləndi",
    date: "5 Noyabr 2024",
    description: "Tələbələrimiz üçün yeni interaktiv öyrənmə platforması və mobil tətbiq istifadəyə verildi.",
    tag: "Texnologiya",
    important: false,
  },
];

export default function News() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4 text-blue-900">Xəbərlər</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Mərkəzimizdən ən son xəbərlər və yeniliklər
          </p>
        </div>
        <div className="max-w-4xl mx-auto space-y-6">
          {news.map((item) => (
            <div
              key={item.id}
              className={`p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 ${
                item.important ? "border-l-blue-600 bg-blue-50/50" : "border-l-gray-300 bg-white"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                      {item.tag}
                    </Badge>
                    {item.important && (
                      <div className="flex items-center gap-1 text-blue-600 text-sm">
                        <TrendingUp className="w-4 h-4" />
                        <span>Aktual</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl text-blue-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-3">{item.description}</p>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
