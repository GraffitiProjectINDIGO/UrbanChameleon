import React from 'react';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p>
        &copy; 2021-2023{' '}
        <a
          href="https://projectindigo.eu/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Project INDIGO
        </a>
        . Funded by{' '}
        <a
          href="https://www.oeaw.ac.at/foerderungen/foerderprogramme/heritage-science-austria"
          target="_blank"
          rel="noopener noreferrer"
        >
          Heritage Science Austria program
        </a>{' '}
        of the{' '}
        <a
          href="https://www.oeaw.ac.at/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Austrian Academy of Sciences
        </a>
        . Content on this website is licensed under{' '}
        <a
          href="https://creativecommons.org/licenses/by-sa/4.0/"
          target="_blank"
          rel="noopener noreferrer"
        >
          CC BY-SA 4.0
        </a>
        , unless otherwise noted.
      </p>
    </footer>
  );
};

export default Footer;
