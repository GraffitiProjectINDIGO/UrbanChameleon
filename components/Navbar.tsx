import Link from 'next/link';
import React from 'react';
import styles from './Navbar.module.scss';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <a
        href="https://projectindigo.eu/"
        className={styles.brand}
        target="_blank"
        rel="noopener noreferrer"
      >
        project INDIGO
      </a>
      <div className={styles.links}>
        <Link href="/">Home</Link>
        <Link href="/2dmap">2D Map</Link>
        <Link href="/data">Data</Link>
      </div>
    </nav>
  );
};

export default Navbar;
