import { MarvelImageVariants } from '@/constants/marvel'

export const getMarvelThumbnail = (thumbnail: Thumbnail | null) => {
  if (!thumbnail) {
    return '/image-placeholder.svg'
  }
  return `${thumbnail.path}/${MarvelImageVariants.portraitUncanny}.${thumbnail.extension}`
}
