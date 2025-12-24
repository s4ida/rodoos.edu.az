// src/components/figma/ImageWithFallback.tsx
import React, { useState } from 'react';
import { useImageLazyLoad } from '../../hooks/useImageLazyLoad';

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  lazyLoad?: boolean;
  className?: string;
  containerClassName?: string;
  loadingClassName?: string;
  errorClassName?: string;
  showLoadingSpinner?: boolean;
  aspectRatio?: 'square' | 'video' | 'photo' | string;
}

export function ImageWithFallback({
  src,
  alt,
  fallback,
  lazyLoad = true,
  className = '',
  containerClassName = '',
  loadingClassName = '',
  errorClassName = '',
  showLoadingSpinner = true,
  aspectRatio,
  style,
  ...rest
}: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false);
  
  const {
    imageRef,
    src: lazySrc,
    isLoading,
    hasError,
    onLoad,
    onError
  } = useImageLazyLoad({
    src: lazyLoad ? src : '',
    fallback: fallback || ERROR_IMG_SRC
  });

  const handleError = () => {
    setDidError(true);
    onError();
  };

  const handleLoad = () => {
    onLoad();
  };

  // Determine the image source
  const imageSrc = lazyLoad ? lazySrc : src;

  // Aspect ratio styles
  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    photo: 'aspect-photo'
  };

  const aspectClass = aspectRatio 
    ? (aspectRatioClasses[aspectRatio as keyof typeof aspectRatioClasses] || '') 
    : '';

  // Container classes
  const containerClasses = `
    relative overflow-hidden 
    ${aspectClass} 
    ${containerClassName}
  `.trim();

  // Loading state
  if (lazyLoad && !lazySrc && !didError) {
    return (
      <div className={containerClasses}>
        <div 
          ref={imageRef}
          className={`
            w-full h-full bg-gray-100 dark:bg-gray-800 
            flex items-center justify-center 
            ${loadingClassName}
          `.trim()}
          style={style}
        >
          {showLoadingSpinner && (
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Yüklənir...</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Error state
  if (didError || hasError) {
    return (
      <div className={containerClasses}>
        <div
          className={`
            w-full h-full bg-gray-100 dark:bg-gray-800 
            flex items-center justify-center text-center
            ${errorClassName}
          `.trim()}
          style={style}
        >
          <div className="flex flex-col items-center justify-center space-y-2 p-4">
            <img 
              src={ERROR_IMG_SRC} 
              alt="Şəkil yüklənmədi" 
              className="w-12 h-12 opacity-50"
            />
            <span className="text-xs text-gray-500 dark:text-gray-400 max-w-32">
              Şəkil yüklənə bilmədi
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Loading state during image load
  if (lazyLoad && isLoading && imageSrc) {
    return (
      <div className={containerClasses}>
        {/* Loading overlay */}
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center z-10">
          {showLoadingSpinner && (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          )}
        </div>
        {/* Image that's loading */}
        <img
          ref={imageRef}
          src={imageSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 opacity-0 ${className}`}
          style={style}
          onLoad={handleLoad}
          onError={handleError}
          {...rest}
        />
      </div>
    );
  }

  // Successfully loaded image
  return (
    <div className={containerClasses}>
      <img
        ref={lazyLoad ? imageRef : undefined}
        src={imageSrc}
        alt={alt}
        className={`
          w-full h-full object-cover transition-opacity duration-300
          ${isLoading ? 'opacity-0' : 'opacity-100'}
          ${className}
        `.trim()}
        style={style}
        onLoad={handleLoad}
        onError={handleError}
        {...rest}
      />
    </div>
  );
}

// Yardımçı komponent - şəkil qalereya üçün
export function ImageGalleryItem({
  src,
  alt,
  onClick,
  index,
  className = '',
  ...props
}: ImageWithFallbackProps & {
  onClick?: (index: number) => void;
  index?: number;
}) {
  return (
    <div 
      className={`cursor-pointer group ${className}`}
      onClick={() => onClick?.(index || 0)}
    >
      <ImageWithFallback
        src={src}
        alt={alt}
        className="transition-transform duration-200 group-hover:scale-105"
        containerClassName="rounded-lg overflow-hidden shadow-md hover:shadow-lg"
        {...props}
      />
    </div>
  );
}

// Yardımçı komponent - news card üçün şəkil
export function NewsImageCard({
  src,
  alt,
  title,
  className = '',
  ...props
}: ImageWithFallbackProps & {
  title?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <ImageWithFallback
        src={src}
        alt={alt}
        aspectRatio="video"
        className="transition-transform duration-300 hover:scale-105"
        containerClassName="rounded-xl overflow-hidden shadow-lg"
        {...props}
      />
      {title && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white font-medium text-sm line-clamp-2">{title}</h3>
        </div>
      )}
    </div>
  );
}