import axios from 'axios';
import { useState, useEffect, SetStateAction } from 'react';
import Image from "next/image";
import { useRouter } from 'next/router';
import { characterApiDataItem, comicApiDataItem } from '../../app/types';
import { characterItem } from '../../domain/characterItem';
import { comicItem } from '../../domain/comicItem';
import FavButton from '../../app/components/favButton/index';

import '../../app/styles/details.scss';

export default function CharacterDetails() {
  const [characterData, setCharacterData] = useState<characterItem[]>([]);
  const [characterLoading, setCharacterLoading] = useState(true);
  const [comicsData, setComicsData] = useState<comicItem[]>([]);
  const [comicsLoading, setComicsLoading] = useState(true);
  const [transitionClass, setTransitionClass] = useState(false);
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      const id = Number(router.query.id);
      getCharacterDetails(id);
      getComics(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    if(!characterLoading || !comicsLoading) {
      setLoadingPercentage((percentage) => percentage + 50)
    }
  }, [characterLoading, comicsLoading]);

  useEffect(() => {
    if (loadingPercentage === 100) {
      setTransitionClass(true);
    }
  }, [loadingPercentage]);

  const getCharacterDetails = (characterId: number) => {
    axios
    .get(`../api/getCharacters?id=${characterId}`)
    .then((response) => {
      const responseData = response.data.data;
      const item: SetStateAction<characterItem[]> = [];

      if (!responseData) {
        router.push('/')
      } else {
        responseData.map((data: characterApiDataItem) => {
          item.push(
            new characterItem(
              data.id,
              data.name,
              `${data.thumbnail.path}.${data.thumbnail.extension}`,
              data.description,
            )
          );
        })

        setCharacterData(item);
        setCharacterLoading(false);
      }
    })
  }

  const getComics = (characterId: number) => {
    axios
    .get(`../api/getComics?id=${characterId}`)
    .then((response) => {
      const responseData = response.data.data;
      const items: SetStateAction<comicItem[]> = [];

      responseData.map((data: comicApiDataItem) => {
        items.push(
          new comicItem(
            data.id,
            data.title,
            `${data.thumbnail.path}.${data.thumbnail.extension}`,
          )
        );
      });

      setComicsData(items);
      setComicsLoading(false);
    })
  }

  const getLoadingPercentage = () => {
    return {width: `${loadingPercentage}%`}
  }

  return (
    <>
      <div
        className={`loading-bar ${transitionClass ? 'loading-bar--fade-out' : ''}`}
        style={getLoadingPercentage()}
      >
      </div>
      <div className={`details ${transitionClass ? 'slide-in' : ''}`}>
        {!characterLoading && !comicsLoading && (
          <>
            {characterData.map((item) => (
              <div
                className="details__character fade-in"
                key={item.id}
              >
                <div className="details__character-header">
                  <Image
                    className="details__character-image"
                    src={`${item.thumbnail}`}
                    alt={item.name}
                    width={190}
                    height={190}
                    placeholder="blur"
                    blurDataURL={'/skeleton-img.svg'}
                  />
                  <div className="details__character-info">
                    <div className="details__character-info-header">
                      <h1 className="details__character-name">
                        {item.name}
                      </h1>
                      <FavButton
                        className="details__character-fav-button"
                        characterId={item.id}
                      />
                    </div>
                    {item.description && (
                      <div className="details__character-description">
                        {item.description}
                      </div>
                    )}
                  </div>
                </div>
                <Image
                  className="details__character-bg-cut"
                  src="/cut.svg"
                  alt="bg-cut"
                  width={24}
                  height={24}
                />
              </div>
            ))}
            {comicsData.length > 0 && (
              <div className="details__comics fade-in">
              <h2 className="details__comics-header">
                COMICS
              </h2>
              <div className="details__comics-carousel">
                <ul className="details__comics-list">
                  {comicsData.map((item) => (
                    <li
                      className="details__comics-item"
                      key={item.id}
                    >
                      <Image
                        className="details__comics-image"
                        src={`${item.thumbnail}`}
                        alt={item.title}
                        width={150}
                        height={190}
                        placeholder="blur"
                        blurDataURL={'/skeleton-img.svg'}
                      />
                      <p className="details__comics-title">
                        {item.title}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
