'use client'
import React, { Fragment } from 'react'
import Image from 'next/image'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { Button } from '@/components/ui/button'
import { useStoriesByIdInfQuery } from '@/queries/stories'
import { getMarvelThumbnail } from '@/lib/marvel'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

type Props = {
  id: string
}

const StoriesList = ({ id }: Props) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useStoriesByIdInfQuery({ id })

  if (isLoading) return <LoadingSpinner />

  if (!data) return <p>No data</p>

  return (
    <div>
      <p>
        {id}에 대한 검색 결과: {data.pages[0].total}개
      </p>
      <div className=''>
        {data.pages.map((group, i) => (
          <Fragment key={i}>
            {group.results.map((result) => (
              <div key={result.id}>
                <div className='overflow-hidden rounded-md flex flex-col my-2 gap-3'>
                  <Link
                    className='flex gap-2 items-start'
                    href={`/stories/${result.id}`}
                  >
                    <Image
                      alt='thumbnail'
                      width={48}
                      height={48}
                      className=' hover:scale-110 ease-out duration-300 rounded-md'
                      src={getMarvelThumbnail(result.thumbnail)}
                    />
                    <p className='font-semibold px-2'>{result.title}</p>
                  </Link>
                  <div className='flex flex-wrap gap-1'>
                    {result.characters.items.map((item) => (
                      <Badge variant='outline' key={item.name}>
                        <Link
                          href={`/characters/${item.resourceURI
                            .split('/')
                            .pop()}`}
                        >
                          {item.name}
                        </Link>
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator />
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

export default StoriesList
