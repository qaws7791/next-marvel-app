import {
  getEventsByCharacterId,
  getEventsByComicId,
  getEventsByName,
  getEventsBySeriesId,
  getEventsByStoryId,
} from '@/api/events'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useEventsByIdInfQuery = ({ id }: { id: string }) => {
  const query = useInfiniteQuery({
    queryKey: ['character', id, 'events'],
    queryFn: ({ pageParam }) => getEventsByCharacterId(id, pageParam),
    initialPageParam: { offset: 0, limit: 20 },
    getNextPageParam: (lastPage) =>
      lastPage.offset + lastPage.limit < lastPage.total
        ? { offset: lastPage.offset + lastPage.limit, limit: lastPage.limit }
        : undefined,
  })

  return query
}

export const useEventsByNameInfQuery = ({ name }: { name: string }) => {
  const query = useInfiniteQuery({
    queryKey: ['events', 'search', name],
    queryFn: ({ pageParam }) => getEventsByName(name, pageParam),
    initialPageParam: { offset: 0, limit: 20 },
    getNextPageParam: (lastPage) =>
      lastPage.offset + lastPage.limit < lastPage.total
        ? { offset: lastPage.offset + lastPage.limit, limit: lastPage.limit }
        : undefined,
  })
  return query
}

export const useEventsBySeriesIdInfQuery = ({
  seriesId,
}: {
  seriesId: string
}) => {
  const query = useInfiniteQuery({
    queryKey: ['series', seriesId, 'events'],
    queryFn: ({ pageParam }) => getEventsBySeriesId(seriesId, pageParam),
    initialPageParam: { offset: 0, limit: 20 },
    getNextPageParam: (lastPage) =>
      lastPage.offset + lastPage.limit < lastPage.total
        ? { offset: lastPage.offset + lastPage.limit, limit: lastPage.limit }
        : undefined,
  })
  return query
}

export const useEventsByComicsIdInfQuery = ({
  comicsId,
}: {
  comicsId: string
}) => {
  const query = useInfiniteQuery({
    queryKey: ['comics', comicsId, 'events'],
    queryFn: ({ pageParam }) => getEventsByComicId(comicsId, pageParam),
    initialPageParam: { offset: 0, limit: 20 },
    getNextPageParam: (lastPage) =>
      lastPage.offset + lastPage.limit < lastPage.total
        ? { offset: lastPage.offset + lastPage.limit, limit: lastPage.limit }
        : undefined,
  })
  return query
}

export const useEventsByStoryIdInfQuery = ({
  storyId,
}: {
  storyId: string
}) => {
  const query = useInfiniteQuery({
    queryKey: ['stories', storyId, 'events'],
    queryFn: ({ pageParam }) => getEventsByStoryId(storyId, pageParam),
    initialPageParam: { offset: 0, limit: 20 },
    getNextPageParam: (lastPage) =>
      lastPage.offset + lastPage.limit < lastPage.total
        ? { offset: lastPage.offset + lastPage.limit, limit: lastPage.limit }
        : undefined,
  })
  return query
}
