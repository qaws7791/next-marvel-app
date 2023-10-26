import { MarvelImageVariants } from '@/constants/marvel'

export const getMarvelThumbnail = (
  thumbnail: Thumbnail | null,
  imageVriants?: (typeof MarvelImageVariants)[keyof typeof MarvelImageVariants]
) => {
  if (!thumbnail) {
    return '/image-placeholder.svg'
  }
  return `${thumbnail.path}/${
    imageVriants || MarvelImageVariants.portraitUncanny
  }.${thumbnail.extension}`
}
