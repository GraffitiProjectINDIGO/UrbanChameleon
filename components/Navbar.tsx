import Link from 'next/link';
import React from 'react';
import styles from './Navbar.module.scss';
import ThemeSwitch from './ThemeSwitcher';

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
        <Link href="/3dmap">3D Map</Link>
        <Link href="/data">Data</Link>
        <ThemeSwitch />
      </div>
    </nav>
  );
};

export default Navbar;
