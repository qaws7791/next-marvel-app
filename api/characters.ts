import { ORDER_BY } from '@/constants/marvel'
import instance from './config'

export async function getCharacterById(id: string) {
  try {
    if (!id) throw new Error('No id provided')
    const res = await instance.get(`/characters/${id}`)

    if (res.status !== 200) throw new Error('Error')
    const data = res.data as CharactersResult

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
    const data = res.data as CharactersResult
    return data.data
  } catch (error) {
    console.error(error)
    throw new Error('Error')
  }
}

export async function getCharactersByComicId(
  comicId: string,
  { offset = 0, limit = 20 } = {}
) {
  try {
    const res = await instance.get(`/comics/${comicId}/characters`, {
      params: {
        orderBy: ORDER_BY.CHARACTERS.name,
        offset,
        limit,
      },
    })

    if (res.status !== 200) throw new Error('Error')
    const data = res.data as CharactersResult
    return data.data
  } catch (error) {
    console.error(error)
    throw new Error('Error')
  }
}

export async function getCharactersByEventId(
  eventId: string,
  { offset = 0, limit = 20 } = {}
) {
  try {
    const res = await instance.get(`/events/${eventId}/characters`, {
      params: {
        orderBy: ORDER_BY.CHARACTERS.name,
        offset,
        limit,
      },
    })

    if (res.status !== 200) throw new Error('Error')
    const data = res.data as CharactersResult
    return data.data
  } catch (error) {
    console.error(error)
    throw new Error('Error')
  }
}

export async function getCharactersBySeriesId(
  seriesId: string,
  { offset = 0, limit = 20 } = {}
) {
  try {
    const res = await instance.get(`/series/${seriesId}/characters`, {
      params: {
        orderBy: ORDER_BY.CHARACTERS.name,
        offset,
        limit,
      },
    })

    if (res.status !== 200) throw new Error('Error')
    const data = res.data as CharactersResult
    return data.data
  } catch (error) {
    console.error(error)
    throw new Error('Error')
  }
}

export async function getCharactersByStoryId(
  seriesId: string,
  { offset = 0, limit = 20 } = {}
) {
  try {
    const res = await instance.get(`/series/${seriesId}/characters`, {
      params: {
        orderBy: ORDER_BY.CHARACTERS.name,
        offset,
        limit,
      },
    })

    if (res.status !== 200) throw new Error('Error')
    const data = res.data as CharactersResult
    return data.data
  } catch (error) {
    console.error(error)
    throw new Error('Error')
  }
}
