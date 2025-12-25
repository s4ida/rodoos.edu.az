import { useState, useEffect } from "react";
import { Button } from "./ui/button";

// Şəkillər
const images = [
  "/src/img/logo-dikey.jpg",
  "/src/img/riyaziyyatders1.jpg",
  "/src/img/riyaziyyatders2.jpg",
  "/src/img/Azdiliders1.jpg",
  "/src/img/Azdiliders2.jpg",
];

export default function About() {
  const [expanded, setExpanded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Avtomatik slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 4000); // 4 saniyə interval
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-black-50 to-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Karusel */}
            <div className="flex justify-center items-center">
              <div className="relative w-96 h-96 overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-white-600 to-white-800">

                {/* Slide container */}
                <div
                  className="flex transition-transform duration-[1500ms] ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`slide ${idx}`}
                      className="w-96 h-96 object-cover flex-shrink-0 rounded-2xl"
                    />
                  ))}
                </div>

                {/* Ön və Arxa düymələr */}
           <button
  onClick={prevImage}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-blue-600 rounded-full p-3 shadow-lg transition-all hover:scale-110"
>
  ‹
</button>
<button
  onClick={nextImage}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-blue-600 rounded-full p-3 shadow-lg transition-all hover:scale-110"
>
  ›
</button>
              </div>
            </div>

            {/* Haqqımızda Mətni */}
            <div>
              <h2 className="text-4xl mb-6 text-black-900 abouth">Gələcəyin Yolunu Birlikdə Açaq!</h2>
              <div className="space-y-4 text-black-700">
                <p>
Masallıda fəaliyyət göstərən Rodoos İnnovativ Təhsil Mərkəzi uşaqların və gənclərin öyrənməyə marağını artıran, onların fərdi inkişafını ön planda tutan müasir və innovativ bir məkandır. Burada dərslər yalnız mövzunu öyrətmək üçün deyil, eyni zamanda analitik düşüncə, yaradıcılıq və özünəinam formalaşdırmaq üçün keçirilir.                </p>
                {expanded && (
                  <>
                    <p>
Mərkəzdə proqramlaşdırma, ofis proqramları, Cambridge ingilis dili, Azərbaycan dili, riyaziyyat, rus dili və məntiq dərsləri tədris olunur. Tədris prosesi şagirdlərin maraq və qabiliyyətlərinə uyğun qurulur ki, öyrənmək həm asan, həm də maraqlı olsun. Bundan əlavə, həftəsonları keçirilən yarışlar, futbol və əyləncəli tədbirlər uşaqların sosial bacarıqlarını və komanda ruhunu gücləndirir.                    </p>
                    <p>
1–11-ci siniflər üçün buraxılış və təkmilləşdirmə imtahanları, eləcə də olimpiadalar vasitəsilə şagirdlər öz biliklərini sınayır və gələcəyə daha inamla hazırlaşırlar. Rodoos – uşağınızın həm bilik, həm də şəxsiyyət olaraq inkişaf etdiyi ünvanıdır.                    </p>
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
