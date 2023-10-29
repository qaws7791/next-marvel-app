import {
  getCharactersByComicId,
  getCharactersByEventId,
  getCharactersByName,
  getCharactersBySeriesId,
  getCharactersByStoryId,
} from '@/api/characters'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useCharactersByNameInfQuery = ({ name }: { name: string }) => {
  const query = useInfiniteQuery({
    queryKey: ['characters', 'search', name],
    queryFn: ({ pageParam }) => getCharactersByName(name, pageParam),
    initialPageParam: { offset: 0, limit: 20 },
    getNextPageParam: (lastPage) =>
      lastPage.offset + lastPage.limit < lastPage.total
        ? { offset: lastPage.offset + lastPage.limit, limit: lastPage.limit }
        : undefined,
  })
  return query
}

export const useCharactersBySeriesIdInfQuery = ({
  seriesId,
}: {
  seriesId: string
}) => {
  const query = useInfiniteQuery({
    queryKey: ['series', seriesId, 'characters'],
    queryFn: ({ pageParam }) => getCharactersBySeriesId(seriesId, pageParam),
    initialPageParam: { offset: 0, limit: 20 },
    getNextPageParam: (lastPage) =>
      lastPage.offset + lastPage.limit < lastPage.total
        ? { offset: lastPage.offset + lastPage.limit, limit: lastPage.limit }
        : undefined,
  })
  return query
}

export const useCharactersByComicsIdInfQuery = ({
  comicsId,
}: {
  comicsId: string
}) => {
  const query = useInfiniteQuery({
    queryKey: ['comics', comicsId, 'characters'],
    queryFn: ({ pageParam }) => getCharactersByComicId(comicsId, pageParam),
    initialPageParam: { offset: 0, limit: 20 },
    getNextPageParam: (lastPage) =>
      lastPage.offset + lastPage.limit < lastPage.total
        ? { offset: lastPage.offset + lastPage.limit, limit: lastPage.limit }
        : undefined,
  })
  return query
}

export const useCharactersByEventIdInfQuery = ({
  eventId,
}: {
  eventId: string
}) => {
  const query = useInfiniteQuery({
    queryKey: ['events', eventId, 'characters'],
    queryFn: ({ pageParam }) => getCharactersByEventId(eventId, pageParam),
    initialPageParam: { offset: 0, limit: 20 },
    getNextPageParam: (lastPage) =>
      lastPage.offset + lastPage.limit < lastPage.total
        ? { offset: lastPage.offset + lastPage.limit, limit: lastPage.limit }
        : undefined,
  })
  return query
}

export const useCharactersByStoryIdInfQuery = ({
  storyId,
}: {
  storyId: string
}) => {
  const query = useInfiniteQuery({
    queryKey: ['stories', storyId, 'characters'],
    queryFn: ({ pageParam }) => getCharactersByStoryId(storyId, pageParam),
    initialPageParam: { offset: 0, limit: 20 },
    getNextPageParam: (lastPage) =>
      lastPage.offset + lastPage.limit < lastPage.total
        ? { offset: lastPage.offset + lastPage.limit, limit: lastPage.limit }
        : undefined,
  })
  return query
}
