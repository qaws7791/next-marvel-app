import { ORDER_BY } from '@/constants/marvel'
import instance from './config'

export async function getComicsByCharacterId(
  characterId: string,
  { limit = 20, offset = 0 } = {}
) {
  try {
    const res = await instance.get(`/characters/${characterId}/comics`, {
      params: {
        limit,
        offset,
      },
    })

    if (res.status !== 200) throw new Error('Error')

    const data = res.data as ComicsResult
    return data.data
  } catch (error) {
    console.error(error)
    throw new Error('Error')
  }
}

export async function getComicsByEventId(
  eventId: string,
  { limit = 20, offset = 0 } = {}
) {
  try {
    const res = await instance.get(`/events/${eventId}/comics`, {
      params: {
        limit,
        offset,
      },
    })

    if (res.status !== 200) throw new Error('Error')

    const data = res.data as ComicsResult
    return data.data
  } catch (error) {
    console.error(error)
    throw new Error('Error')
  }
}

export async function getComicsBySeriesId(
  seriesId: string,
  { limit = 20, offset = 0 } = {}
) {
  try {
    const res = await instance.get(`/series/${seriesId}/comics`, {
      params: {
        limit,
        offset,
      },
    })

    if (res.status !== 200) throw new Error('Error')

    const data = res.data as ComicsResult
    return data.data
  } catch (error) {
    console.error(error)
    throw new Error('Error')
  }
}

export async function getComicsByStoryId(
  storyId: string,
  { limit = 20, offset = 0 } = {}
) {
  try {
    const res = await instance.get(`/stories/${storyId}/comics`, {
      params: {
        limit,
        offset,
      },
    })

    if (res.status !== 200) throw new Error('Error')

    const data = res.data as ComicsResult
    return data.data
  } catch (error) {
    console.error(error)
    throw new Error('Error')
  }
}

export async function getComicsById(comicId: string) {
  try {
    const res = await instance.get(`/comics/${comicId}`)

    if (res.status !== 200) throw new Error('Error')

    const data = res.data as ComicsResult

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

export async function getComicsByTitle(
  title?: string,
  { offset = 0, limit = 20 } = {}
) {
  try {
    const res = await instance.get('/comics', {
      params: {
        titleStartsWith: title,
        orderBy: ORDER_BY.COMICS.title,
        offset,
        limit,
      },
    })

    if (res.status !== 200) throw new Error('Error')
    const data = res.data as ComicsResult
    return data.data
  } catch (error) {
    console.error(error)
    throw new Error('Error')
  }
}
