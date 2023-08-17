import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';
import React from 'react';
import type { AppProps } from 'next/app';
import 'leaflet/dist/leaflet.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
