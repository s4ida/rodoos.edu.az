// src/components/ui/enhanced-carousel.tsx
import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Maximize2 } from 'lucide-react';
import { Button } from './button';

export interface CarouselItem {
  src: string;
  alt?: string;
  title?: string;
  description?: string;
}

export interface EnhancedCarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showFullscreenButton?: boolean;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'photo';
}

export function EnhancedCarousel({
  items,
  autoPlay = false,
  autoPlayInterval = 5000,
  showFullscreenButton = true,
  className = '',
  aspectRatio = 'video'
}: EnhancedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const goToNext = useCallback(() => {
    setCurrentIndex(p => (p + 1) % items.length);
  }, [items.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex(p => (p === 0 ? items.length - 1 : p - 1));
  }, [items.length]);

  useEffect(() => {
    if (isPlaying && items.length > 1 && !isFullscreen) {
      intervalRef.current = window.setInterval(goToNext, autoPlayInterval);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, autoPlayInterval, items.length, isFullscreen, goToNext]);

  if (!items.length) return null;

  const currentItem = items[currentIndex];
  const aspect = { square: 'aspect-square', video: 'aspect-video', photo: 'aspect-[4/3]' };

  return (
    <div className={`relative ${className}`}>
      <div className={`relative overflow-hidden rounded-xl shadow-lg ${aspect[aspectRatio]}`}>
        <img src={currentItem.src} alt={currentItem.alt} className="w-full h-full object-cover" />

        <div className="absolute inset-0 flex items-center justify-between p-4">
          <Button onClick={goToPrevious} variant="secondary" size="sm">
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <div className="flex gap-2">
            {autoPlay && (
              <Button onClick={() => setIsPlaying(p => !p)} variant="secondary" size="sm">
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
            )}
            {showFullscreenButton && (
              <Button onClick={() => setIsFullscreen(true)} variant="secondary" size="sm">
                <Maximize2 className="w-4 h-4" />
              </Button>
            )}
          </div>

          <Button onClick={goToNext} variant="secondary" size="sm">
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
