export type favsContextType = {
  favs: number[],
  setFavs: (value: number[]) => void,
  favsFilter: boolean,
  setFavsFilter: (value: boolean) => void,
}

type visualApiDataItem = {
  id: number;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export type characterApiDataItem = visualApiDataItem & {
  name: string;
  description: string;
}

export type comicApiDataItem = visualApiDataItem & {
  title: string;
}

export type favButtonProps = {
  className: string,
  characterId: number
}
