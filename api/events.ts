import instance from './config'

export async function getEventsByCharacterId(
  characterId: string,
  { limit = 20, offset = 0 } = {}
) {
  try {
    const res = await instance.get(`/characters/${characterId}/events`, {
      params: {
        limit,
        offset,
      },
    })

    if (res.status !== 200) throw new Error('Error')

    const data = res.data as EventsResult

    return data.data
  } catch (error) {
    console.error(error)
    throw new Error('Error')
  }
}

export async function getEventsByComicId(
  comicId: string,
  { limit = 20, offset = 0 } = {}
) {
  try {
    const res = await instance.get(`/comics/${comicId}/events`, {
      params: {
        limit,
        offset,
      },
    })

    if (res.status !== 200) throw new Error('Error')

    const data = res.data as EventsResult

    return data.data
  } catch (error) {
    console.error(error)
    throw new Error('Error')
  }
}

export async function getEventsBySeriesId(
  seriesId: string,
  { limit = 20, offset = 0 } = {}
) {
  try {
    const res = await instance.get(`/series/${seriesId}/events`, {
      params: {
        limit,
        offset,
      },
    })

    if (res.status !== 200) throw new Error('Error')

    const data = res.data as EventsResult

    return data.data
  } catch (error) {
    console.error(error)
    throw new Error('Error')
  }
}

export async function getEventsByStoryId(
  storyId: string,
  { limit = 20, offset = 0 } = {}
) {
  try {
    const res = await instance.get(`/stories/${storyId}/events`, {
      params: {
        limit,
        offset,
      },
    })

    if (res.status !== 200) throw new Error('Error')

    const data = res.data as EventsResult

    return data.data
  } catch (error) {
    console.error(error)
    throw new Error('Error')
  }
}

export async function getEventsByName(
  name: string,
  { limit = 20, offset = 0 } = {}
) {
  try {
    const res = await instance.get('/events', {
      params: {
        nameStartsWith: name,
        limit,
        offset,
      },
    })

    if (res.status !== 200) throw new Error('Error')

    const data = res.data as EventsResult

    return data.data
  } catch (error) {
    console.error(error)
    throw new Error('Error')
  }
}

export async function getEventsById(eventId: string) {
  try {
    const res = await instance.get(`/events/${eventId}`)

    if (res.status !== 200) throw new Error('Error')

    const data = res.data as EventsResult

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
