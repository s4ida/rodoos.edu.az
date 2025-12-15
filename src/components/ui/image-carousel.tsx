import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Button } from './button'

interface ImageCarouselProps {
  images: string[]
  className?: string
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, className = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showModal, setShowModal] = useState(false)

  if (!images || images.length === 0) return null

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <>
      {/* Carousel */}
      <div className={`relative ${className}`}>
        <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={images[currentIndex]}
            alt={`Şəkil ${currentIndex + 1}`}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => setShowModal(true)}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Şəkil+Yüklənmədi'
            }}
          />
          
          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={nextImage}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </>
          )}
          
          {/* Image counter */}
          <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {/* Dots indicator */}
        {images.length > 1 && (
          <div className="flex justify-center gap-2 mt-3">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <img
              src={images[currentIndex]}
              alt={`Şəkil ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
            
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 bg-white/80 hover:bg-white"
            >
              <X className="w-4 h-4" />
            </Button>
            
            {images.length > 1 && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </>
            )}
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  )
}