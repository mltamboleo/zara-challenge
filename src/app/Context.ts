import { createContext } from 'react'
import type { FavsContextType } from './types'

export const FavsContext = createContext<FavsContextType>({
  favs: [],
  setFavs() {},
  favsFilter: false,
  setFavsFilter() {},
})
