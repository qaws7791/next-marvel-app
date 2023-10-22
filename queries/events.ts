import { getEventsByCharacterId } from '@/api/events'
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
