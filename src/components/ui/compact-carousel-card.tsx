// src/components/ui/compact-carousel-card.tsx
import { useState, useCallback, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from './button';

export interface CarouselItem {
  src: string;
  alt?: string;
  title?: string;
  description?: string;
}

interface CompactCarouselCardProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
  className?: string;
  height?: string;
}

export function CompactCarouselCard({
  items,
  autoPlay = false,
  autoPlayInterval = 5000,
  showIndicators = true,
  className = '',
  height = 'h-48'
}: CompactCarouselCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const intervalRef = useRef<number | null>(null);

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % items.length);
  }, [items.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex(prev => (prev === 0 ? items.length - 1 : prev - 1));
  }, [items.length]);

  useEffect(() => {
    if (isPlaying && items.length > 1) {
      intervalRef.current = window.setInterval(goToNext, autoPlayInterval);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, autoPlayInterval, items.length, goToNext]);

  if (!items.length) return null;

  const currentItem = items[currentIndex];

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-3 ${className}`}>
      <div className={`relative overflow-hidden rounded-lg ${height}`}>
        <img
          src={currentItem.src}
          alt={currentItem.alt || `Şəkil ${currentIndex + 1}`}
          className="w-full h-full object-cover rounded-lg"
        />

        {items.length > 1 && (
          <>
            <Button onClick={goToPrevious} variant="secondary" size="sm" className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button onClick={goToNext} variant="secondary" size="sm" className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </>
        )}

        <div className="absolute bottom-2 left-2 flex items-center gap-2">
          {autoPlay && items.length > 1 && (
            <Button onClick={() => setIsPlaying(p => !p)} variant="secondary" size="sm" className="bg-black/50 p-1">
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
          )}
          {showIndicators && (
            <div className="flex gap-1">
              {items.map((_, i) => (
                <span key={i} className={`w-2 h-2 rounded-full ${i === currentIndex ? 'bg-blue-500' : 'bg-gray-300'}`} />
              ))}
            </div>
          )}
        </div>
      </div>

      {(currentItem.title || currentItem.description) && (
        <div className="mt-2">
          {currentItem.title && <h3 className="text-sm font-medium">{currentItem.title}</h3>}
          {currentItem.description && <p className="text-xs text-gray-500">{currentItem.description}</p>}
        </div>
      )}
    </div>
  );
}
