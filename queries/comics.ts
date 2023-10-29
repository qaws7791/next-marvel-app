import {
  getComicsByCharacterId,
  getComicsByEventId,
  getComicsBySeriesId,
  getComicsByStoryId,
  getComicsByTitle,
} from '@/api/comics'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useComicsByIdInfQuery = ({ id }: { id: string }) => {
  const query = useInfiniteQuery({
    queryKey: ['character', id, 'comics'],
    queryFn: ({ pageParam }) => getComicsByCharacterId(id, pageParam),
    initialPageParam: { offset: 0, limit: 20 },
    getNextPageParam: (lastPage) =>
      lastPage.offset + lastPage.limit < lastPage.total
        ? { offset: lastPage.offset + lastPage.limit, limit: lastPage.limit }
        : undefined,
  })
  return query
}

export const useComicsByTitleInfQuery = ({ title }: { title: string }) => {
  const query = useInfiniteQuery({
    queryKey: ['comics', 'search', title],
    queryFn: ({ pageParam }) => getComicsByTitle(title, pageParam),
    initialPageParam: { offset: 0, limit: 20 },
    getNextPageParam: (lastPage) =>
      lastPage.offset + lastPage.limit < lastPage.total
        ? { offset: lastPage.offset + lastPage.limit, limit: lastPage.limit }
        : undefined,
  })
  return query
}

export const useComicsBySeriesIdInfQuery = ({
  seriesId,
}: {
  seriesId: string
}) => {
  const query = useInfiniteQuery({
    queryKey: ['series', seriesId, 'comics'],
    queryFn: ({ pageParam }) => getComicsBySeriesId(seriesId, pageParam),
    initialPageParam: { offset: 0, limit: 20 },
    getNextPageParam: (lastPage) =>
      lastPage.offset + lastPage.limit < lastPage.total
        ? { offset: lastPage.offset + lastPage.limit, limit: lastPage.limit }
        : undefined,
  })
  return query
}

export const useComicsByEventIdInfQuery = ({
  eventId,
}: {
  eventId: string
}) => {
  const query = useInfiniteQuery({
    queryKey: ['events', eventId, 'comics'],
    queryFn: ({ pageParam }) => getComicsByEventId(eventId, pageParam),
    initialPageParam: { offset: 0, limit: 20 },
    getNextPageParam: (lastPage) =>
      lastPage.offset + lastPage.limit < lastPage.total
        ? { offset: lastPage.offset + lastPage.limit, limit: lastPage.limit }
        : undefined,
  })
  return query
}

export const useComicsByStoryIdInfQuery = ({
  storyId,
}: {
  storyId: string
}) => {
  const query = useInfiniteQuery({
    queryKey: ['stories', storyId, 'comics'],
    queryFn: ({ pageParam }) => getComicsByStoryId(storyId, pageParam),
    initialPageParam: { offset: 0, limit: 20 },
    getNextPageParam: (lastPage) =>
      lastPage.offset + lastPage.limit < lastPage.total
        ? { offset: lastPage.offset + lastPage.limit, limit: lastPage.limit }
        : undefined,
  })
  return query
}
