"use client"

import * as React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "./utils"
import { Button } from "./button"

type CarouselApi = {
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
}

type CarouselProps = {
  opts?: any
  plugins?: any
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: React.RefObject<HTMLDivElement>
  api: CarouselApi | undefined
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
  const [carouselRef, setCarouselRef] = React.useState<HTMLDivElement | null>(null)
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)
  const [currentIndex, setCurrentIndex] = React.useState(0)

  const scrollPrev = React.useCallback(() => {
    if (!carouselRef) return
    
    const container = carouselRef.querySelector('[data-carousel-content]') as HTMLDivElement
    if (!container) return

    const itemWidth = container.children[0]?.clientWidth || 0
    const newIndex = Math.max(currentIndex - 1, 0)
    
    container.scrollTo({
      left: newIndex * itemWidth,
      behavior: 'smooth'
    })
    
    setCurrentIndex(newIndex)
  }, [carouselRef, currentIndex])

  const scrollNext = React.useCallback(() => {
    if (!carouselRef) return
    
    const container = carouselRef.querySelector('[data-carousel-content]') as HTMLDivElement
    if (!container) return

    const itemWidth = container.children[0]?.clientWidth || 0
    const maxIndex = container.children.length - 1
    const newIndex = Math.min(currentIndex + 1, maxIndex)
    
    container.scrollTo({
      left: newIndex * itemWidth,
      behavior: 'smooth'
    })
    
    setCurrentIndex(newIndex)
  }, [carouselRef, currentIndex])

  const api = React.useMemo(() => ({
    scrollPrev,
    scrollNext,
    canScrollPrev,
    canScrollNext,
  }), [scrollPrev, scrollNext, canScrollPrev, canScrollNext])

  React.useEffect(() => {
    if (!carouselRef) return

    const container = carouselRef.querySelector('[data-carousel-content]') as HTMLDivElement
    if (!container) return

    const updateButtons = () => {
      const maxIndex = container.children.length - 1
      setCanScrollPrev(currentIndex > 0)
      setCanScrollNext(currentIndex < maxIndex)
    }

    updateButtons()
  }, [carouselRef, currentIndex])

  React.useEffect(() => {
    setApi?.(api)
  }, [api, setApi])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef: { current: carouselRef },
        api: api,
        opts,
        orientation: orientation || "horizontal",
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        ref={(node) => {
          setCarouselRef(node)
          if (typeof ref === 'function') ref(node)
          else if (ref) ref.current = node
        }}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
})
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div className="overflow-hidden">
      <div
        ref={ref}
        data-carousel-content
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}