import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import Telimzali from "/src/img/təlim-zalı.jpg";
import Otaq4 from "/src/img/otaq4.jpg";
import Otaq2 from "/src/img/otaq2.jpg";
import Otaq1 from "/src/img/otaq1.jpg";

const heroSlides = [
  {
    id: 1,
    image: Telimzali,
    title: "Peşəkar Təhsil Mərkəzi",
    subtitle: "Gələcəyinizi bizimlə birlikdə qurun. Keyfiyyətli təhsil və müasir kurslar.",
  },
  {
    id: 2,
    image: Otaq4,
    title: "Müasir Təhsil Texnologiyaları",
    subtitle: "İnteraktiv dərslər və təcrübəli müəllimlər ilə səmərəli öyrənin.",
  },
  {
    id: 3,
    image: Otaq2,
    title: "Online və Oflayn Kurslar",
    subtitle: "İstədiyiniz formatda öyrənin, istədiyiniz vaxt irəliləyin.",
  },
  {
    id: 4,
    image: Otaq1,
    title: "Təcrübəli müəllim kollektivi",
    subtitle: "Öz sahəsində ixtisaslaşmış müəllimlərdən dərs alın.",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <section
      id="hero"
      className="relative w-full h-[480px] sm:h-[600px] md:h-[700px] overflow-hidden mt-20"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-600/60"></div>
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center justify-center text-center px-4">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="max-w-4xl mx-auto text-white"
            >
              <h1 className="text-2xl sm:text-4xl md:text-6xl mb-4 sm:mb-6">
                {heroSlides[currentSlide].title}
              </h1>

              <p className="text-base sm:text-xl md:text-2xl text-white/90">
                {heroSlides[currentSlide].subtitle}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-10
                   bg-white/90 hover:bg-white text-blue-600
                   rounded-full p-2 sm:p-3 shadow-lg transition-all hover:scale-110"
      >
        <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-10
                   bg-white/90 hover:bg-white text-blue-600
                   rounded-full p-2 sm:p-3 shadow-lg transition-all hover:scale-110"
      >
        <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2 sm:gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 sm:h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-white w-6 sm:w-8"
                : "bg-white/50 hover:bg-white/75 w-2 sm:w-3"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
