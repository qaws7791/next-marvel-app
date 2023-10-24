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

    const data = res.data as ComicsByCharacterId
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

    const data = res.data as ComicsById

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
