import { type ClassValue, clsx } from 'clsx'
import { MD5 } from 'crypto-js'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getHashAndTS() {
  const ts = new Date().getTime()

  const hash = MD5(
    ts +
      process.env.NEXT_PUBLIC_MARVEL_API_PRIVATE_KEY +
      process.env.NEXT_PUBLIC_MARVEL_API_PUBLIC_KEY
  )

  return { ts, hash }
}
