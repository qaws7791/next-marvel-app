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
  useCharactersBySeriesIdInfQuery,
} from '@/queries/characters'
import { useComicsBySeriesIdInfQuery } from '@/queries/comics'
import {
  useEventsByComicsIdInfQuery,
  useEventsBySeriesIdInfQuery,
} from '@/queries/events'
import {
  useStoriesByComicsIdInfQuery,
  useStoriesBySeriesIdInfQuery,
} from '@/queries/stories'
import Link from 'next/link'
import React, { Fragment } from 'react'

type Props = {
  comicsId: string
}

const RelatedDataAccordion = ({ comicsId }: Props) => {
  const characterQuery = useCharactersByComicsIdInfQuery({ comicsId })
  const storiesQuery = useStoriesByComicsIdInfQuery({ comicsId })
  const eventsQuery = useEventsByComicsIdInfQuery({ comicsId })

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
            Events ({eventsQuery.data?.pages[0].total})
          </AccordionTrigger>
          <AccordionContent>
            <ul>
              {eventsQuery.data?.pages.map((group, i) => (
                <Fragment key={i}>
                  {group.results.map((result) => (
                    <ListItem
                      key={result.id}
                      imageUrl={getMarvelThumbnail(
                        result.thumbnail,
                        'standard_medium'
                      )}
                      title={result.title}
                      linkUrl={`/events/${result.resourceURI.split('/').pop()}`}
                    />
                  ))}
                </Fragment>
              ))}
            </ul>
            <Button
              onClick={() => eventsQuery.fetchNextPage()}
              disabled={
                !eventsQuery.hasNextPage ||
                eventsQuery.isLoading ||
                eventsQuery.isFetchingNextPage
              }
              className='w-full'
            >
              {eventsQuery.hasNextPage ? '더 불러오기' : '불러오기 완료'}
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
