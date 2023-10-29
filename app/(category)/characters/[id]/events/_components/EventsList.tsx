'use client'
import React, { Fragment } from 'react'
import Image from 'next/image'
import { MarvelImageVariants } from '@/constants/marvel'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { Button } from '@/components/ui/button'
import { useEventsByIdInfQuery } from '@/queries/events'
import Link from 'next/link'

type Props = {
  id: string
}

const EventsList = ({ id }: Props) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useEventsByIdInfQuery({ id })

  if (isLoading) return <LoadingSpinner />

  if (!data) return <p>No data</p>

  return (
    <div>
      <p>
        {id}에 대한 Events 검색 결과: {data.pages[0].total}개
      </p>
      <div className='grid grid-cols-2 gap-6'>
        {data.pages.map((group, i) => (
          <Fragment key={i}>
            {group.results.map((result) => (
              <Link key={result.id} href={`/events/${result.id}`}>
                <div className='overflow-hidden rounded-md border border-slate-300'>
                  <Image
                    alt='thumbnail'
                    width={200}
                    height={225}
                    className='w-full hover:scale-110 ease-out duration-300'
                    src={`${result.thumbnail.path}/${MarvelImageVariants.portraitUncanny}.${result.thumbnail.extension}`}
                  />
                </div>
                <p className='font-semibold my-2 px-2'>{result.title}</p>
              </Link>
            ))}
          </Fragment>
        ))}
      </div>
      <Button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isLoading || isFetchingNextPage}
        className='w-full'
      >
        {isFetchingNextPage ? '로딩 중' : '더 불러오기'}
      </Button>
    </div>
  )
}

export default EventsList
