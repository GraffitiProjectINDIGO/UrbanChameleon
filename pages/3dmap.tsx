import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { Artifact, getArtifactsData } from '../components/api';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const DynamicResium = dynamic(() => import('../components/Resium'), {
  ssr: false,
});

export default function threeDMap() {
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);

  useEffect(() => {
    async function fetchArtifacts() {
      const response = await fetch('/api/artifacts');
      const data = await response.json();
      setArtifacts(data);
    }

    fetchArtifacts();
  }, []);

  return (
    <div>
      <Head>
        <link rel="stylesheet" href="cesium/Widgets/widgets.css" />
      </Head>
      <Navbar />
      <DynamicResium artifacts={artifacts} />
      <Footer />
    </div>
  );
}
