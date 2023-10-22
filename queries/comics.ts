import { getComicsByCharacterId } from '@/api/comics'
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
