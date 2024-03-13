import axios from 'axios';
import { useContext, useState, useEffect, SetStateAction } from 'react';
import { FavsContext } from '../app/Context';
import Image from "next/image";
import Link from 'next/link';
import FavButton from '../app/components/favButton/index';
import { characterApiDataItem } from '../app/types';
import { characterItem } from '../domain/characterItem';

import '../app/styles/index.scss';

export default function CharactersList() {
  const [data, setData] = useState<characterItem[]>([]);
  const [allData, setAllData] = useState<characterItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const limit = 50;
  const [results, setResults] = useState(0);
  const { favs, favsFilter } = useContext(FavsContext);

  useEffect(() =>  {
    getCharactersList();
  }, []);

  useEffect(() => {
    setData(allData);
    favsFilter ? filterFavoritesList() : filterCharactersList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allData, favsFilter, searchText]);

  const getCharactersList = () => {
    axios
    .get(`api/getCharacters?limit=${limit}`)
    .then((response) => {
      const responseData = response.data.data;
      const items: SetStateAction<characterItem[]> = [];

      responseData.map((data: characterApiDataItem) => {
        items.push(
          new characterItem(
            data.id,
            data.name,
            `${data.thumbnail.path}.${data.thumbnail.extension}`
          )
        );
      });

      setAllData(items);
      setResults(items.length);
      setLoading(false);
    })
  }

  const filterCharactersList = () => {
    const filteredData: characterItem[] = allData.filter((character) => character.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1);

    setData(filteredData);
    setResults(filteredData.length)
  }

  const filterFavoritesList = () => {
    const filteredData: characterItem[] = [];

    for (const index in favs) {
      let favCharacter: characterItem | undefined;

      favCharacter = allData.find((character: characterItem) => (character.id === favs[index]));
      if (favCharacter) {
        if (searchText > "" && !(favCharacter.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)) {
          continue;
        }
        filteredData.push(favCharacter);
      }
    }

    setData(filteredData);
    setResults(filteredData.length)
  }

  const getFavsHeaderClass = () => {
    return favsFilter ? '' : 'home__favs-header--hidden'
  }

  return (
    <div className="home">
      <div className={`home__favs-header ${getFavsHeaderClass()}`}>
        <h1 className="home__favs-header-text">FAVORITES</h1>
      </div>
      <div className="home__search">
        <input
          className="home__search-input"
          type="search"
          placeholder="SEARCH A CHARACTER..."
          onChange={e => setSearchText(e.target.value)}
        />
        <p className="home__search-results-label">
          {results} {results > 1 ? 'results' : 'result '}
        </p>
      </div>
      {loading ? (
        <div className="home__loading">
          Loading...
        </div>
      ) : (
        <ul className="home__characters-list">
          {data.map((item) => (
            <li
              className="home__character-card fade-in"
              key={item.id}
            >
              <Link
                href={`/details/${item.id}`}
                className="home__character-link"
              >
                <Image
                  className="home__character-image"
                  src={`${item.thumbnail}`}
                  alt={item.name}
                  width={172}
                  height={190}
                  placeholder="blur"
                  blurDataURL={'/skeleton-img.svg'}
                />
                <div className="home__character-name">
                  <div className="home__character-name-label">
                    {item.name}
                  </div>
                  <FavButton
                    className="home__character-fav-button"
                    characterId={item.id}
                  />
                  <Image
                    className="home__character-name-bg-cut"
                    src="/cut.svg"
                    alt="bg-cut"
                    width={12}
                    height={12}
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
