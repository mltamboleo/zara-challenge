export type FavsContextType = {
  favs: number[],
  setFavs: (value: number[]) => void,
  favsFilter: boolean,
  setFavsFilter: (value: boolean) => void,
}

type VisualApiDataItem = {
  id: number;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export type CharacterApiDataItem = VisualApiDataItem & {
  name: string;
  description: string;
}

export type ComicApiDataItem = VisualApiDataItem & {
  title: string;
}

export type FavButtonProps = {
  className: string,
  characterId: number
}
