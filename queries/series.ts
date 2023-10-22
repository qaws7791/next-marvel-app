import { getSeriesByCharacterId } from '@/api/series'
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
