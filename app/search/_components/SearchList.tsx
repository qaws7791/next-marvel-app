'use client'
import React, { Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MarvelImageVariants } from '@/constants/marvel'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { Button } from '@/components/ui/button'
import { useCharactersByNameInfQuery } from '@/queries/characters'
import { UseInfiniteQueryResult } from '@tanstack/react-query'
import { useComicsByTitleInfQuery } from '@/queries/comics'
import { useEventsByNameInfQuery } from '@/queries/events'
import { useSeriesByTitleInfQuery } from '@/queries/series'

type Props = {
  keyword: string
  category: 'characters' | 'comics' | 'events' | 'series'
}

const getQuery = ({ keyword, category }: Props) => {
  switch (category) {
    case 'characters':
      return () => useCharactersByNameInfQuery({ name: keyword })
    case 'comics':
      return () => useComicsByTitleInfQuery({ title: keyword })
    case 'events':
      return () => useEventsByNameInfQuery({ name: keyword })
    case 'series':
      return () => useSeriesByTitleInfQuery({ title: keyword })
    default:
      throw new Error('Invalid category')
  }
}

const SearchList = ({ keyword, category }: Props) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    getQuery({ keyword, category })()

  return (
    <div>
      <div className='grid grid-cols-2 gap-6'>
        {data?.pages.map((group, i) => (
          <Fragment key={i}>
            {group.results.map((result) => (
              <div key={result.id}>
                <Link href={`/${category}/${result.id}`}>
                  <div className='overflow-hidden rounded-md border border-slate-300'>
                    <Image
                      alt='thumbnail'
                      width={200}
                      height={225}
                      className='w-full hover:scale-110 ease-out duration-300'
                      src={`${result.thumbnail.path}/${MarvelImageVariants.portraitUncanny}.${result.thumbnail.extension}`}
                    />
                  </div>
                  <p className='font-semibold my-2 px-2'>
                    {'name' in result ? result.name : result.title}
                  </p>
                </Link>
              </div>
            ))}
          </Fragment>
        ))}
      </div>
      {hasNextPage ? (
        <Button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isLoading || isFetchingNextPage}
          className='w-full'
        >
          더 불러오기
        </Button>
      ) : (
        <p className='text-center text-gray-600'>End Data</p>
      )}
    </div>
  )
}

export default SearchList
