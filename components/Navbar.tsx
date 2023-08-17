import Link from 'next/link';
import React from 'react';
import styles from './Navbar.module.scss';
import ThemeSwitcher from './ThemeSwitcher';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div
        className={styles.brand}
      >
        UrbanChameleon
      </div>
      <div className={styles.links}>
        <Link href="/">Home</Link>
        <Link href="/2dmap">2D Map</Link>
        <Link href="/data">Data</Link>
        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export default Navbar;
