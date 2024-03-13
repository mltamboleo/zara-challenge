import { createContext } from 'react'
import type { favsContextType } from './types'

export const FavsContext = createContext<favsContextType>({
  favs: [],
  setFavs() {},
  favsFilter: false,
  setFavsFilter() {},
})
