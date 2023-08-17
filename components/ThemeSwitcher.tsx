import { useTheme } from 'next-themes';
import styles from './Navbar.module.scss';
import React from 'react';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <button className={styles.themeSwitcher} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
       Switch to {theme === 'dark' ? 'light' : 'dark'} mode
    </button>
  )
}
