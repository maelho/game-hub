import { useSuspenseQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Skeleton } from '@/components/ui/skeleton'
import { gameScreenshotsQueryOptions } from '@/lib/query-options'
import { cn } from '@/lib/utils'

function LazyScreenshotImage({
  alt,
  src,
  className,
  skeletonClassName,
}: {
  alt: string
  src: string
  className?: string
  skeletonClassName?: string
}) {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const img = imgRef.current
    if (!img) {
      return
    }

    const handleDone = () => setLoaded(true)

    if (img.complete && img.naturalWidth > 0) {
      handleDone()
      return
    }

    img.addEventListener('load', handleDone)
    img.addEventListener('error', handleDone)

    return () => {
      img.removeEventListener('load', handleDone)
      img.removeEventListener('error', handleDone)
    }
  }, [])

  return (
    <div className={cn('relative aspect-video w-full overflow-hidden', className)}>
      <Skeleton
        className={cn(
          'absolute inset-0 h-full w-full pointer-events-none transition-opacity duration-200',
          loaded ? 'opacity-0 animate-none' : 'opacity-100',
          skeletonClassName,
        )}
      />
      <img
        alt={alt}
        className={cn(
          'absolute inset-0 h-full w-full object-cover transition-opacity duration-200',
          loaded ? 'opacity-100' : 'opacity-0',
        )}
        loading="lazy"
        onError={() => setLoaded(true)}
        onLoad={() => setLoaded(true)}
        ref={imgRef}
        src={src}
      />
    </div>
  )
}

export function GameScreenshotsSkeleton() {
  return (
    <section className="space-y-3">
      <Skeleton className="aspect-video w-full rounded-lg" />
      <div className="flex gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="aspect-video w-1/6 rounded-md" />
        ))}
      </div>
    </section>
  )
}

export default function GameScreenshots({ slug }: { slug: string }) {
  const { data: screenshots } = useSuspenseQuery(gameScreenshotsQueryOptions(slug))

  const [api, setApi] = useState<CarouselApi>()
  const [thumbApi, setThumbApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    const handleSelect = () => {
      const newIndex = api.selectedScrollSnap()
      setCurrent(newIndex)
      thumbApi?.scrollTo(newIndex)
    }

    handleSelect()

    api.on('select', handleSelect)
    api.on('reInit', handleSelect)

    return () => {
      api.off('select', handleSelect)
      api.off('reInit', handleSelect)
    }
  }, [api, thumbApi])

  const handleThumbClick = useCallback(
    (index: number) => {
      api?.scrollTo(index)
    },
    [api],
  )

  if (screenshots.results.length === 0) {
    return null
  }

  return (
    <section className="space-y-3">
      <Carousel className="w-full group" setApi={setApi}>
        <CarouselContent>
          {screenshots.results.map((screenshot) => (
            <CarouselItem key={screenshot.id}>
              <LazyScreenshotImage alt={`${slug} screenshot`} className="rounded-lg" src={screenshot.image} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 sm:left-4 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0" />
        <CarouselNext className="right-2 sm:right-4 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0" />
      </Carousel>
      <Carousel className="w-full" opts={{ dragFree: true, containScroll: 'trimSnaps' }} setApi={setThumbApi}>
        <CarouselContent className="-ml-1.5 sm:-ml-2">
          {screenshots.results.map((screenshot, index) => {
            const isActive = index === current

            return (
              <CarouselItem
                className="basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 pl-1.5 sm:pl-2"
                key={`thumb-${screenshot.id}`}
              >
                <button
                  aria-label={`Show screenshot ${index + 1}`}
                  aria-pressed={isActive}
                  className={cn(
                    'block w-full overflow-hidden rounded-lg border bg-muted/30 transition',
                    isActive ? 'border-primary/80 opacity-100' : 'border-border opacity-70 hover:opacity-100',
                  )}
                  onClick={() => handleThumbClick(index)}
                  type="button"
                >
                  <LazyScreenshotImage
                    alt={`${slug} thumbnail ${index + 1}`}
                    className="rounded-md"
                    skeletonClassName="rounded-md"
                    src={screenshot.image}
                  />
                </button>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
