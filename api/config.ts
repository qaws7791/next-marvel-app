import { getHashAndTS } from '@/lib/utils'
import axios from 'axios'

const LIMIT = 20

const instance = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public',
  params: {
    apikey: process.env.NEXT_PUBLIC_MARVEL_API_PUBLIC_KEY,
    limit: LIMIT,
  },
})

instance.interceptors.request.use(
  (config) => {
    const { ts, hash } = getHashAndTS()
    config.params = {
      ...config.params,
      ts,
      hash,
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance
