'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useCharactersByNameInfQuery } from '@/queries/characters'
import { useComicsByTitleInfQuery } from '@/queries/comics'
import { useEventsByNameInfQuery } from '@/queries/events'
import { useSeriesByTitleInfQuery } from '@/queries/series'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { Fragment, useCallback } from 'react'
import SearchList from './SearchList'
import Image from 'next/image'
import { getMarvelThumbnail } from '@/lib/marvel'
import { Separator } from '@/components/ui/separator'
import IconButton from '@/components/common/IconButton'

type Props = {
  keyword: string
  category: string
}

const TABS = [
  { value: 'all', label: 'All' },
  { value: 'characters', label: 'Characters' },
  { value: 'comics', label: 'Comics' },
  { value: 'events', label: 'Events' },
  { value: 'series', label: 'Series' },
]

const SearchTabs = ({ keyword, category }: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const categoryReal = searchParams.get('category')

  const characterQuery = useCharactersByNameInfQuery({ name: keyword })
  const comicsQuery = useComicsByTitleInfQuery({ title: keyword })
  const eventsQuery = useEventsByNameInfQuery({ name: keyword })
  const seriesQuery = useSeriesByTitleInfQuery({ title: keyword })

  const validateTab = (value: string) => {
    const tab = TABS.find((tab) => tab.value === value)
    return tab ? tab.value : 'all'
  }

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const changeCategory = useCallback(
    (value: string) => {
      router.push(pathname + '?' + createQueryString('category', value))
    },
    [pathname, createQueryString, router]
  )

  return (
    <div>
      <Tabs value={validateTab(category) || 'all'}>
        <div>
          <TabsList>
            {TABS.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                onClick={() => {
                  router.push(
                    pathname + '?' + createQueryString('category', tab.value)
                  )
                }}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <TabsContent value='all'>
          <div className='flex flex-col gap-10'>
            <div>
              <div className='flex justify-between items-center'>
                <h2 className='font-bold text-lg'>
                  Characters: {characterQuery.data?.pages[0].total}
                </h2>
                <IconButton
                  label='See more'
                  name='chevron-right'
                  onClick={() => changeCategory('characters')}
                />
              </div>
              <ul>
                {characterQuery.data?.pages[0].results
                  .slice(0, 5)
                  .map((result) => (
                    <Fragment key={result.id}>
                      <li key={result.id} className='flex p-4 gap-4'>
                        <Image
                          alt='thumbnail'
                          width={50}
                          height={75}
                          className='hover:scale-110 ease-out duration-300 rounded-md'
                          src={getMarvelThumbnail(
                            result.thumbnail,
                            'portrait_small'
                          )}
                        />
                        <div>
                          <p>{result.name}</p>
                          <p className='overflow-hidden text-ellipsis line-clamp-2'>
                            {result.description || 'No Description'}
                          </p>
                        </div>
                      </li>
                      <Separator />
                    </Fragment>
                  ))}
              </ul>
            </div>
            <div>
              <div className='flex justify-between items-center'>
                <h2 className='font-bold text-lg'>
                  Comics: {comicsQuery.data?.pages[0].total}
                </h2>
                <IconButton
                  label='See more'
                  name='chevron-right'
                  onClick={() => changeCategory('comics')}
                />
              </div>
              <ul>
                {comicsQuery.data?.pages[0].results
                  .slice(0, 5)
                  .map((result) => (
                    <Fragment key={result.id}>
                      <li key={result.id} className='flex p-4 gap-4'>
                        <Image
                          alt='thumbnail'
                          width={50}
                          height={75}
                          className='hover:scale-110 ease-out duration-300 rounded-md'
                          src={getMarvelThumbnail(
                            result.thumbnail,
                            'portrait_small'
                          )}
                        />
                        <div>
                          <p>{result.title}</p>
                          <p className='overflow-hidden text-ellipsis line-clamp-2'>
                            {result.description || 'No Description'}
                          </p>
                        </div>
                      </li>
                      <Separator />
                    </Fragment>
                  ))}
              </ul>
            </div>
            <div>
              <div className='flex justify-between items-center'>
                <h2 className='font-bold text-lg'>
                  Events: {eventsQuery.data?.pages[0].total}
                </h2>
                <IconButton
                  label='See more'
                  name='chevron-right'
                  onClick={() => changeCategory('events')}
                />
              </div>
              <ul>
                {eventsQuery.data?.pages[0].results
                  .slice(0, 5)
                  .map((result) => (
                    <Fragment key={result.id}>
                      <li key={result.id} className='flex p-4 gap-4'>
                        <Image
                          alt='thumbnail'
                          width={50}
                          height={75}
                          className='hover:scale-110 ease-out duration-300 rounded-md'
                          src={getMarvelThumbnail(
                            result.thumbnail,
                            'portrait_small'
                          )}
                        />
                        <div>
                          <p>{result.title}</p>
                          <p className='overflow-hidden text-ellipsis line-clamp-2'>
                            {result.description || 'No Description'}
                          </p>
                        </div>
                      </li>
                      <Separator />
                    </Fragment>
                  ))}
              </ul>
            </div>
            <div>
              <div className='flex justify-between items-center'>
                <h2 className='font-bold text-lg'>
                  Series: {seriesQuery.data?.pages[0].total}
                </h2>
                <IconButton
                  label='See more'
                  name='chevron-right'
                  onClick={() => changeCategory('series')}
                />
              </div>
              <ul>
                {seriesQuery.data?.pages[0].results
                  .slice(0, 5)
                  .map((result) => (
                    <Fragment key={result.id}>
                      <li key={result.id} className='flex p-4 gap-4'>
                        <Image
                          alt='thumbnail'
                          width={50}
                          height={75}
                          className='hover:scale-110 ease-out duration-300 rounded-md w-[50px] h-[75px]'
                          src={getMarvelThumbnail(
                            result.thumbnail,
                            'portrait_small'
                          )}
                        />
                        <div>
                          <p>{result.title}</p>
                          <p className='overflow-hidden text-ellipsis line-clamp-2'>
                            {result.description || 'No Description'}
                          </p>
                        </div>
                      </li>
                      <Separator />
                    </Fragment>
                  ))}
              </ul>
            </div>
          </div>
        </TabsContent>
        <TabsContent value='characters'>
          <h2 className='font-bold text-lg'>
            Characters: {characterQuery.data?.pages[0].total}
          </h2>
          <SearchList keyword={keyword} category='characters' />
        </TabsContent>
        <TabsContent value='comics'>
          <h2 className='font-bold text-lg'>
            Comics: {comicsQuery.data?.pages[0].total}
          </h2>
          <SearchList keyword={keyword} category='comics' />
        </TabsContent>
        <TabsContent value='events'>
          <h2 className='font-bold text-lg'>
            Events: {eventsQuery.data?.pages[0].total}
          </h2>
          <SearchList keyword={keyword} category='events' />
        </TabsContent>
        <TabsContent value='series'>
          <h2 className='font-bold text-lg'>
            Series: {seriesQuery.data?.pages[0].total}
          </h2>
          <SearchList keyword={keyword} category='series' />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SearchTabs
