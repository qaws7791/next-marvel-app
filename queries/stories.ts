import {
  getStoriesByCharacterId,
  getStoriesByComicId,
  getStoriesByEventId,
  getStoriesBySeriesId,
} from '@/api/stories'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useStoriesByIdInfQuery = ({ id }: { id: string }) => {
  const query = useInfiniteQuery({
    queryKey: ['character', id, 'stories'],
    queryFn: ({ pageParam }) => getStoriesByCharacterId(id, pageParam),
    initialPageParam: { offset: 0, limit: 20 },
    getNextPageParam: (lastPage) =>
      lastPage.offset + lastPage.limit < lastPage.total
        ? { offset: lastPage.offset + lastPage.limit, limit: lastPage.limit }
        : undefined,
  })
  return query
}

export const useStoriesBySeriesIdInfQuery = ({
  seriesId,
}: {
  seriesId: string
}) => {
  const query = useInfiniteQuery({
    queryKey: ['series', seriesId, 'stories'],
    queryFn: ({ pageParam }) => getStoriesBySeriesId(seriesId, pageParam),
    initialPageParam: { offset: 0, limit: 20 },
    getNextPageParam: (lastPage) =>
      lastPage.offset + lastPage.limit < lastPage.total
        ? { offset: lastPage.offset + lastPage.limit, limit: lastPage.limit }
        : undefined,
  })
  return query
}

export const useStoriesByComicsIdInfQuery = ({
  comicsId,
}: {
  comicsId: string
}) => {
  const query = useInfiniteQuery({
    queryKey: ['comics', comicsId, 'stories'],
    queryFn: ({ pageParam }) => getStoriesByComicId(comicsId, pageParam),
    initialPageParam: { offset: 0, limit: 20 },
    getNextPageParam: (lastPage) =>
      lastPage.offset + lastPage.limit < lastPage.total
        ? { offset: lastPage.offset + lastPage.limit, limit: lastPage.limit }
        : undefined,
  })
  return query
}

export const useStoriesByEventIdInfQuery = ({
  eventId,
}: {
  eventId: string
}) => {
  const query = useInfiniteQuery({
    queryKey: ['events', eventId, 'stories'],
    queryFn: ({ pageParam }) => getStoriesByEventId(eventId, pageParam),
    initialPageParam: { offset: 0, limit: 20 },
    getNextPageParam: (lastPage) =>
      lastPage.offset + lastPage.limit < lastPage.total
        ? { offset: lastPage.offset + lastPage.limit, limit: lastPage.limit }
        : undefined,
  })
  return query
}
