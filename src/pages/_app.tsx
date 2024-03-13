import type { AppProps } from 'next/app'
import { useState } from 'react'
import { FavsContext } from '@/app/Context'
import Header from '@/app/components/header/index'

import '@/app/main.scss'

export default function MarvelApp({ Component, pageProps }: AppProps) {
  const [favs, setFavs] = useState<number[]>([])
  const [favsFilter, setFavsFilter] = useState(false)

  return (
    <>
      <FavsContext.Provider value={{ favs, setFavs, favsFilter, setFavsFilter }}>
        <Header />
        <div className="content">
          <Component {...pageProps} />
        </div>
      </FavsContext.Provider>
    </>
  )
}
