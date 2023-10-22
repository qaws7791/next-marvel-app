import { getStoriesByCharacterId } from '@/api/stories'
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
