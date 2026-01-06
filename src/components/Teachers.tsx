import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const teachers = [
  {
    id: 1,
    name: "Şahəliyeva Səidə",
    profession: "Proqramlaşdırma və komputer müəllimi",
    bio: "Proqramlaşdırma sahəsində real layihələr üzərində təcrübəyə malik, ofis proqramları üzrə 5 illik təcrübəsi olan, tələbələrə praktiki yönümlü dərslər keçirən müəllim.",
    image: "/img/Saida.jpeg",
  },
  {
    id: 2,
    name: "Cəfərov Hüseynağa",
    profession: "İngilis dili müəllimi",
    bio: "İngilis dili qrammatikasını sadə və anlaşılan formada izah edən, öz sahəsində ixtisaslaşmış, tələbələrin düzgün yazı və danışıq bacarıqlarını möhkəmləndirən müəllim.",
    image: "/img/Hüseynağa.jpeg",
  },
    {
    id: 3,
    name: "Ələkbərova Fatimə",
    profession: "Rus dili müəllimi",
    bio: "Rus dili danışıq bacarıqlarını inkişaf etdirməyə fokuslanan, tələbələrin gündəlik və praktiki situasiyalarda sərbəst danışmasına kömək edən müəllim.",
    image: "/img/Fatima.jpeg",
  },
  {
    id: 4,
    name: "Qafarov Rasim",
    profession: "Riyaziyyat müəllimi",
    bio: "Riyazi düşünmə və məntiqi analiz bacarıqlarını inkişaf etdirməyə yönəlmiş, tələbələrə hesablamaları daha asan qavramağa kömək edən müəllim.",
    image: "/img/Rasim.jpg",
  },
  {
    id: 5,
    name: "Novruzova Aynur",
    profession: "İngilis dili müəllimi",
    bio: "Praktiki danışıq və qrammatika mövzularını effektiv şəkildə öyrədən, müasir tədris yanaşmalarına sahib ingilis dili müəllimi.",
    image: "/img/Aynur.jpeg",
  },
  {
    id: 6,
    name: "Zayıdzadə Yusif",
    profession: "Azərbaycan dili müəllimi",
    bio: "Şagirdlərin nitq mədəniyyətini və ünsiyyət bacarıqlarını artıran, qrammatika və danışıq dərsləri ilə seçilən Azərbaycan dili müəllimi.",
    image: "/img/Yusif.jpeg",
  },

];

export default function Teachers() {
  return (
    <section id="teachers" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4 text-blue-900">Müəllimlərimiz</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Təcrübəli və peşəkar müəllimlər komandası
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teachers.map((teacher) => (
            <Card
              key={teacher.id}
              className="text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg"
            >
              <CardContent className="pt-8">
                <div className="relative mb-6 inline-block">
                  <div className="w-40 h-40 rounded-full overflow-hidden ring-4 ring-blue-100 mx-auto">
                    <ImageWithFallback
                      src={teacher.image}
                      alt={teacher.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </div>

                <h3 className="text-xl mb-2 text-blue-900">{teacher.name}</h3>
                <p className="text-blue-600 mb-3">{teacher.profession}</p>
                <p className="text-gray-600 mb-6 px-4">{teacher.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
