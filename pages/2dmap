import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { Artifact, getArtifactsData } from '../components/api';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import styles from '../styles/TwoDMap.module.scss';

const DynamicMap = dynamic(() => import('../components/Map'), {
  ssr: false, // This line disables server-side rendering for the Map component
});

export default function twoMap() {
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);

  useEffect(() => {
    async function fetchArtifacts() {
      try {
        const data = await getArtifactsData();
        setArtifacts(data);
      } catch (error) {
        console.error('Failed to fetch artifacts data:', error);
      }
    }

    fetchArtifacts();
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.content}>
        <DynamicMap artifacts={artifacts} />
      </div>
      <Footer />
    </>
  );
}
