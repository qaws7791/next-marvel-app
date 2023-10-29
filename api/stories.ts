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
    const data = res.data as StoriesResult
    return data.data
  } catch (error) {
    console.error(error)
    throw new Error('Error')
  }
}

export async function getStoriesByComicId(
  comicId: string,
  { limit = 20, offset = 0 } = {}
) {
  try {
    const res = await instance.get(`/comics/${comicId}/stories`, {
      params: {
        limit,
        offset,
      },
    })

    if (res.status !== 200) throw new Error('Error')

    const data = res.data as StoriesResult

    return data.data
  } catch (error) {
    console.error(error)
    throw new Error('Error')
  }
}

export async function getStoriesByEventId(
  eventId: string,
  { limit = 20, offset = 0 } = {}
) {
  try {
    const res = await instance.get(`/events/${eventId}/stories`, {
      params: {
        limit,
        offset,
      },
    })

    if (res.status !== 200) throw new Error('Error')

    const data = res.data as StoriesResult

    return data.data
  } catch (error) {
    console.error(error)
    throw new Error('Error')
  }
}

export async function getStoriesBySeriesId(
  seriesId: string,
  { limit = 20, offset = 0 } = {}
) {
  try {
    const res = await instance.get(`/series/${seriesId}/stories`, {
      params: {
        limit,
        offset,
      },
    })

    if (res.status !== 200) throw new Error('Error')

    const data = res.data as StoriesResult

    return data.data
  } catch (error) {
    console.error(error)
    throw new Error('Error')
  }
}

export async function getStoriesById(storyId: string) {
  try {
    const res = await instance.get(`/stories/${storyId}`)

    if (res.status !== 200) throw new Error('Error')

    const data = res.data as StoriesResult

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
