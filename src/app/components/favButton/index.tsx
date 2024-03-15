import { useContext } from 'react'
import { FavsContext } from '../../../app/Context'
import type { FavButtonProps } from '../../../app/types'
import Image from "next/image"

import './styles.scss';

export default function FavButton({ className, characterId }: FavButtonProps) {
  const { favs, setFavs } = useContext(FavsContext)

  const updateFavs = () => {
    isFavCharacter() ? RemoveFav() : addFav()
  }

  const addFav = () => {
    setFavs([...favs, characterId])
  }

  const RemoveFav = () => {
    const characterIdIndex = favs.indexOf(characterId)
    favs.splice(characterIdIndex, 1)
    setFavs([...favs])
  }

  const isFavCharacter = () => {
    return !!favs.find((id: number) => id === characterId)
  }

  return (
    <button
      className={`fav-button ${className}`}
      onClick={e => { e.preventDefault(); updateFavs(); }}
    >
      <Image
        src={`/fav-${isFavCharacter() ? 'default' : 'unselected'}.svg`}
        alt={isFavCharacter() ? 'Remove from favorites' : 'Add to favorites'}
        width={12}
        height={12}
      />
    </button>
  )
}
