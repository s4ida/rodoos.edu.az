import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Eye } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  title?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="bg-gray-200 h-64 flex items-center justify-center rounded-lg">
        <p className="text-gray-500">Şəkil mövcud deyil</p>
      </div>
    );
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <img
          src={images[currentIndex]}
          alt={title ? `${title} - Şəkil ${currentIndex + 1}` : `Şəkil ${currentIndex + 1}`}
          className="w-full h-[400px] md:h-[500px] object-cover rounded-lg"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-lg" />
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
          {currentIndex + 1} / {images.length}
        </div>
        <button
          onClick={() => window.open(images[currentIndex], "_blank")}
          className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow hover:scale-110 transition"
        >
          <Eye className="w-5 h-5" />
        </button>
        {/* Prev / Next */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white transition"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail row */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto px-1">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              className={`h-20 object-cover rounded cursor-pointer transition-all ${
                currentIndex === idx
                  ? "ring-2 ring-blue-500 scale-105"
                  : "opacity-80 hover:opacity-100"
              }`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
