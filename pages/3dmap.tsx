import dynamic from 'next/dynamic';
import Head from 'next/head';
import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const DynamicResium = dynamic(() => import('../components/Resium'), {
  ssr: false,
});

export default function threeDMap() {
  return (
    <div>
      <Head>
        <link rel="stylesheet" href="cesium/Widgets/widgets.css" />
      </Head>
      <Navbar />
      <DynamicResium />
      <Footer />
    </div>
  );
}
