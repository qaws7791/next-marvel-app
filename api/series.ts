import instance from './config'

export async function getSeriesByCharacterId(
  characterId: string,
  { limit = 20, offset = 0 } = {}
) {
  try {
    const res = await instance.get(`/characters/${characterId}/series`, {
      params: {
        limit,
        offset,
      },
    })

    if (res.status !== 200) throw new Error('Error')

    const data = res.data as SeriesResult

    return data.data
  } catch (error) {
    console.error(error)
    throw new Error('Error')
  }
}

export async function getSeriesByEventId(
  eventId: string,
  { limit = 20, offset = 0 } = {}
) {
  try {
    const res = await instance.get(`/events/${eventId}/series`, {
      params: {
        limit,
        offset,
      },
    })

    if (res.status !== 200) throw new Error('Error')

    const data = res.data as SeriesResult

    return data.data
  } catch (error) {
    console.error(error)
    throw new Error('Error')
  }
}

export async function getSeriesByStoryId(
  storyId: string,
  { limit = 20, offset = 0 } = {}
) {
  try {
    const res = await instance.get(`/stories/${storyId}/series`, {
      params: {
        limit,
        offset,
      },
    })

    if (res.status !== 200) throw new Error('Error')

    const data = res.data as SeriesResult

    return data.data
  } catch (error) {
    console.error(error)
    throw new Error('Error')
  }
}

export async function getSeriesByTitle(
  title: string,
  { limit = 20, offset = 0 } = {}
) {
  try {
    const res = await instance.get('/series', {
      params: {
        titleStartsWith: title,
        limit,
        offset,
      },
    })

    if (res.status !== 200) throw new Error('Error')

    const data = res.data as SeriesResult

    return data.data
  } catch (error) {
    console.error(error)
    throw new Error('Error')
  }
}

export async function getSeriesById(seriesId: string) {
  try {
    const res = await instance.get(`/series/${seriesId}`)

    if (res.status !== 200) throw new Error('Error')

    const data = res.data as SeriesResult

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
