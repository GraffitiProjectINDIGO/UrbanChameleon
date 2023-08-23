import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DynamicResium = dynamic(
  () => import('../components/Resium'),
  { ssr: false }
);

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
