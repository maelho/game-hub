import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Spinner } from '@/components/ui/spinner'
import { gameScreenshotsQueryOptions } from '@/lib/query-options'
import { cn } from '@/lib/utils'
import type { ScreenshotsListResponse } from '@/services/rawg/types'

function LazyScreenshotImage({ alt, src, className }: { alt: string; src: string; className?: string }) {
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
    <div className={cn('relative aspect-video w-full overflow-hidden bg-industrial-tertiary', className)}>
      <div
        className={cn(
          'absolute inset-0 flex items-center justify-center transition-opacity duration-200',
          loaded ? 'pointer-events-none opacity-0' : 'opacity-100',
        )}
      >
        <Spinner size="sm" />
      </div>
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

type ShortScreenshot = { id: number; image: string }

export default function GameScreenshots({
  slug,
  initialScreenshots,
}: {
  slug: string
  initialScreenshots?: ShortScreenshot[]
}) {
  const { ref, inView } = useInView({
    rootMargin: '400px',
    triggerOnce: true,
  })

  const initialData = useMemo((): ScreenshotsListResponse | undefined => {
    if (!initialScreenshots || initialScreenshots.length === 0) return undefined

    return {
      count: initialScreenshots.length,
      next: null,
      previous: null,
      results: initialScreenshots.map((screenshot) => ({
        id: screenshot.id,
        image: screenshot.image,
        width: 0,
        height: 0,
      })),
    }
  }, [initialScreenshots])

  const shouldFetch = inView && Boolean(slug?.trim())

  const { data: screenshots, isFetched } = useQuery({
    ...gameScreenshotsQueryOptions(slug),
    enabled: shouldFetch,
    initialData,
  })

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

  if (!screenshots) {
    return (
      <section className="flex min-h-48 items-center justify-center" ref={ref}>
        <Spinner size="md" />
      </section>
    )
  }

  if (!inView && initialScreenshots && initialScreenshots.length > 0) {
    return (
      <section className="space-y-3" ref={ref}>
        {/* Counter */}
        <div className="mb-2 flex items-center justify-between">
          <span className="font-medium text-[10px] text-industrial-text-tertiary uppercase tracking-wider">
            Screenshots
          </span>
          <span className="mono-data text-[10px] text-industrial-text-tertiary">1 / {initialScreenshots.length}</span>
        </div>

        <div className="relative aspect-video w-full overflow-hidden bg-industrial-tertiary">
          <img
            alt={`${slug} screenshot`}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            src={initialScreenshots[0]?.image}
          />
        </div>
      </section>
    )
  }

  if (isFetched && screenshots.results.length === 0) {
    return null
  }

  return (
    <section className="space-y-3" ref={ref}>
      <div className="mb-2 flex items-center justify-between">
        <span className="font-medium text-[10px] text-industrial-text-tertiary uppercase tracking-wider">
          Screenshots
        </span>
        <span className="mono-data text-[10px] text-industrial-text-tertiary">
          {current + 1} / {screenshots.results.length}
        </span>
      </div>

      <Carousel className="group w-full" setApi={setApi}>
        <CarouselContent>
          {screenshots.results.map((screenshot) => (
            <CarouselItem key={screenshot.id}>
              <LazyScreenshotImage
                alt={`${slug} screenshot`}
                className="rounded-sm border border-industrial-border"
                src={screenshot.image}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 border-industrial-border bg-industrial-primary/90 text-industrial-text-secondary opacity-0 backdrop-blur-sm transition-all duration-150 hover:border-industrial-accent hover:bg-industrial-secondary hover:text-industrial-accent disabled:opacity-0 group-hover:opacity-100 sm:left-4" />
        <CarouselNext className="right-2 border-industrial-border bg-industrial-primary/90 text-industrial-text-secondary opacity-0 backdrop-blur-sm transition-all duration-150 hover:border-industrial-accent hover:bg-industrial-secondary hover:text-industrial-accent disabled:opacity-0 group-hover:opacity-100 sm:right-4" />
      </Carousel>

      <Carousel className="w-full" opts={{ dragFree: true, containScroll: 'trimSnaps' }} setApi={setThumbApi}>
        <CarouselContent className="-ml-1.5 sm:-ml-2">
          {screenshots.results.map((screenshot, index) => {
            const isActive = index === current

            return (
              <CarouselItem
                className="basis-1/4 pl-1.5 sm:basis-1/5 sm:pl-2 md:basis-1/6 lg:basis-[14.28%]"
                key={`thumb-${screenshot.id}`}
              >
                <button
                  aria-label={`Show screenshot ${index + 1}`}
                  aria-pressed={isActive}
                  className={cn(
                    'block w-full overflow-hidden rounded-sm border transition-all duration-150',
                    isActive
                      ? 'border-industrial-accent opacity-100'
                      : 'border-industrial-border opacity-60 hover:border-industrial-border-strong hover:opacity-100',
                  )}
                  onClick={() => handleThumbClick(index)}
                  type="button"
                >
                  <LazyScreenshotImage alt={`${slug} thumbnail ${index + 1}`} src={screenshot.image} />
                </button>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
