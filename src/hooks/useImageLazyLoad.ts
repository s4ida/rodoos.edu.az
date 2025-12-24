// src/hooks/useImageLazyLoad.ts
import { useState, useRef, useEffect } from 'react';

interface UseImageLazyLoadOptions {
  src: string;
  fallback?: string;
  rootMargin?: string;
  threshold?: number;
}

export const useImageLazyLoad = ({
  src,
  fallback = 'https://via.placeholder.com/800x400?text=Şəkil+Yüklənmədi',
  rootMargin = '50px',
  threshold = 0.1
}: UseImageLazyLoadOptions) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const imageElement = imageRef.current;
    if (!imageElement) return;

    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback for older browsers
      setImageSrc(src);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin,
        threshold
      }
    );

    observer.observe(imageElement);

    return () => {
      observer.unobserve(imageElement);
    };
  }, [src, rootMargin, threshold]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    setImageSrc(fallback);
  };

  return {
    imageRef,
    src: imageSrc,
    isLoading,
    hasError,
    onLoad: handleLoad,
    onError: handleError
  };
};

// Şəkil komponentini optimallaşdırmaq üçün əlavə hook
export const useImagePreload = (imageUrls: string[]) => {
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set());
  const [isPreloading, setIsPreloading] = useState(false);

  const preloadImages = async (urls: string[]) => {
    setIsPreloading(true);
    const loaded = new Set<string>();

    const loadPromises = urls.map((url) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => {
          loaded.add(url);
          resolve();
        };
        img.onerror = () => {
          // Still resolve to continue with other images
          resolve();
        };
        img.src = url;
      });
    });

    await Promise.all(loadPromises);
    setPreloadedImages(loaded);
    setIsPreloading(false);
  };

  useEffect(() => {
    if (imageUrls.length > 0) {
      preloadImages(imageUrls);
    }
  }, [imageUrls]);

  return {
    preloadedImages,
    isPreloading,
    isImagePreloaded: (url: string) => preloadedImages.has(url)
  };
};