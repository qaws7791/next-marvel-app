'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { getMarvelThumbnail } from '@/lib/marvel'
import {
  useCharactersByComicsIdInfQuery,
  useCharactersByEventIdInfQuery,
  useCharactersBySeriesIdInfQuery,
} from '@/queries/characters'
import {
  useComicsByEventIdInfQuery,
  useComicsBySeriesIdInfQuery,
} from '@/queries/comics'
import {
  useEventsByComicsIdInfQuery,
  useEventsBySeriesIdInfQuery,
} from '@/queries/events'
import { useSeriesByEventIdInfQuery } from '@/queries/series'
import {
  useStoriesByComicsIdInfQuery,
  useStoriesByEventIdInfQuery,
  useStoriesBySeriesIdInfQuery,
} from '@/queries/stories'
import Link from 'next/link'
import React, { Fragment } from 'react'

type Props = {
  eventId: string
}

const RelatedDataAccordion = ({ eventId }: Props) => {
  const characterQuery = useCharactersByEventIdInfQuery({ eventId })
  const storiesQuery = useStoriesByEventIdInfQuery({ eventId })
  const comicsQuery = useComicsByEventIdInfQuery({ eventId })
  const seriesQuery = useSeriesByEventIdInfQuery({ eventId })

  return (
    <div>
      <Accordion type='single' collapsible>
        <AccordionItem value='item-2'>
          <AccordionTrigger>
            Characters ({characterQuery.data?.pages[0].total})
          </AccordionTrigger>
          <AccordionContent>
            <ul>
              {characterQuery.data?.pages.map((group, i) => (
                <Fragment key={i}>
                  {group.results.map((result) => (
                    <ListItem
                      key={result.id}
                      imageUrl={getMarvelThumbnail(
                        result.thumbnail,
                        'standard_medium'
                      )}
                      title={result.name}
                      linkUrl={`/characters/${result.resourceURI
                        .split('/')
                        .pop()}`}
                    />
                  ))}
                </Fragment>
              ))}
            </ul>
            <Button
              onClick={() => characterQuery.fetchNextPage()}
              disabled={
                !characterQuery.hasNextPage ||
                characterQuery.isLoading ||
                characterQuery.isFetchingNextPage
              }
              className='w-full'
            >
              {characterQuery.hasNextPage ? '더 불러오기' : '불러오기 완료'}
            </Button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-3'>
          <AccordionTrigger>
            Stories ({storiesQuery.data?.pages[0].total})
          </AccordionTrigger>
          <AccordionContent>
            <ul>
              {storiesQuery.data?.pages.map((group, i) => (
                <Fragment key={i}>
                  {group.results.map((result) => (
                    <ListItem
                      key={result.id}
                      imageUrl={getMarvelThumbnail(
                        result.thumbnail,
                        'standard_medium'
                      )}
                      title={result.title}
                      linkUrl={`/stories/${result.resourceURI
                        .split('/')
                        .pop()}`}
                    />
                  ))}
                </Fragment>
              ))}
            </ul>
            <Button
              onClick={() => storiesQuery.fetchNextPage()}
              disabled={
                !storiesQuery.hasNextPage ||
                storiesQuery.isLoading ||
                storiesQuery.isFetchingNextPage
              }
              className='w-full'
            >
              {storiesQuery.hasNextPage ? '더 불러오기' : '불러오기 완료'}
            </Button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-4'>
          <AccordionTrigger>
            Comics ({comicsQuery.data?.pages[0].total})
          </AccordionTrigger>
          <AccordionContent>
            <ul>
              {comicsQuery.data?.pages.map((group, i) => (
                <Fragment key={i}>
                  {group.results.map((result) => (
                    <ListItem
                      key={result.id}
                      imageUrl={getMarvelThumbnail(
                        result.thumbnail,
                        'standard_medium'
                      )}
                      title={result.title}
                      linkUrl={`/comics/${result.resourceURI.split('/').pop()}`}
                    />
                  ))}
                </Fragment>
              ))}
            </ul>
            <Button
              onClick={() => comicsQuery.fetchNextPage()}
              disabled={
                !comicsQuery.hasNextPage ||
                comicsQuery.isLoading ||
                comicsQuery.isFetchingNextPage
              }
              className='w-full'
            >
              {comicsQuery.hasNextPage ? '더 불러오기' : '불러오기 완료'}
            </Button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-5'>
          <AccordionTrigger>
            Series ({seriesQuery.data?.pages[0].total})
          </AccordionTrigger>
          <AccordionContent>
            <ul>
              {seriesQuery.data?.pages.map((group, i) => (
                <Fragment key={i}>
                  {group.results.map((result) => (
                    <ListItem
                      key={result.id}
                      imageUrl={getMarvelThumbnail(
                        result.thumbnail,
                        'standard_medium'
                      )}
                      title={result.title}
                      linkUrl={`/series/${result.resourceURI.split('/').pop()}`}
                    />
                  ))}
                </Fragment>
              ))}
            </ul>
            <Button
              onClick={() => seriesQuery.fetchNextPage()}
              disabled={
                !seriesQuery.hasNextPage ||
                seriesQuery.isLoading ||
                seriesQuery.isFetchingNextPage
              }
              className='w-full'
            >
              {seriesQuery.hasNextPage ? '더 불러오기' : '불러오기 완료'}
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default RelatedDataAccordion

const ListItem = ({
  imageUrl,
  title,
  linkUrl,
}: {
  imageUrl: string
  title: string
  linkUrl: string
}) => {
  return (
    <li className='flex items-center gap-2 mb-2'>
      <Avatar>
        <AvatarImage src={imageUrl} />
        <AvatarFallback>{title[0]}</AvatarFallback>
      </Avatar>
      <Link href={linkUrl} className='hover:underline'>
        <span>{title}</span>
      </Link>
    </li>
  )
}
