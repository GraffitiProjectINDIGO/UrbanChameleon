import { useTheme } from 'next-themes';
import styles from './ThemeSwitcher.module.scss';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

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
