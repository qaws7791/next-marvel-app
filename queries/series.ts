import {
  getSeriesByCharacterId,
  getSeriesByEventId,
  getSeriesByStoryId,
  getSeriesByTitle,
} from '@/api/series'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useSeriesByIdInfQuery = ({ id }: { id: string }) => {
  const query = useInfiniteQuery({
    queryKey: ['character', id, 'series'],
    queryFn: ({ pageParam }) => getSeriesByCharacterId(id, pageParam),
    initialPageParam: { offset: 0, limit: 20 },
    getNextPageParam: (lastPage) =>
      lastPage.offset + lastPage.limit < lastPage.total
        ? { offset: lastPage.offset + lastPage.limit, limit: lastPage.limit }
        : undefined,
  })
  return query
}

export const useSeriesByTitleInfQuery = ({ title }: { title: string }) => {
  const query = useInfiniteQuery({
    queryKey: ['series', 'search', title],
    queryFn: ({ pageParam }) => getSeriesByTitle(title, pageParam),
    initialPageParam: { offset: 0, limit: 20 },
    getNextPageParam: (lastPage) =>
      lastPage.offset + lastPage.limit < lastPage.total
        ? { offset: lastPage.offset + lastPage.limit, limit: lastPage.limit }
        : undefined,
  })
  return query
}

export const useSeriesByEventIdInfQuery = ({
  eventId,
}: {
  eventId: string
}) => {
  const query = useInfiniteQuery({
    queryKey: ['events', eventId, 'series'],
    queryFn: ({ pageParam }) => getSeriesByEventId(eventId, pageParam),
    initialPageParam: { offset: 0, limit: 20 },
    getNextPageParam: (lastPage) =>
      lastPage.offset + lastPage.limit < lastPage.total
        ? { offset: lastPage.offset + lastPage.limit, limit: lastPage.limit }
        : undefined,
  })
  return query
}

export const useSeriesByStoryIdInfQuery = ({
  storyId,
}: {
  storyId: string
}) => {
  const query = useInfiniteQuery({
    queryKey: ['stories', storyId, 'series'],
    queryFn: ({ pageParam }) => getSeriesByStoryId(storyId, pageParam),
    initialPageParam: { offset: 0, limit: 20 },
    getNextPageParam: (lastPage) =>
      lastPage.offset + lastPage.limit < lastPage.total
        ? { offset: lastPage.offset + lastPage.limit, limit: lastPage.limit }
        : undefined,
  })
  return query
}
