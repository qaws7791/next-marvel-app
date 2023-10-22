import { getCharactersByName } from '@/api/characters'
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
