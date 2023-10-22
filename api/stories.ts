import { ORDER_BY } from '@/constants/marvel'
import instance from './config'

export async function getStoriesByCharacterId(
  characterId: string,
  { limit = 20, offset = 0 } = {}
) {
  try {
    const res = await instance.get(`/characters/${characterId}/stories`, {
      params: {
        limit,
        offset,
        orderBy: ORDER_BY.STORIES.idDescending,
      },
    })

    if (res.status !== 200) throw new Error('Error')
    const data = res.data as StoriesByCharacterId
    return data.data
  } catch (error) {
    console.error(error)
    throw new Error('Error')
  }
}
