import React from 'react';
import styles from './Blackdrop.module.scss';

const Backdrop: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return <div className={styles.backdrop} onClick={onClick}></div>;
};

export default Backdrop;
