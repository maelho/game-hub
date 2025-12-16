import { useSuspenseQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { gameScreenshotsQueryOptions } from '@/lib/query-options'

export default function GameScreenshots({ slug }: { slug: string }) {
  const { data: screenshots } = useSuspenseQuery(gameScreenshotsQueryOptions(slug))

  const [api, setApi] = useState<CarouselApi>()

  useEffect(() => {
    if (!api) {
      return
    }
  }, [api])

  if (screenshots.results.length === 0) {
    return null
  }

  return (
    <Carousel className="w-full max-w-xs" setApi={setApi}>
      <CarouselContent>
        {screenshots.results.map((screenshot) => (
          <CarouselItem key={screenshot.id}>
            <img alt={slug} key={screenshot.id} loading="lazy" src={screenshot.image} srcSet={screenshot.image} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
