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
import { useCharactersBySeriesIdInfQuery } from '@/queries/characters'
import Link from 'next/link'
import React, { Fragment } from 'react'

type Props = {
  seriesId: string
}

const RelatedDataAccordion = ({ seriesId }: Props) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useCharactersBySeriesIdInfQuery({ seriesId })

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      {' '}
      <Accordion type='single' collapsible>
        {/* <AccordionItem value='item-1'>
          <AccordionTrigger>
            Creators ({series.creators.available})
          </AccordionTrigger>
          <AccordionContent>
            <ul>
              {series.creators.items.map((creator) => (
                <li key={creator.name} className='flex items-center gap-2 mb-2'>
                  <Avatar>
                    <AvatarImage src='' />
                    <AvatarFallback>{creator.name[0]}</AvatarFallback>
                  </Avatar>
                  <p>
                    <span className='font-semibold'>{creator.role}</span>
                    &nbsp;-&nbsp;
                    {creator.name}
                  </p>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem> */}
        <AccordionItem value='item-2'>
          <AccordionTrigger>
            Characters ({data?.pages[0].total})
          </AccordionTrigger>
          <AccordionContent>
            <ul>
              {data?.pages.map((group, i) => (
                <Fragment key={i}>
                  {group.results.map((result) => (
                    <li
                      key={result.id}
                      className='flex items-center gap-2 mb-2'
                    >
                      <Avatar>
                        <AvatarImage
                          src={getMarvelThumbnail(
                            result.thumbnail,
                            'standard_medium'
                          )}
                        />
                        <AvatarFallback>{result.name[0]}</AvatarFallback>
                      </Avatar>
                      <Link
                        href={`/characters/${result.resourceURI
                          .split('/')
                          .pop()}`}
                        className='hover:underline'
                      >
                        <span>{result.name}</span>
                      </Link>
                    </li>
                  ))}
                </Fragment>
              ))}
            </ul>
            <Button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isLoading || isFetchingNextPage}
              className='w-full'
            >
              {hasNextPage ? '더 불러오기' : '불러오기 완료'}
            </Button>
          </AccordionContent>
        </AccordionItem>
        {/* <AccordionItem value='item-3'>
          <AccordionTrigger>
            Stories ({series.stories.available})
          </AccordionTrigger>
          <AccordionContent>
            <ul>
              {series.stories.items.map((story) => (
                <li key={story.name} className='flex items-center gap-2 mb-2'>
                  <Avatar>
                    <AvatarImage src='' />
                    <AvatarFallback>{story.name[0]}</AvatarFallback>
                  </Avatar>
                  <span>{story.name}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-4'>
          <AccordionTrigger>
            Events ({series.events.available})
          </AccordionTrigger>
          <AccordionContent>
            <ul>
              {series.events.items.map((event) => (
                <li key={event.name} className='flex items-center gap-2 mb-2'>
                  <Avatar>
                    <AvatarImage src='' />
                    <AvatarFallback>{event.name[0]}</AvatarFallback>
                  </Avatar>
                  <span>{event.name}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem> */}
      </Accordion>
    </div>
  )
}

export default RelatedDataAccordion
