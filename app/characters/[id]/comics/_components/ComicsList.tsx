'use client'
import React, { Fragment } from 'react'
import Image from 'next/image'
import { MarvelImageVariants } from '@/constants/marvel'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { Button } from '@/components/ui/button'
import { useSeriesByIdInfQuery } from '@/queries/series'

type Props = {
  id: string
}

const ComicsList = ({ id }: Props) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSeriesByIdInfQuery({ id })

  if (isLoading) return <LoadingSpinner />

  if (!data) return <p>No data</p>

  return (
    <div>
      <p>
        {id}에 대한 Comics 검색 결과: {data.pages[0].total}개
      </p>
      <div className='grid grid-cols-2 gap-6'>
        {data.pages.map((group, i) => (
          <Fragment key={i}>
            {group.results.map((result) => (
              <div key={result.id}>
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
              </div>
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

export default ComicsList
