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

    const data = res.data as SeriesByCharacterId

    return data.data
  } catch (error) {
    console.error(error)
    throw new Error('Error')
  }
}
