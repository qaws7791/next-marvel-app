import { ORDER_BY } from '@/constants/marvel'
import instance from './config'

export async function getCharacterById(id: string) {
  try {
    if (!id) throw new Error('No id provided')
    const res = await instance.get(`/characters/${id}`)

    if (res.status !== 200) throw new Error('Error')
    const data = res.data as CharactersById

    if (data.data.results.length === 0) throw new Error('No data')

    return {
      ...data.data,
      results: data.data.results[0],
    }
  } catch (error) {
    console.error(error)
    throw new Error('Error')
  }
}

export async function getCharactersByName(
  name?: string,
  { offset = 0, limit = 20 } = {}
) {
  try {
    const res = await instance.get('/characters', {
      params: {
        nameStartsWith: name,
        orderBy: ORDER_BY.CHARACTERS.name,
        offset,
        limit,
      },
    })

    if (res.status !== 200) throw new Error('Error')
    const data = res.data as CharactersByName
    return data.data
  } catch (error) {
    console.error(error)
    throw new Error('Error')
  }
}
