import { useState } from "react";
import { GraduationCap } from "lucide-react";
import { Button } from "./ui/button";

export default function About() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-black-50 to-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-white-600 to-white-800 rounded-3xl p-12 shadow-2xl">
                                   <img className="aboutlogo" src="/src/img/2.jpg" alt="logo"></img>
              </div>
            </div>
            <div>
              <h2 className="text-4xl mb-6 text-black-900">Haqqımızda</h2>
              <div className="space-y-4 text-black-700">
                <p>
                  Təhsil mərkəzimiz müasir standartlara uyğun keyfiyyətli təhsil xidmətləri təqdim edir. 
                  Biz hər bir tələbəmizin potensialını açmaq və onları gələcəyə hazırlamaq üçün çalışırıq.
                </p>
                {expanded && (
                  <>
                    <p>
                      Təcrübəli müəllimlərimiz və innovativ tədris metodlarımız vasitəsilə tələbələrimizə 
                      ən yaxşı təhsil təcrübəsini təqdim edirik. Mərkəzimizdə müxtəlif sahələr üzrə 
                      kurslar təşkil olunur və hər bir tələbənin fərdi tələblərinə uyğun proqramlar hazırlanır.
                      Təhsil Mərkəzində həm Kembric, həm də qrammatika İngilis dili, Rus dili, İT (informasiya texnalogiyaları), Azərbaycan dili və Riyaziyyat fənləri üzrə dərslər təşkil edilir. Bütün dərslər müasir dərs metodları ilə tədris olunur. İT dərslərə ofis proqramları ilə yanaşı proqramlaşdırma, sayt qurmaq və idarəetmək, kibertəhlükəsizlik, help disk, phyton, html, javascript kimi mövzular da daxildir. 
 I sinifdən XI sinifə qədər bütün şagirdlər, yeniyetmə və gənclər və işgüzar insanlar hədəfimizdir.

                    </p>
                    <p>
                      Biz sadəcə bilik vermirik, həm də tələbələrimizin praktiki bacarıqlarını inkişaf 
                      etdiririk. Mərkəzimizdə keçirilən kurslar müasir bazarın tələblərinə uyğun 
                      hazırlanır və tələbələrimizin karyera yolunda uğur qazanmalarına kömək edir.
                    </p>
                  </>
                )}
              </div>
            <Button
  onClick={() => setExpanded(!expanded)}
  style={{ backgroundColor: "#683BC7" }}
  className="mt-6 hover:opacity-90 shine-effect"
>
  {expanded ? "Daha az göstər" : "Daha çox oxu"}
</Button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}