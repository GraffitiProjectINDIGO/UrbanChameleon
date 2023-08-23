import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTheme } from 'next-themes';
import React, { useEffect } from 'react';
import styles from './ThemeSwitcher.module.scss';

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  function isDarkMode() {
    return (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  }

  useEffect(() => {
    if (!theme) {
      setTheme(isDarkMode() ? 'dark' : 'light');
    }
  }, [theme, setTheme]);

  return (
    <div className={styles.themeSwitcher}>
      <input
        type="checkbox"
        id="themeToggle"
        className={styles.toggleInput}
        checked={theme === 'dark'}
        onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />
      <label htmlFor="themeToggle" className={styles.toggleLabel}>
        <FontAwesomeIcon icon={faSun} className={styles.sunIcon} />
        <FontAwesomeIcon icon={faMoon} className={styles.moonIcon} />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
}
