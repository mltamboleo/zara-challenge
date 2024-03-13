import { useContext } from 'react';
import { FavsContext } from '../../../app/Context';
import Image from "next/image";
import { useRouter } from 'next/router';

import "./styles.scss";
import Link from 'next/link';

export default function Header() {
  const { favs, setFavsFilter } = useContext(FavsContext);

  const router = useRouter();

  const goToHomePage = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, favsFilterValue: boolean) => {
    e.preventDefault();
    setFavsFilter(favsFilterValue);
    router.push("/");
  }

  return (
    <div className="header">
      <Link
        href="/"
        className="header__logo-button"
        onClick={e => goToHomePage(e, false)}
      >
        <Image
          src="/marvel-logo.svg"
          alt="Home Page"
          className="header__logo"
          width={130}
          height={52}
          priority
        />
      </Link>
      <Link
        href="/"
        rel="nofollow"
        className="header__fav-button"
        onClick={e => goToHomePage(e, true)}
      >
        <Image
          src="/fav-default.svg"
          alt="Home Page - Favorites"
          width={24}
          height={24}
        />
        <span className="header__fav-number">
          {favs.length}
        </span>
      </Link>
    </div>
  )
}
