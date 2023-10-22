type CommonResponse = {
  code: number
  status: string
  copyright: string
  attributionText: string
  attributionHTML: string
  etag: string
}

type CommonData = {
  offset: number
  limit: number
  total: number
  count: number
}

type Url = {
  type: string
  url: string
}

type Image = {
  path: string
  extension: string
}

type Thumbnail = {
  path: string
  extension: string
}

type RelatedCommonData = {
  available: number
  returned: number
  collectionURI: string
}

type Items = {
  resourceURI: string
  name: string
}

type ItemsWithRole = Items & {
  role: string
}

type ItemsWithType = Items & {
  type: string
}

type Comics = RelatedCommonData & {
  items: Items[]
}

type Stories = RelatedCommonData & {
  items: ItemsWithType[]
}

type Events = RelatedCommonData & {
  items: Items[]
}

type Series = RelatedCommonData & {
  items: Items[]
}

type Creators = RelatedCommonData & {
  items: ItemsWithRole[]
}

type Characters = RelatedCommonData & {
  items: ItemsWithRole[]
}

// 1. characters by name
type CharactersByName = {
  data: {
    results: {
      id: number
      name: string
      description: string
      modified: Date
      resourceURI: string
      urls: Url[]
      thumbnail: Thumbnail
      comics: Comics
      stories: Stories
      events: Events
      series: Series
    }[]
  } & CommonData
} & CommonResponse

// 2. characters by character id
type CharactersById = {
  data: {
    results: {
      id: number
      name: string
      description: string
      modified: Date
      resourceURI: string
      urls: Url[]
      thumbnail: Thumbnail
      comics: Comics
      stories: Stories
      events: Events
      series: Series
    }[]
  } & CommonData
} & CommonResponse

// 3. comics by character id
type ComicsByCharacterId = {
  data: {
    results: {
      id: number
      digitalId: number
      title: string
      issueNumber: number
      variantDescription: string
      description: string
      modified: Date
      isbn: string
      upc: string
      diamondCode: string
      ean: string
      issn: string
      format: string
      pageCount: number
      textObjects: { type: string; language: string; text: string }[]
      resourceURI: string
      urls: Url[]
      series: { resourceURI: string; name: string }
      variants: { resourceURI: string; name: string }[]
      collections: { resourceURI: string; name: string }[]
      collectedIssues: { resourceURI: string; name: string }[]
      dates: { type: string; date: Date }[]
      prices: { type: string; price: number }[]
      thumbnail: Thumbnail
      images: Image[]
      creators: Creators
      characters: Characters
      stories: Stories
      events: Events
    }[]
  } & CommonData
} & CommonResponse

// 4. events by character id
type EventsByCharacterId = {
  data: {
    results: {
      id: number
      title: string
      description: string
      resourceURI: string
      urls: Url[]
      modified: Date
      start: Date
      end: Date
      thumbnail: Thumbnail
      comics: Comics
      stories: Stories
      series: Series
      characters: Characters
      creators: Creators
      next: { resourceURI: string; name: string }
      previous: { resourceURI: string; name: string }
    }[]
  } & CommonData
} & CommonResponse

// 5. series by character id
type SeriesByCharacterId = {
  data: {
    results: {
      id: number
      title: string
      description: string
      resourceURI: string
      urls: { type: string; url: string }[]
      startYear: number
      endYear: number
      rating: string
      modified: Date
      thumbnail: Thumbnail
      comics: Comics
      stories: Stories
      events: Events
      characters: Characters
      creators: Creators
      next: { resourceURI: string; name: string }
      previous: { resourceURI: string; name: string }
    }[]
  } & CommonData
} & CommonResponse

// 6. stories by character id
type StoriesByCharacterId = {
  data: {
    results: {
      id: number
      title: string
      description: string
      resourceURI: string
      type: string
      modified: Date
      thumbnail: Thumbnail
      comics: Comics
      series: Series
      events: Events
      characters: Characters
      creators: Creators
      originalissue: { resourceURI: string; name: string }
    }[]
  } & CommonData
} & CommonResponse
