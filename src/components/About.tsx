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
              <h2 className="text-4xl mb-6 text-black-900">Gələcəyin Yolunu Birlikdə Açaq!</h2>
              <div className="space-y-4 text-black-700">
                <p>
                  Rodoos, Masallıda uşaqların və gənclərin öyrənmək həvəsini artıran, onların fərdi inkişafını ön planda tutan innovativ təhsil mərkəzidir. Burada hər dərs sadəcə bilik ötürmək üçün deyil, eyni zamanda yaradıcı düşüncə, analitik bacarıqlar və özünəinam qazanmaq üçün bir fürsətdir.
                </p>
                {expanded && (
                  <>
                    <p>
                      Bizim kurslarda proqramlaşdırmadan başlayaraq, ofis proqramları, Cambridge ingilis dili, Azərbaycan dili, riyaziyyat, rus dili və məntiq dərslərinə qədər geniş spektr təqdim olunur. Hər bir dərs, şagirdlərin maraq və qabiliyyətlərinə uyğun olaraq hazırlanır ki, öyrənmək həm asan, həm də maraqlı olsun.

Rodoos yalnız akademik inkişafla kifayətlənmir. Uşaqların sosial və fiziki bacarıqlarını da inkişaf etdirmək üçün həftəsonları yarışlar, futbol və müxtəlif əyləncəli tədbirlər təşkil olunur. Bu, onların həm dostluq bağlarını gücləndirir, həm də komandada işləmək bacarıqlarını inkişaf etdirir.
                    </p>
                    <p>
                     1-11-ci siniflər üçün blok dərsləri, buraxılış və təkmilləşdirmə imtahanları, həmçinin olimpiadalar təşkil olunur ki, hər şagird öz potensialını sınasın, uğurlarını kəşf etsin və gələcəyə inamla addım atsın.

Rodoos-da hər gün yeni bir kəşfdir, hər dərs yeni bir səyahətdir. Biz inanırıq ki, öyrənmək yalnız bilik qazanmaq deyil, həm də uşaqların özlərinə inanmasını, yaradıcılığını inkişaf etdirməsini və əsl liderlər kimi formalaşmasını təmin edən bir macəradır.
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
