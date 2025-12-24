// src/components/ui/enhanced-carousel.tsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Maximize2, X } from 'lucide-react';
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
  showThumbnails?: boolean;
  showIndicators?: boolean;
  showFullscreenButton?: boolean;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'photo';
  onSlideChange?: (index: number) => void;
}

export function EnhancedCarousel({
  items,
  autoPlay = false,
  autoPlayInterval = 5000,
  showThumbnails = true,
  showIndicators = true,
  showFullscreenButton = true,
  className = '',
  aspectRatio = 'video',
  onSlideChange
}: EnhancedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Go to next slide
  const goToNext = useCallback(() => {
    setCurrentIndex(prev => {
      const next = (prev + 1) % items.length;
      onSlideChange?.(next);
      return next;
    });
  }, [items.length, onSlideChange]);

  // Go to previous slide
  const goToPrevious = useCallback(() => {
    setCurrentIndex(prev => {
      const prevIndex = prev === 0 ? items.length - 1 : prev - 1;
      onSlideChange?.(prevIndex);
      return prevIndex;
    });
  }, [items.length, onSlideChange]);

  // Auto-play
  useEffect(() => {
    if (isPlaying && items.length > 1 && !isFullscreen) {
      intervalRef.current = setInterval(() => goToNext(), autoPlayInterval);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, autoPlayInterval, items.length, isFullscreen, goToNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNext();
          break;
        case 'Escape':
          e.preventDefault();
          setIsFullscreen(false);
          break;
        case ' ':
          e.preventDefault();
          setIsPlaying(prev => !prev);
          break;
      }
    };

    if (isFullscreen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, goToNext, goToPrevious]);

  // Touch/swipe
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) goToNext();
    if (distance < -50) goToPrevious();
  };

  const togglePlayPause = useCallback(() => setIsPlaying(prev => !prev), []);
  const openFullscreen = useCallback(() => setIsFullscreen(true), []);
  const closeFullscreen = useCallback(() => setIsFullscreen(false), []);
  const handleImageLoad = () => { setIsLoading(false); setHasError(false); };
  const handleImageError = () => { setIsLoading(false); setHasError(true); };

  if (!items || items.length === 0) {
    return (
      <div className={`bg-gray-100 dark:bg-gray-800 rounded-xl p-8 text-center ${className}`}>
        <div className="text-gray-500 dark:text-gray-400">
          <div className="w-16 h-16 mx-auto mb-4 opacity-50">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17l-3.5-4.5L7 14h2l3.5-4.5L17 17H9z"/>
            </svg>
          </div>
          <p className="font-medium">Şəkil mövcud deyil</p>
        </div>
      </div>
    );
  }

  const currentItem = items[currentIndex];
  const aspectClasses = { square: 'aspect-square', video: 'aspect-video', photo: 'aspect-[4/3]' };

  return (
    <>
      <div
        className={`relative w-full group ${className}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className={`relative overflow-hidden rounded-xl shadow-lg ${aspectClasses[aspectRatio]}`}>
          {isLoading && <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>}

          {hasError && <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <div className="text-center text-gray-500">
              <div className="w-12 h-12 mx-auto mb-2 opacity-50">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17l-3.5-4.5L7 14h2l3.5-4.5L17 17H9z"/>
                </svg>
              </div>
              <p className="text-sm">Şəkil yüklənə bilmədi</p>
            </div>
          </div>}

          <img
            src={currentItem.src}
            alt={currentItem.alt || `Şəkil ${currentIndex + 1}`}
            className={`w-full h-full object-cover transition-all duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'} ${hasError ? 'hidden' : 'block'}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

          {/* Controls */}
          <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {items.length > 1 && <Button onClick={goToPrevious} variant="secondary" size="sm" className="bg-white/80 hover:bg-white backdrop-blur-sm shadow-lg transition-all duration-200 hover:scale-110" aria-label="Əvvəlki şəkil"><ChevronLeft className="w-5 h-5" /></Button>}

            <div className="flex items-center gap-2">
              {items.length > 1 && autoPlay && <Button onClick={togglePlayPause} variant="secondary" size="sm" className="bg-white/80 hover:bg-white backdrop-blur-sm shadow-lg" aria-label={isPlaying ? 'Dayandır' : 'Oynat'}>{isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}</Button>}
              {showFullscreenButton && <Button onClick={() => setIsFullscreen(true)} variant="secondary" size="sm" className="bg-white/80 hover:bg-white backdrop-blur-sm shadow-lg" aria-label="Tam ekran"><Maximize2 className="w-4 h-4" /></Button>}
            </div>

            {items.length > 1 && <Button onClick={goToNext} variant="secondary" size="sm" className="bg-white/80 hover:bg-white backdrop-blur-sm shadow-lg transition-all duration-200 hover:scale-110" aria-label="Növbəti şəkil"><ChevronRight className="w-5 h-5" /></Button>}
          </div>

          {/* Progress bar */}
          {isPlaying && items.length > 1 && !isFullscreen && <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
            <div className="h-full bg-blue-500 origin-left" style={{ animation: `progressSlide ${autoPlayInterval}ms linear infinite` }} />
          </div>}
        </div>
      </div>

      <style>
        {`
          @keyframes progressSlide {
            0% { transform: scaleX(0); }
            100% { transform: scaleX(1); }
          }
        `}
      </style>
    </>
  );
}
